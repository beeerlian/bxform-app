# Analytics Service Documentation

A comprehensive, modular analytics service for survey data analysis providing clustering and Importance Performance Analysis (IPA) capabilities.

## Overview

The Analytics Service provides a clean, well-documented, and easily adjustable system for analyzing survey data. It implements:

1. **Hybrid Clustering**: DBSCAN outlier detection + K-Means clustering
2. **Importance Performance Analysis (IPA)**: Evaluating importance vs performance relationships
3. **Data Conversion**: Transform database structures to analytics-ready formats

## Architecture

```
src/services/analytics/
├── index.ts          # Main AnalyticsService orchestrator
├── types.ts          # Type definitions and interfaces
├── converter.ts      # Data conversion utilities
├── dbscan.ts         # DBSCAN clustering algorithm
├── kmeans.ts         # K-Means clustering algorithm
├── hybrid.ts         # Hybrid clustering (DBSCAN + K-Means)
├── ipa.ts           # Importance Performance Analysis
└── README.md        # This documentation
```

## Quick Start

### Basic Usage

```typescript
import { AnalyticsService } from './services/analytics';
import { Answer_Sheets } from './__generated__/graphql';

// Initialize service
const analytics = new AnalyticsService({
  normalizeFeatures: true,
  verbose: true,
  defaultClustering: 'hybrid'
});

// Perform comprehensive analysis
const answerSheets: Answer_Sheets[] = /* your data */;
const result = await analytics.performComprehensiveAnalysis(answerSheets);

console.log(`Found ${result.clusteringAnalysis?.result.numClusters} clusters`);
console.log(`Analyzed ${result.ipaAnalysis?.result.aspects.length} aspects`);
```

### Clustering Only

```typescript
// Convert data
const responses = analytics.convertSurveyData(answerSheets);

// Perform clustering
const clusteringResult = await analytics.performClusteringAnalysis(responses, {
  dbscan: { eps: 0.5, minPts: 3 },
  kmeans: { k: 4 },
  includeOutliers: false,
});

console.log('Clusters found:', clusteringResult.result.numClusters);
console.log('Outliers detected:', clusteringResult.result.numOutliers);
```

### IPA Analysis Only

```typescript
// Define aspect mapping
const aspectMapping = {
  teaching_quality: {
    importanceQuestionId: 'q1_importance',
    performanceQuestionId: 'q1_performance',
  },
  research_support: {
    importanceQuestionId: 'q2_importance',
    performanceQuestionId: 'q2_performance',
  },
};

// Perform IPA analysis
const ipaResult = await analytics.performIPAAnalysis(responses, aspectMapping, {
  useGrandMean: true,
});

console.log('Priority recommendations:', ipaResult.recommendations.actionItems);
```

## Detailed API Reference

### AnalyticsService

The main orchestrator class providing unified access to all analytics capabilities.

#### Constructor

```typescript
new AnalyticsService(config?: AnalyticsServiceConfig)
```

**Config Options:**

- `normalizeFeatures?: boolean` - Normalize features to 0-1 range (default: true)
- `verbose?: boolean` - Enable logging (default: false)
- `defaultClustering?: 'hybrid' | 'kmeans' | 'dbscan'` - Default clustering method (default: 'hybrid')

#### Methods

##### convertSurveyData()

```typescript
convertSurveyData(
  answerSheets: Answer_Sheets[],
  options?: {
    startDate?: string;
    endDate?: string;
    filterSegment?: string;
  }
): SurveyResponse[]
```

Converts raw GraphQL answer sheets to standardized survey responses.

##### performClusteringAnalysis()

```typescript
async performClusteringAnalysis(
  responses: SurveyResponse[],
  clusteringConfig?: Partial<HybridClusteringConfig>
): Promise<{
  result: ClusteringResult;
  dataPoints: DataPoint[];
  clusterInfo: any;
  recommendations: string[];
}>
```

Performs clustering analysis with the configured algorithm.

##### performIPAAnalysis()

```typescript
async performIPAAnalysis(
  responses: SurveyResponse[],
  aspectMapping: {
    [aspect: string]: {
      importanceQuestionId: string;
      performanceQuestionId: string;
    };
  },
  options?: {
    useGrandMean?: boolean;
    segmentAnalysis?: boolean;
  }
): Promise<{
  result: IPAAnalysisResult;
  recommendations: any;
  chartData: any;
  gapAnalysis: any;
}>
```

Performs Importance Performance Analysis.

