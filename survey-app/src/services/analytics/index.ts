/**
 * Analytics Service - Main Export
 *
 * A comprehensive, modular analytics service for survey data analysis providing:
 * - Hybrid clustering (DBSCAN + K-Means)
 * - Importance Performance Analysis (IPA)
 * - Data conversion utilities
 * - Comprehensive documentation and examples
 *
 * @example
 * ```typescript
 * import { AnalyticsService } from './services/analytics';
 *
 * const analytics = new AnalyticsService({ verbose: true });
 * const result = await analytics.performComprehensiveAnalysis(answerSheets);
 * ```
 */

// Main service export
export { AnalyticsService, type AnalyticsServiceConfig } from './service';

// Individual analytics classes
export { SurveyDataConverter } from './converter';
export { DBSCANAnalytics } from './dbscan';
export { HybridClusteringAnalytics } from './hybrid';
export { IPAAnalytics } from './ipa';
export { KMeansAnalytics } from './kmeans';

// Type definitions
export * from './types';

// Examples and testing utilities
export * from './examples';
export { runAllTests, validateAnalyticsService } from './test';

// Default export for convenience
export { AnalyticsService as default } from './service';
