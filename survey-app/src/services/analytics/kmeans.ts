/**
 * K-Means clustering algorithm implementation
 * Used for main clustering after outlier removal in the hybrid approach
 */

import { ClusterPoint, ClusteringResult, DataPoint, KMeansConfig } from './types';

/**
 * K-Means clustering algorithm implementation
 * Partitions data into k clusters by minimizing within-cluster sum of squares
 */
export class KMeansAnalytics {
  private config: KMeansConfig;

  constructor(config: KMeansConfig) {
    this.config = {
      maxIterations: 100,
      tolerance: 1e-4,
      seed: 42,
      ...config,
    };
  }

  /**
   * Perform K-Means clustering
   * @param dataPoints Input data points
   * @returns Clustering result with centroids and assignments
   */
  cluster(dataPoints: DataPoint[]): ClusteringResult {
    if (dataPoints.length === 0) {
      return {
        points: [],
        centers: [],
        numClusters: 0,
        numOutliers: 0,
        algorithm: 'kmeans',
        metrics: { inertia: 0, silhouetteScore: 0 },
      };
    }

    if (dataPoints.length < this.config.k) {
      // Not enough points for requested clusters
      return this.handleInsufficientData(dataPoints);
    }

    const points: ClusterPoint[] = dataPoints.map((dp) => ({
      ...dp,
      clusterId: -1,
      isOutlier: false,
    }));

    // Initialize centroids
    let centroids = this.initializeCentroids(dataPoints);
    let converged = false;
    let iteration = 0;

    while (!converged && iteration < this.config.maxIterations!) {
      // Assign points to closest centroids
      this.assignPointsToClusters(points, centroids);

      // Update centroids
      const newCentroids = this.updateCentroids(points, centroids.length);

      // Check for convergence
      converged = this.hasConverged(centroids, newCentroids);
      centroids = newCentroids;
      iteration++;
    }

    // Calculate distances to centers
    points.forEach((point) => {
      if (point.clusterId >= 0 && point.clusterId < centroids.length) {
        point.distanceToCenter = this.calculateDistance(point.features, centroids[point.clusterId]);
      }
    });

    const inertia = this.calculateInertia(points, centroids);
    const silhouetteScore = this.calculateSilhouetteScore(points);

    return {
      points,
      centers: centroids,
      numClusters: this.config.k,
      numOutliers: 0,
      algorithm: 'kmeans',
      metrics: {
        inertia,
        silhouetteScore,
      },
    };
  }

  /**
   * Handle case where there are insufficient data points
   * @param dataPoints Available data points
   * @returns Basic clustering result
   */
  private handleInsufficientData(dataPoints: DataPoint[]): ClusteringResult {
    const points: ClusterPoint[] = dataPoints.map((dp, index) => ({
      ...dp,
      clusterId: index,
      isOutlier: false,
      distanceToCenter: 0,
    }));

    const centers = dataPoints.map((dp) => [...dp.features]);

    return {
      points,
      centers,
      numClusters: dataPoints.length,
      numOutliers: 0,
      algorithm: 'kmeans',
      metrics: {
        inertia: 0,
        silhouetteScore: dataPoints.length > 1 ? this.calculateSilhouetteScore(points) : 0,
      },
    };
  }

  /**
   * Initialize centroids using K-Means++ algorithm for better initial placement
   * @param dataPoints Input data points
   * @returns Initial centroids
   */
  private initializeCentroids(dataPoints: DataPoint[]): number[][] {
    const centroids: number[][] = [];
    const random = this.createSeededRandom(this.config.seed!);

    // Choose first centroid randomly
    const firstIndex = Math.floor(random() * dataPoints.length);
    centroids.push([...dataPoints[firstIndex].features]);

    // Choose remaining centroids using K-Means++ method
    for (let i = 1; i < this.config.k; i++) {
      const distances = dataPoints.map((point) => {
        const minDistance = Math.min(
          ...centroids.map((centroid) => this.calculateDistance(point.features, centroid))
        );
        return minDistance * minDistance; // Squared distance for probability
      });

      const totalDistance = distances.reduce((sum, d) => sum + d, 0);
      const randomValue = random() * totalDistance;

      let cumulativeDistance = 0;
      let selectedIndex = 0;

      for (let j = 0; j < distances.length; j++) {
        cumulativeDistance += distances[j];
        if (cumulativeDistance >= randomValue) {
          selectedIndex = j;
          break;
        }
      }

      centroids.push([...dataPoints[selectedIndex].features]);
    }

    return centroids;
  }