##### performComprehensiveAnalysis()

```typescript
async performComprehensiveAnalysis(
  answerSheets: Answer_Sheets[],
  aspectMapping?: { ... },
  options?: { ... }
): Promise<{
  surveyResponses: SurveyResponse[];
  clusteringAnalysis?: { ... };
  ipaAnalysis?: { ... };
  insights: string[];
  metadata: { ... };
}>
```

Performs both clustering and IPA analysis with comprehensive insights.

### Individual Analytics Classes

#### HybridClusteringAnalytics

Implements the hybrid clustering approach: DBSCAN for outlier detection followed by K-Means for main clustering.

```typescript
const hybridAnalytics = new HybridClusteringAnalytics({
  dbscan: { eps: 0.5, minPts: 3 },
  kmeans: { k: 4 },
  includeOutliers: false,
});

const result = hybridAnalytics.cluster(dataPoints);
```

**Key Features:**

- Automatic outlier detection and removal
- Robust clustering of clean data
- Stability analysis across multiple runs
- Comprehensive cluster quality metrics

#### KMeansAnalytics

Standard K-Means clustering with K-Means++ initialization.

```typescript
const kmeans = new KMeansAnalytics({
  k: 4,
  maxIterations: 100,
  tolerance: 1e-4,
  seed: 42,
});

const result = kmeans.cluster(dataPoints);
```

**Key Features:**

- K-Means++ initialization for better centroids
- Automatic optimal k detection using elbow method
- Convergence monitoring
- Silhouette score calculation

#### DBSCANAnalytics

Density-based clustering for outlier detection and variable-shape clusters.

```typescript
const dbscan = new DBSCANAnalytics({
  eps: 0.5,
  minPts: 3,
});

const result = dbscan.cluster(dataPoints);
```

**Key Features:**

- Automatic parameter suggestion
- Robust outlier detection
- Handles clusters of varying shapes and densities
- No need to specify number of clusters

#### IPAAnalytics

Importance Performance Analysis for evaluating aspect relationships.

```typescript
const ipaResult = IPAAnalytics.performAnalysis(ipaDataPoints, true);
const recommendations = IPAAnalytics.getPriorityRecommendations(ipaResult);
```

**Key Features:**

- Quadrant classification (Keep up, Concentrate, Low priority, Overkill)
- Statistical analysis (correlation, standard deviation)
- Gap analysis (performance - importance)
- Priority recommendations
- Segment-based analysis

### Data Conversion

#### SurveyDataConverter

Utilities for converting GraphQL data to analytics formats.

```typescript
// Convert answer sheets
const responses = SurveyDataConverter.convertAnswerSheets(answerSheets);

// Convert to data points for clustering
const dataPoints = SurveyDataConverter.convertToDataPoints(responses);

// Convert to IPA data points
const ipaPoints = SurveyDataConverter.convertToIPADataPoints(
  responses,
  importanceQuestions,
  performanceQuestions
);

// Normalize features
const normalizedPoints = SurveyDataConverter.normalizeFeatures(dataPoints);
```

## Configuration Examples

### Hybrid Clustering Configuration

```typescript
const hybridConfig: HybridClusteringConfig = {
  dbscan: {
    eps: 0.5, // Distance threshold
    minPts: 3, // Minimum points for core point
  },
  kmeans: {
    k: 4, // Number of clusters
    maxIterations: 100,
    tolerance: 1e-4,
    seed: 42,
  },
  includeOutliers: false, // Exclude outliers from final result
};
```

### IPA Aspect Mapping

```typescript
const aspectMapping = {
  academic_programs: {
    importanceQuestionId: 'academic_importance',
    performanceQuestionId: 'academic_performance',
  },
  research_facilities: {
    importanceQuestionId: 'research_importance',
    performanceQuestionId: 'research_performance',
  },
  student_services: {
    importanceQuestionId: 'services_importance',
    performanceQuestionId: 'services_performance',
  },
  campus_facilities: {
    importanceQuestionId: 'campus_importance',
    performanceQuestionId: 'campus_performance',
  },
};
```

## Understanding Results

### Clustering Results

```typescript
interface ClusteringResult {
  points: ClusterPoint[]; // Clustered data points
  centers?: number[][]; // Cluster centroids (K-Means)
  numClusters: number; // Number of clusters found
  numOutliers: number; // Number of outliers detected
  algorithm: 'kmeans' | 'dbscan' | 'hybrid';
  metrics?: {
    silhouetteScore?: number; // Quality measure (-1 to 1, higher is better)
    inertia?: number; // Within-cluster sum of squares
    noiseRatio?: number; // Ratio of outliers to total points
  };
}
```

