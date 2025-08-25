/**
 * Hybrid clustering service combining DBSCAN and K-Means
 * Step 1: DBSCAN for outlier detection and removal
 * Step 2: K-Means for main clustering of cleaned data
 */

import { DBSCANAnalytics } from './dbscan';
import { KMeansAnalytics } from './kmeans';
import { ClusterPoint, ClusteringResult, DataPoint, HybridClusteringConfig } from './types';

/**
 * Hybrid clustering analytics implementation
 * Combines DBSCAN outlier detection with K-Means clustering for robust results
 */
export class HybridClusteringAnalytics {
  private config: HybridClusteringConfig;
  private dbscan: DBSCANAnalytics;
  private kmeans: KMeansAnalytics;

  constructor(config: HybridClusteringConfig) {
    this.config = {
      includeOutliers: false,
      ...config,
    };

    this.dbscan = new DBSCANAnalytics(this.config.dbscan);
    this.kmeans = new KMeansAnalytics(this.config.kmeans);
  }

  /**
   * Perform hybrid clustering analysis
   * @param dataPoints Input data points
   * @returns Comprehensive clustering result
   */
  cluster(dataPoints: DataPoint[]): ClusteringResult {
    if (dataPoints.length === 0) {
      return {
        points: [],
        centers: [],
        numClusters: 0,
        numOutliers: 0,
        algorithm: 'hybrid',
        metrics: {
          silhouetteScore: 0,
          inertia: 0,
          noiseRatio: 0,
        },
      };
    }

    // Step 1: DBSCAN for outlier detection
    console.log('🔍 Step 1: Detecting outliers with DBSCAN...');
    const dbscanResult = this.dbscan.cluster(dataPoints);

    const outliers = dbscanResult.points.filter((p) => p.isOutlier);
    const cleanedPoints = dbscanResult.points
      .filter((p) => !p.isOutlier)
      .map((p) => ({
        id: p.id,
        features: p.features,
        metadata: p.metadata,
      }));

    console.log(
      `📊 DBSCAN Results: ${outliers.length} outliers, ${cleanedPoints.length} clean points`
    );

    // Step 2: K-Means clustering on cleaned data
    console.log('🎯 Step 2: Clustering cleaned data with K-Means...');
    let kmeansResult: ClusteringResult;

    if (cleanedPoints.length === 0) {
      // All points are outliers
      kmeansResult = {
        points: [],
        centers: [],
        numClusters: 0,
        numOutliers: 0,
        algorithm: 'kmeans',
        metrics: { silhouetteScore: 0, inertia: 0 },
      };
    } else if (cleanedPoints.length < this.config.kmeans.k) {
      // Adjust K if not enough clean points
      const adjustedConfig = { ...this.config.kmeans, k: Math.max(1, cleanedPoints.length) };
      const adjustedKmeans = new KMeansAnalytics(adjustedConfig);
      kmeansResult = adjustedKmeans.cluster(cleanedPoints);
    } else {
      kmeansResult = this.kmeans.cluster(cleanedPoints);
    }

    console.log(`🎯 K-Means Results: ${kmeansResult.numClusters} clusters found`);

    // Step 3: Combine results
    const finalPoints = this.combineResults(
      outliers,
      kmeansResult.points,
      this.config.includeOutliers || false
    );

    const finalResult: ClusteringResult = {
      points: finalPoints,
      centers: kmeansResult.centers,
      numClusters: kmeansResult.numClusters,
      numOutliers: outliers.length,
      algorithm: 'hybrid',
      metrics: {
        silhouetteScore: this.calculateHybridSilhouetteScore(finalPoints),
        inertia: kmeansResult.metrics?.inertia || 0,
        noiseRatio: outliers.length / dataPoints.length,
      },
    };

    console.log(
      `✅ Hybrid Clustering Complete: ${finalResult.numClusters} clusters, ${finalResult.numOutliers} outliers`
    );

    return finalResult;
  }

  /**
   * Combine DBSCAN and K-Means results
   * @param outliers Outliers from DBSCAN
   * @param clusteredPoints Clustered points from K-Means
   * @param includeOutliers Whether to include outliers in final result
   * @returns Combined cluster points
   */
  private combineResults(
    outliers: ClusterPoint[],
    clusteredPoints: ClusterPoint[],
    includeOutliers: boolean
  ): ClusterPoint[] {
    const result: ClusterPoint[] = [...clusteredPoints];

    if (includeOutliers) {
      // Add outliers with special cluster ID
      outliers.forEach((outlier) => {
        result.push({
          ...outlier,
          clusterId: -1, // Keep outlier cluster ID
          isOutlier: true,
        });
      });
    }

    return result;
  }

