/**
 * DBSCAN (Density-Based Spatial Clustering of Applications with Noise) implementation
 * Used for outlier detection in the hybrid clustering approach
 */

import { ClusterPoint, ClusteringResult, DBSCANConfig, DataPoint } from './types';

/**
 * DBSCAN clustering algorithm implementation
 * Particularly useful for outlier detection and finding clusters of varying shapes
 */
export class DBSCANAnalytics {
  private config: DBSCANConfig;

  constructor(config: DBSCANConfig) {
    this.config = config;
  }

  /**
   * Perform DBSCAN clustering
   * @param dataPoints Input data points
   * @returns Clustering result with outliers marked
   */
  cluster(dataPoints: DataPoint[]): ClusteringResult {
    if (dataPoints.length === 0) {
      return {
        points: [],
        numClusters: 0,
        numOutliers: 0,
        algorithm: 'dbscan',
        metrics: { noiseRatio: 0 },
      };
    }

    const points: ClusterPoint[] = dataPoints.map((dp) => ({
      ...dp,
      clusterId: -1, // -1 indicates unprocessed
      isOutlier: false,
    }));

    let clusterId = 0;
    const visited = new Set<number>();

    // Process each point
    for (let i = 0; i < points.length; i++) {
      if (visited.has(i)) continue;

      visited.add(i);
      const neighbors = this.getNeighbors(points, i);

      if (neighbors.length < this.config.minPts) {
        // Mark as noise/outlier
        points[i].clusterId = -1;
        points[i].isOutlier = true;
      } else {
        // Start new cluster
        this.expandCluster(points, i, neighbors, clusterId, visited);
        clusterId++;
      }
    }

    const numOutliers = points.filter((p) => p.isOutlier).length;
    const numClusters = clusterId;

    return {
      points,
      numClusters,
      numOutliers,
      algorithm: 'dbscan',
      metrics: {
        noiseRatio: numOutliers / points.length,
        silhouetteScore: this.calculateSilhouetteScore(points),
      },
    };
  }

  /**
   * Expand cluster from a core point
   * @param points All points
   * @param pointIndex Index of core point
   * @param neighbors Neighbors of core point
   * @param clusterId Current cluster ID
   * @param visited Set of visited point indices
   */
  private expandCluster(
    points: ClusterPoint[],
    pointIndex: number,
    neighbors: number[],
    clusterId: number,
    visited: Set<number>
  ): void {
    points[pointIndex].clusterId = clusterId;
    points[pointIndex].isOutlier = false;

    let i = 0;
    while (i < neighbors.length) {
      const neighborIndex = neighbors[i];

      if (!visited.has(neighborIndex)) {
        visited.add(neighborIndex);
        const neighborNeighbors = this.getNeighbors(points, neighborIndex);

        if (neighborNeighbors.length >= this.config.minPts) {
          // Add new neighbors to the cluster expansion
          neighbors.push(...neighborNeighbors);
        }
      }

      if (points[neighborIndex].clusterId === -1) {
        points[neighborIndex].clusterId = clusterId;
        points[neighborIndex].isOutlier = false;
      }

      i++;
    }
  }

