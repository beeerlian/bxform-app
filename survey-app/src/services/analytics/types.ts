/**
 * Types and interfaces for analytics services
 */

/**
 * Standard data point structure for analytics
 */
export interface DataPoint {
  /** Unique identifier for the data point */
  id: string;
  /** Feature values array (numerical values for analysis) */
  features: number[];
  /** Original data reference for traceability */
  metadata?: Record<string, any>;
}

/**
 * Raw survey response data from the database
 */
export interface SurveyResponse {
  /** Answer sheet ID */
  answer_sheet_id: string;
  /** User information */
  user_id?: string;
  user_name?: string;
  user_email?: string;
  /** Response timestamp */
  created_at: string;
  /** Array of question answers */
  question_answers: QuestionAnswer[];
}

/**
 * Individual question answer
 */
export interface QuestionAnswer {
  /** Question ID */
  question_id: string;
  /** Answer value (can be string, number, or JSON) */
  answer: any;
  /** Question metadata */
  question?: {
    content: string;
    type: string;
    segment?: string;
    weight?: number;
  };
}

/**
 * IPA (Importance Performance Analysis) data point
 */
export interface IPADataPoint extends DataPoint {
  /** Importance score */
  importance: number;
  /** Performance score */
  performance: number;
  /** Question/aspect being analyzed */
  aspect: string;
  /** Segment (academic, research, service, community) */
  segment?: string;
}

/**
 * Clustering result for a single data point
 */
export interface ClusterPoint extends DataPoint {
  /** Assigned cluster ID (-1 for noise/outlier) */
  clusterId: number;
  /** Distance to cluster center (for K-Means) */
  distanceToCenter?: number;
  /** Is this point considered an outlier? */
  isOutlier?: boolean;
}

/**
 * Complete clustering result
 */
export interface ClusteringResult {
  /** Clustered data points */
  points: ClusterPoint[];
  /** Cluster centers (for K-Means) */
  centers?: number[][];
  /** Number of clusters found */
  numClusters: number;
  /** Number of outliers detected */
  numOutliers: number;
  /** Algorithm used */
  algorithm: 'kmeans' | 'dbscan' | 'hybrid';
  /** Performance metrics */
  metrics?: {
    silhouetteScore?: number;
    inertia?: number;
    noiseRatio?: number;
  };
}

/**
 * IPA quadrant classification
 */
export enum IPAQuadrant {
  KEEP_UP_GOOD_WORK = 'keep_up_good_work', // High Importance, High Performance
  CONCENTRATE_HERE = 'concentrate_here', // High Importance, Low Performance
  LOW_PRIORITY = 'low_priority', // Low Importance, Low Performance
  POSSIBLE_OVERKILL = 'possible_overkill', // Low Importance, High Performance
}

/**
 * IPA analysis result for a single aspect
 */
export interface IPAResult {
  /** Aspect being analyzed */
  aspect: string;
  /** Average importance score */
  importance: number;
  /** Average performance score */
  performance: number;
  /** Quadrant classification */
  quadrant: IPAQuadrant;
  /** Number of responses for this aspect */
  responseCount: number;
  /** Segment this aspect belongs to */
  segment?: string;
  /** Statistical measures */
  statistics?: {
    importanceStdDev: number;
    performanceStdDev: number;
    correlation: number;
  };
}

/**
 * Complete IPA analysis result
 */
export interface IPAAnalysisResult {
  /** Results for each aspect */
  aspects: IPAResult[];
  /** Overall statistics */
  overall: {
    avgImportance: number;
    avgPerformance: number;
    totalResponses: number;
  };
  /** Results grouped by segment */
  bySegment?: Record<string, IPAResult[]>;
}

/**
 * Configuration for DBSCAN algorithm
 */
export interface DBSCANConfig {
  /** Maximum distance between two samples for one to be considered as in the neighborhood of the other */
  eps: number;
  /** Minimum number of samples in a neighborhood for a point to be considered as a core point */
  minPts: number;
}

/**
 * Configuration for K-Means algorithm
 */
export interface KMeansConfig {
  /** Number of clusters */
  k: number;
  /** Maximum number of iterations */
  maxIterations?: number;
  /** Convergence tolerance */
  tolerance?: number;
  /** Random seed for reproducibility */
  seed?: number;
}

/**
 * Configuration for hybrid clustering approach
 */
export interface HybridClusteringConfig {
  /** DBSCAN configuration for outlier detection */
  dbscan: DBSCANConfig;
  /** K-Means configuration for main clustering */
  kmeans: KMeansConfig;
  /** Whether to include outliers in final clustering */
  includeOutliers?: boolean;
}