  /**
   * Calculate silhouette score for hybrid clustering result
   * @param points Final clustered points
   * @returns Silhouette score
   */
  private calculateHybridSilhouetteScore(points: ClusterPoint[]): number {
    const nonOutlierPoints = points.filter((p) => !p.isOutlier && p.clusterId >= 0);

    if (nonOutlierPoints.length <= 1) return 0;

    const clusters = new Map<number, ClusterPoint[]>();
    nonOutlierPoints.forEach((point) => {
      if (!clusters.has(point.clusterId)) {
        clusters.set(point.clusterId, []);
      }
      clusters.get(point.clusterId)!.push(point);
    });

    if (clusters.size <= 1) return 0;

    let totalSilhouette = 0;

    nonOutlierPoints.forEach((point) => {
      const ownCluster = clusters.get(point.clusterId)!;

      // Calculate average intra-cluster distance
      let intraDistance = 0;
      if (ownCluster.length > 1) {
        ownCluster.forEach((other) => {
          if (other.id !== point.id) {
            intraDistance += this.calculateDistance(point.features, other.features);
          }
        });
        intraDistance /= ownCluster.length - 1;
      }

      // Calculate minimum average inter-cluster distance
      let minInterDistance = Infinity;
      clusters.forEach((otherCluster, clusterId) => {
        if (clusterId !== point.clusterId) {
          let interDistance = 0;
          otherCluster.forEach((other) => {
            interDistance += this.calculateDistance(point.features, other.features);
          });
          interDistance /= otherCluster.length;
          minInterDistance = Math.min(minInterDistance, interDistance);
        }
      });

      // Calculate silhouette coefficient
      const silhouette =
        (minInterDistance - intraDistance) / Math.max(intraDistance, minInterDistance);
      totalSilhouette += silhouette;
    });

    return totalSilhouette / nonOutlierPoints.length;
  }

  /**
   * Calculate Euclidean distance between feature vectors
   * @param features1 First feature vector
   * @param features2 Second feature vector
   * @returns Euclidean distance
   */
  private calculateDistance(features1: number[], features2: number[]): number {
    let sum = 0;
    for (let i = 0; i < features1.length; i++) {
      const diff = features1[i] - features2[i];
      sum += diff * diff;
    }
    return Math.sqrt(sum);
  }

  /**
   * Analyze cluster stability by performing multiple runs
   * @param dataPoints Input data points
   * @param runs Number of runs to perform
   * @returns Stability analysis result
   */
  analyzeStability(
    dataPoints: DataPoint[],
    runs: number = 5
  ): {
    averageClusters: number;
    averageOutliers: number;
    averageSilhouette: number;
    stabilityScore: number;
    consistentClusters: number;
  } {
    const results: ClusteringResult[] = [];

    for (let i = 0; i < runs; i++) {
      // Use different seeds for K-Means to test stability
      const config = {
        ...this.config,
        kmeans: { ...this.config.kmeans, seed: (this.config.kmeans.seed || 42) + i },
      };

      const hybridAnalytics = new HybridClusteringAnalytics(config);
      results.push(hybridAnalytics.cluster(dataPoints));
    }

    const avgClusters = results.reduce((sum, r) => sum + r.numClusters, 0) / runs;
    const avgOutliers = results.reduce((sum, r) => sum + r.numOutliers, 0) / runs;
    const avgSilhouette =
      results.reduce((sum, r) => sum + (r.metrics?.silhouetteScore || 0), 0) / runs;

    // Calculate stability score based on variance in cluster counts
    const clusterCounts = results.map((r) => r.numClusters);
    const clusterVariance = this.calculateVariance(clusterCounts);
    const stabilityScore = Math.max(0, 1 - clusterVariance / avgClusters);

    // Find most consistent cluster count
    const clusterCountFreq = new Map<number, number>();
    clusterCounts.forEach((count) => {
      clusterCountFreq.set(count, (clusterCountFreq.get(count) || 0) + 1);
    });

    const consistentClusters = Array.from(clusterCountFreq.entries()).sort(
      (a, b) => b[1] - a[1]
    )[0][0];

    return {
      averageClusters: avgClusters,
      averageOutliers: avgOutliers,
      averageSilhouette: avgSilhouette,
      stabilityScore,
      consistentClusters,
    };
  }

  /**
   * Calculate variance of an array of numbers
   * @param values Array of numbers
   * @returns Variance
   */
  private calculateVariance(values: number[]): number {
    const mean = values.reduce((sum, v) => sum + v, 0) / values.length;
    const squaredDiffs = values.map((v) => Math.pow(v - mean, 2));
    return squaredDiffs.reduce((sum, d) => sum + d, 0) / values.length;
  }