  /**
   * Get neighbors within eps distance
   * @param points All points
   * @param pointIndex Index of target point
   * @returns Array of neighbor indices
   */
  private getNeighbors(points: ClusterPoint[], pointIndex: number): number[] {
    const neighbors: number[] = [];
    const targetPoint = points[pointIndex];

    for (let i = 0; i < points.length; i++) {
      if (i === pointIndex) continue;

      const distance = this.calculateDistance(targetPoint.features, points[i].features);
      if (distance <= this.config.eps) {
        neighbors.push(i);
      }
    }

    return neighbors;
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
   * Calculate silhouette score for clustering quality assessment
   * @param points Clustered points
   * @returns Silhouette score (-1 to 1, higher is better)
   */
  private calculateSilhouetteScore(points: ClusterPoint[]): number {
    const clusterPoints = points.filter((p) => !p.isOutlier);
    if (clusterPoints.length === 0) return 0;

    const clusters = new Map<number, ClusterPoint[]>();
    clusterPoints.forEach((point) => {
      if (!clusters.has(point.clusterId)) {
        clusters.set(point.clusterId, []);
      }
      clusters.get(point.clusterId)!.push(point);
    });

    if (clusters.size <= 1) return 0;

    let totalSilhouette = 0;

    clusterPoints.forEach((point) => {
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

    return totalSilhouette / clusterPoints.length;
  }

  /**
   * Remove outliers from dataset
   * @param dataPoints Original data points
   * @returns Data points without outliers
   */
  removeOutliers(dataPoints: DataPoint[]): DataPoint[] {
    const result = this.cluster(dataPoints);
    return result.points
      .filter((point) => !point.isOutlier)
      .map((point) => ({
        id: point.id,
        features: point.features,
        metadata: point.metadata,
      }));
  }

  /**
   * Get outliers from dataset
   * @param dataPoints Original data points
   * @returns Outlier data points
   */
  getOutliers(dataPoints: DataPoint[]): DataPoint[] {
    const result = this.cluster(dataPoints);
    return result.points
      .filter((point) => point.isOutlier)
      .map((point) => ({
        id: point.id,
        features: point.features,
        metadata: point.metadata,
      }));
  }

  /**
   * Validate DBSCAN configuration
   * @param config Configuration to validate
   * @returns Validation result with suggestions
   */
  static validateConfig(config: DBSCANConfig): { isValid: boolean; suggestions: string[] } {
    const suggestions: string[] = [];
    let isValid = true;

    if (config.eps <= 0) {
      isValid = false;
      suggestions.push('eps must be positive');
    }

    if (config.minPts < 1) {
      isValid = false;
      suggestions.push('minPts must be at least 1');
    }

    if (config.eps > 2) {
      suggestions.push('eps seems quite large, consider reducing it');
    }

    if (config.minPts < 3) {
      suggestions.push('minPts is quite small, consider increasing it for better noise detection');
    }

    return { isValid, suggestions };
  }

  /**
   * Suggest optimal DBSCAN parameters based on data characteristics
   * @param dataPoints Sample data points
   * @param sampleSize Number of points to sample for parameter estimation
   * @returns Suggested configuration
   */
  static suggestConfig(dataPoints: DataPoint[], sampleSize: number = 100): DBSCANConfig {
    if (dataPoints.length === 0) {
      return { eps: 0.5, minPts: 3 };
    }

    // Sample points for efficiency
    const samplePoints =
      dataPoints.length <= sampleSize ? dataPoints : this.samplePoints(dataPoints, sampleSize);

    // Calculate k-distance for eps estimation
    const kDistances = this.calculateKDistances(samplePoints, 4);
    kDistances.sort((a, b) => b - a);

    // Use knee point detection for eps
    const eps = this.findKneePoint(kDistances) || this.calculateMedian(kDistances);

    // Suggest minPts based on dimensionality
    const dimensionality = samplePoints[0].features.length;
    const minPts = Math.max(3, Math.min(dimensionality + 1, Math.ceil(samplePoints.length * 0.02)));

    return { eps, minPts };
  }

  /**
   * Sample points randomly from dataset
   * @param dataPoints All data points
   * @param sampleSize Number of points to sample
   * @returns Sampled points
   */
  private static samplePoints(dataPoints: DataPoint[], sampleSize: number): DataPoint[] {
    const shuffled = [...dataPoints].sort(() => Math.random() - 0.5);
    return shuffled.slice(0, sampleSize);
  }

  /**
   * Calculate k-distances for all points
   * @param dataPoints Data points
   * @param k Number of nearest neighbors
   * @returns Array of k-distances
   */
  private static calculateKDistances(dataPoints: DataPoint[], k: number): number[] {
    return dataPoints.map((point) => {
      const distances = dataPoints
        .map((other) => ({
          distance: this.euclideanDistance(point.features, other.features),
          id: other.id,
        }))
        .filter((item) => item.id !== point.id)
        .sort((a, b) => a.distance - b.distance);

      return distances[Math.min(k - 1, distances.length - 1)]?.distance || 0;
    });
  }

  /**
   * Calculate Euclidean distance (static version)
   * @param features1 First feature vector
   * @param features2 Second feature vector
   * @returns Euclidean distance
   */
  private static euclideanDistance(features1: number[], features2: number[]): number {
    let sum = 0;
    for (let i = 0; i < features1.length; i++) {
      const diff = features1[i] - features2[i];
      sum += diff * diff;
    }
    return Math.sqrt(sum);
  }

  /**
   * Find knee point in sorted distances for eps estimation
   * @param sortedDistances Sorted k-distances
   * @returns Estimated eps value
   */
  private static findKneePoint(sortedDistances: number[]): number | null {
    if (sortedDistances.length < 3) return null;

    let maxCurvature = 0;
    let kneeIndex = 0;

    for (let i = 1; i < sortedDistances.length - 1; i++) {
      const curvature = Math.abs(
        sortedDistances[i - 1] - 2 * sortedDistances[i] + sortedDistances[i + 1]
      );

      if (curvature > maxCurvature) {
        maxCurvature = curvature;
        kneeIndex = i;
      }
    }

    return sortedDistances[kneeIndex];
  }

  /**
   * Calculate median of array
   * @param values Array of numbers
   * @returns Median value
   */
  private static calculateMedian(values: number[]): number {
    const sorted = [...values].sort((a, b) => a - b);
    const mid = Math.floor(sorted.length / 2);
    return sorted.length % 2 === 0 ? (sorted[mid - 1] + sorted[mid]) / 2 : sorted[mid];
  }
}