**Interpreting Silhouette Score:**

- > 0.7: Excellent clustering
- 0.5-0.7: Good clustering
- 0.25-0.5: Moderate clustering
- < 0.25: Poor clustering

### IPA Results

```typescript
interface IPAResult {
  aspect: string; // Aspect name
  importance: number; // Average importance score
  performance: number; // Average performance score
  quadrant: IPAQuadrant; // Quadrant classification
  responseCount: number; // Number of responses
  segment?: string; // Primary segment
  statistics?: {
    importanceStdDev: number;
    performanceStdDev: number;
    correlation: number;
  };
}
```

**IPA Quadrants:**

- **Keep Up Good Work**: High importance, high performance - maintain current efforts
- **Concentrate Here**: High importance, low performance - immediate attention needed
- **Low Priority**: Low importance, low performance - monitor for changes
- **Possible Overkill**: Low importance, high performance - consider resource reallocation

## Best Practices

### Data Preparation

1. **Minimum Sample Size**: Collect at least 30 responses for reliable clustering
2. **Question Consistency**: Ensure consistent rating scales across questions
3. **Data Quality**: Remove incomplete or invalid responses before analysis

### Clustering Configuration

1. **Feature Normalization**: Always normalize features when scales differ
2. **Parameter Tuning**: Use suggested configurations as starting points
3. **Stability Testing**: Run multiple analyses to verify stability
4. **Outlier Handling**: Consider domain knowledge when including/excluding outliers

### IPA Analysis

1. **Balanced Aspects**: Include 6-12 aspects for optimal analysis
2. **Scale Alignment**: Ensure importance and performance use same scale
3. **Segment Analysis**: Group by relevant segments (academic, research, etc.)
4. **Temporal Analysis**: Compare results across different time periods

## Error Handling

The service includes comprehensive error handling and validation:

```typescript
// Validate input data
const validation = AnalyticsService.validateInputData(answerSheets);
if (!validation.isValid) {
  console.error('Data validation failed:', validation.issues);
  console.log('Suggestions:', validation.suggestions);
}

// Validate configurations
const configValidation = HybridClusteringAnalytics.validateConfig(config);
if (!configValidation.isValid) {
  console.error('Configuration invalid:', configValidation.suggestions);
}
```

## Performance Considerations

1. **Large Datasets**: For >1000 responses, consider sampling for parameter tuning
2. **Feature Dimensions**: High-dimensional data may require dimensionality reduction
3. **Memory Usage**: Normalize features in chunks for very large datasets
4. **Computation Time**: DBSCAN can be slow on large datasets with high eps values

## Integration Examples

### With React Components

```typescript
// In a React component
const [analysisResult, setAnalysisResult] = useState(null);
const [loading, setLoading] = useState(false);

const runAnalysis = async () => {
  setLoading(true);
  try {
    const analytics = new AnalyticsService({ verbose: true });
    const result = await analytics.performComprehensiveAnalysis(answerSheets, aspectMapping);
    setAnalysisResult(result);
  } catch (error) {
    console.error('Analysis failed:', error);
  } finally {
    setLoading(false);
  }
};
```

### With Chart Visualization

```typescript
// Generate chart data for visualization
const chartData = IPAAnalytics.generateChartData(ipaResult);

// Use with your preferred charting library
const scatterPlotData = chartData.data.map((point) => ({
  x: point.x,
  y: point.y,
  label: point.label,
  color: getQuadrantColor(point.quadrant),
  size: point.size,
}));
```

## Troubleshooting

### Common Issues

1. **"No data points available"**: Check if answer sheets contain question_answers
2. **Poor clustering quality**: Try adjusting eps/minPts for DBSCAN or k for K-Means
3. **IPA analysis fails**: Verify aspect mapping question IDs exist in data
4. **Inconsistent results**: Ensure data preprocessing is consistent

### Debug Mode

Enable verbose logging for detailed analysis steps:

```typescript
const analytics = new AnalyticsService({ verbose: true });
```

This will output detailed logs of the analysis process, helping identify issues.

## Contributing

When extending the analytics service:

1. Follow the established patterns in type definitions
2. Add comprehensive JSDoc documentation
3. Include error handling and validation
4. Write unit tests for new functionality
5. Update this README with new features

## License

This analytics service is part of the survey application and follows the same license terms.