  /**
   * Get detailed cluster information including outlier characteristics
   * @param result Clustering result
   * @returns Detailed cluster information
   */
  static getDetailedClusterInfo(result: ClusteringResult): {
    clusters: {
      id: number;
      size: number;
      center?: number[];
      avgDistanceToCenter: number;
      points: ClusterPoint[];
    }[];
    outliers: {
      count: number;
      points: ClusterPoint[];
      avgDistanceToNearestCluster: number;
    };
    quality: {
      silhouetteScore: number;
      inertia: number;
      noiseRatio: number;
    };
  } {
    // Group points by cluster
    const clusterMap = new Map<number, ClusterPoint[]>();
    const outlierPoints: ClusterPoint[] = [];

    result.points.forEach((point) => {
      if (point.isOutlier || point.clusterId === -1) {
        outlierPoints.push(point);
      } else {
        if (!clusterMap.has(point.clusterId)) {
          clusterMap.set(point.clusterId, []);
        }
        clusterMap.get(point.clusterId)!.push(point);
      }
    });

    // Analyze each cluster
    const clusters = Array.from(clusterMap.entries()).map(([id, points]) => {
      const center = result.centers?.[id];
      const avgDistanceToCenter =
        points.reduce((sum, p) => sum + (p.distanceToCenter || 0), 0) / points.length;

      return {
        id,
        size: points.length,
        center,
        avgDistanceToCenter,
        points,
      };
    });

    // Analyze outliers
    let avgDistanceToNearestCluster = 0;
    if (outlierPoints.length > 0 && result.centers && result.centers.length > 0) {
      outlierPoints.forEach((outlier) => {
        const distances = result.centers!.map((center) =>
          this.calculateDistanceStatic(outlier.features, center)
        );
        avgDistanceToNearestCluster += Math.min(...distances);
      });
      avgDistanceToNearestCluster /= outlierPoints.length;
    }

    return {
      clusters: clusters.sort((a, b) => b.size - a.size),
      outliers: {
        count: outlierPoints.length,
        points: outlierPoints,
        avgDistanceToNearestCluster,
      },
      quality: {
        silhouetteScore: result.metrics?.silhouetteScore || 0,
        inertia: result.metrics?.inertia || 0,
        noiseRatio: result.metrics?.noiseRatio || 0,
      },
    };
  }

  /**
   * Static method to calculate Euclidean distance
   * @param features1 First feature vector
   * @param features2 Second feature vector
   * @returns Euclidean distance
   */
  private static calculateDistanceStatic(features1: number[], features2: number[]): number {
    let sum = 0;
    for (let i = 0; i < features1.length; i++) {
      const diff = features1[i] - features2[i];
      sum += diff * diff;
    }
    return Math.sqrt(sum);
  }

  /**
   * Suggest optimal configuration based on data characteristics
   * @param dataPoints Sample data points
   * @param targetClusters Desired number of clusters (optional)
   * @returns Suggested hybrid configuration
   */
  static suggestOptimalConfig(
    dataPoints: DataPoint[],
    targetClusters?: number
  ): HybridClusteringConfig {
    if (dataPoints.length === 0) {
      return {
        dbscan: { eps: 0.5, minPts: 3 },
        kmeans: { k: 2 },
      };
    }

    // Suggest DBSCAN configuration
    const dbscanConfig = DBSCANAnalytics.suggestConfig(dataPoints);

    // Suggest K-Means configuration
    const k = targetClusters || KMeansAnalytics.findOptimalK(dataPoints);

    return {
      dbscan: dbscanConfig,
      kmeans: { k, maxIterations: 100, tolerance: 1e-4, seed: 42 },
      includeOutliers: false,
    };
  }

  /**
   * Validate hybrid clustering configuration
   * @param config Configuration to validate
   * @returns Validation result
   */
  static validateConfig(config: HybridClusteringConfig): {
    isValid: boolean;
    suggestions: string[];
  } {
    const suggestions: string[] = [];
    let isValid = true;

    // Validate DBSCAN config
    const dbscanValidation = DBSCANAnalytics.validateConfig(config.dbscan);
    if (!dbscanValidation.isValid) {
      isValid = false;
    }
    suggestions.push(...dbscanValidation.suggestions.map((s) => `DBSCAN: ${s}`));

    // Validate K-Means config
    const kmeansValidation = KMeansAnalytics.validateConfig(config.kmeans);
    if (!kmeansValidation.isValid) {
      isValid = false;
    }
    suggestions.push(...kmeansValidation.suggestions.map((s) => `K-Means: ${s}`));

    // Additional hybrid-specific validations
    if (config.dbscan.eps > 1 && config.kmeans.k > 10) {
      suggestions.push('Large eps and k values may result in poor clustering quality');
    }

    return { isValid, suggestions };
  }
}