  /**
   * Assign each point to the closest centroid
   * @param points Points to assign
   * @param centroids Current centroids
   */
  private assignPointsToClusters(points: ClusterPoint[], centroids: number[][]): void {
    points.forEach((point) => {
      let minDistance = Infinity;
      let closestCluster = 0;

      centroids.forEach((centroid, index) => {
        const distance = this.calculateDistance(point.features, centroid);
        if (distance < minDistance) {
          minDistance = distance;
          closestCluster = index;
        }
      });

      point.clusterId = closestCluster;
    });
  }

  /**
   * Update centroids based on current cluster assignments
   * @param points Clustered points
   * @param numClusters Number of clusters
   * @returns Updated centroids
   */
  private updateCentroids(points: ClusterPoint[], numClusters: number): number[][] {
    const newCentroids: number[][] = [];
    const featureCount = points[0].features.length;

    for (let i = 0; i < numClusters; i++) {
      const clusterPoints = points.filter((point) => point.clusterId === i);

      if (clusterPoints.length === 0) {
        // No points assigned to this cluster, keep the old centroid or random
        newCentroids.push(new Array(featureCount).fill(0));
        continue;
      }

      const centroid = new Array(featureCount).fill(0);

      clusterPoints.forEach((point) => {
        point.features.forEach((feature, featureIndex) => {
          centroid[featureIndex] += feature;
        });
      });

      centroid.forEach((sum, index) => {
        centroid[index] = sum / clusterPoints.length;
      });

      newCentroids.push(centroid);
    }

    return newCentroids;
  }

  /**
   * Check if centroids have converged
   * @param oldCentroids Previous centroids
   * @param newCentroids New centroids
   * @returns True if converged
   */
  private hasConverged(oldCentroids: number[][], newCentroids: number[][]): boolean {
    for (let i = 0; i < oldCentroids.length; i++) {
      const distance = this.calculateDistance(oldCentroids[i], newCentroids[i]);
      if (distance > this.config.tolerance!) {
        return false;
      }
    }
    return true;
  }

  /**
   * Calculate Euclidean distance between two feature vectors
   * @param features1 First feature vector
   * @param features2 Second feature vector
   * @returns Euclidean distance
   */
  private calculateDistance(features1: number[], features2: number[]): number {
    if (features1.length !== features2.length) {
      throw new Error('Feature vectors must have the same length');
    }

    let sum = 0;
    for (let i = 0; i < features1.length; i++) {
      const diff = features1[i] - features2[i];
      sum += diff * diff;
    }

    return Math.sqrt(sum);
  }

  /**
   * Calculate inertia (within-cluster sum of squared distances)
   * @param points Clustered points
   * @param centroids Cluster centroids
   * @returns Inertia value
   */
  private calculateInertia(points: ClusterPoint[], centroids: number[][]): number {
    let inertia = 0;

    points.forEach((point) => {
      if (point.clusterId >= 0 && point.clusterId < centroids.length) {
        const distance = this.calculateDistance(point.features, centroids[point.clusterId]);
        inertia += distance * distance;
      }
    });

    return inertia;
  }

  /**
   * Calculate silhouette score for clustering quality assessment
   * @param points Clustered points
   * @returns Silhouette score (-1 to 1, higher is better)
   */
  private calculateSilhouetteScore(points: ClusterPoint[]): number {
    if (points.length <= 1) return 0;

    const clusters = new Map<number, ClusterPoint[]>();
    points.forEach((point) => {
      if (!clusters.has(point.clusterId)) {
        clusters.set(point.clusterId, []);
      }
      clusters.get(point.clusterId)!.push(point);
    });

    if (clusters.size <= 1) return 0;

    let totalSilhouette = 0;

    points.forEach((point) => {
      const ownCluster = clusters.get(point.clusterId)!;

      // Calculate average intra-cluster distance (a)
      let intraDistance = 0;
      if (ownCluster.length > 1) {
        ownCluster.forEach((other) => {
          if (other.id !== point.id) {
            intraDistance += this.calculateDistance(point.features, other.features);
          }
        });
        intraDistance /= ownCluster.length - 1;
      }

      // Calculate minimum average inter-cluster distance (b)
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

      // Calculate silhouette coefficient for this point
      const silhouette =
        (minInterDistance - intraDistance) / Math.max(intraDistance, minInterDistance);
      totalSilhouette += silhouette;
    });

    return totalSilhouette / points.length;
  }

  /**
   * Create seeded random number generator for reproducibility
   * @param seed Random seed
   * @returns Random number generator function
   */
  private createSeededRandom(seed: number): () => number {
    let state = seed;
    return () => {
      state = (state * 1664525 + 1013904223) % 4294967296;
      return state / 4294967296;
    };
  }

  /**
   * Find optimal number of clusters using elbow method
   * @param dataPoints Input data points
   * @param maxK Maximum number of clusters to test
   * @returns Optimal k value
   */
  static findOptimalK(dataPoints: DataPoint[], maxK: number = 10): number {
    if (dataPoints.length === 0) return 1;

    const maxPossibleK = Math.min(maxK, dataPoints.length);
    const inertias: number[] = [];

    for (let k = 1; k <= maxPossibleK; k++) {
      const kmeans = new KMeansAnalytics({ k });
      const result = kmeans.cluster(dataPoints);
      inertias.push(result.metrics?.inertia || 0);
    }

    // Find elbow point
    let optimalK = 1;
    let maxImprovement = 0;

    for (let i = 1; i < inertias.length - 1; i++) {
      const improvement = inertias[i - 1] - inertias[i];
      const nextImprovement = inertias[i] - inertias[i + 1];
      const improvementRatio = improvement / (nextImprovement + 1e-10);

      if (improvementRatio > maxImprovement) {
        maxImprovement = improvementRatio;
        optimalK = i + 1;
      }
    }

    return optimalK;
  }

  /**
   * Validate K-Means configuration
   * @param config Configuration to validate
   * @returns Validation result with suggestions
   */
  static validateConfig(config: KMeansConfig): { isValid: boolean; suggestions: string[] } {
    const suggestions: string[] = [];
    let isValid = true;

    if (config.k < 1) {
      isValid = false;
      suggestions.push('k must be at least 1');
    }

    if (config.maxIterations && config.maxIterations < 1) {
      isValid = false;
      suggestions.push('maxIterations must be at least 1');
    }

    if (config.tolerance && config.tolerance <= 0) {
      isValid = false;
      suggestions.push('tolerance must be positive');
    }

    if (config.k > 20) {
      suggestions.push('k is quite large, consider reducing it');
    }

    if (config.maxIterations && config.maxIterations > 1000) {
      suggestions.push('maxIterations is quite large, consider reducing it for better performance');
    }

    return { isValid, suggestions };
  }

  /**
   * Get cluster statistics
   * @param result Clustering result
   * @returns Detailed cluster statistics
   */
  static getClusterStatistics(result: ClusteringResult): {
    clusterSizes: number[];
    clusterCenters: number[][];
    averageDistanceToCenter: number[];
    totalInertia: number;
  } {
    const clusterSizes = new Array(result.numClusters).fill(0);
    const clusterCenters = result.centers || [];
    const averageDistanceToCenter = new Array(result.numClusters).fill(0);
    const clusterDistanceSums = new Array(result.numClusters).fill(0);

    result.points.forEach((point) => {
      if (point.clusterId >= 0 && point.clusterId < result.numClusters) {
        clusterSizes[point.clusterId]++;
        if (point.distanceToCenter !== undefined) {
          clusterDistanceSums[point.clusterId] += point.distanceToCenter;
        }
      }
    });

    // Calculate average distances
    for (let i = 0; i < result.numClusters; i++) {
      if (clusterSizes[i] > 0) {
        averageDistanceToCenter[i] = clusterDistanceSums[i] / clusterSizes[i];
      }
    }

    return {
      clusterSizes,
      clusterCenters,
      averageDistanceToCenter,
      totalInertia: result.metrics?.inertia || 0,
    };
  }
}
