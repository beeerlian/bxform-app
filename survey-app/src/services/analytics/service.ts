/**
 * Main analytics service orchestrating all analytics capabilities
 * Provides a unified interface for survey data analysis
 */

import { Answer_Sheets } from '../../__generated__/graphql';
import { SurveyDataConverter } from './converter';
import { DBSCANAnalytics } from './dbscan';
import { HybridClusteringAnalytics } from './hybrid';
import { IPAAnalytics } from './ipa';
import { KMeansAnalytics } from './kmeans';
import {
  ClusteringResult,
  DataPoint,
  DBSCANConfig,
  HybridClusteringConfig,
  IPAAnalysisResult,
  KMeansConfig,
  SurveyResponse,
} from './types';

/**
 * Configuration options for analytics service
 */
export interface AnalyticsServiceConfig {
  /** Whether to normalize features before clustering */
  normalizeFeatures?: boolean;
  /** Whether to log analytics progress */
  verbose?: boolean;
  /** Default clustering approach */
  defaultClustering?: 'hybrid' | 'kmeans' | 'dbscan';
}

/**
 * Main analytics service providing comprehensive survey data analysis
 */
export class AnalyticsService {
  private config: AnalyticsServiceConfig;

  constructor(config: AnalyticsServiceConfig = {}) {
    this.config = {
      normalizeFeatures: true,
      verbose: false,
      defaultClustering: 'hybrid',
      ...config,
    };
  }

  /**
   * Parse answer based on question type and return standardized format
   * @param answerString Raw answer string (often JSON)
   * @param questionType Type of question (Ratio, Multiple, Importance Performance, etc.)
   * @returns Parsed answer with weight and label
   */
  parseAnswer(answerString: string, questionType: string): { weight: number; label: string }[] {
    return SurveyDataConverter.parseAnswer(answerString, questionType);
  }

  /**
   * Convert raw survey data to analytics format
   * @param answerSheets Raw answer sheets from GraphQL
   * @param options Conversion options
   * @returns Converted survey responses
   */
  convertSurveyData(
    answerSheets: Answer_Sheets[],
    options?: {
      startDate?: string;
      endDate?: string;
      filterSegment?: string;
    }
  ): SurveyResponse[] {
    this.log('📊 Converting survey data...');

    let responses = SurveyDataConverter.convertAnswerSheets(answerSheets);

    // Apply filters if provided
    if (options?.startDate || options?.endDate) {
      responses = SurveyDataConverter.filterByDateRange(
        responses,
        options.startDate,
        options.endDate
      );
    }

    if (options?.filterSegment) {
      responses = responses.filter((response) =>
        response.question_answers.some((qa) => qa.question?.segment === options.filterSegment)
      );
    }

    this.log(`✅ Converted ${responses.length} survey responses`);
    return responses;
  }

  /**
   * Perform clustering analysis on survey data
   * @param responses Survey responses
   * @param clusteringConfig Clustering configuration
   * @returns Clustering analysis result
   */
  async performClusteringAnalysis(
    responses: SurveyResponse[],
    clusteringConfig?: Partial<HybridClusteringConfig>
  ): Promise<{
    result: ClusteringResult;
    dataPoints: DataPoint[];
    clusterInfo: any;
    recommendations: string[];
  }> {
    this.log('🎯 Starting clustering analysis...');

    // Convert to data points
    let dataPoints = SurveyDataConverter.convertToDataPoints(responses);

    if (dataPoints.length === 0) {
      throw new Error('No data points available for clustering');
    }

    // Normalize features if configured
    if (this.config.normalizeFeatures) {
      dataPoints = SurveyDataConverter.normalizeFeatures(dataPoints);
      this.log('📏 Features normalized');
    }

    // Determine clustering approach
    const approach = this.config.defaultClustering;
    let result: ClusteringResult;

    switch (approach) {
      case 'hybrid':
        result = await this.performHybridClustering(dataPoints, clusteringConfig);
        break;
      case 'kmeans':
        result = await this.performKMeansClustering(dataPoints, clusteringConfig?.kmeans);
        break;
      case 'dbscan':
        result = await this.performDBSCANClustering(dataPoints, clusteringConfig?.dbscan);
        break;
      default:
        result = await this.performHybridClustering(dataPoints, clusteringConfig);
    }

    // Generate detailed cluster information
    const clusterInfo = HybridClusteringAnalytics.getDetailedClusterInfo(result);

    // Generate recommendations
    const recommendations = this.generateClusteringRecommendations(result, clusterInfo);

    this.log(
      `✅ Clustering complete: ${result.numClusters} clusters, ${result.numOutliers} outliers`
    );

    return {
      result,
      dataPoints,
      clusterInfo,
      recommendations,
    };
  }

  /**
   * Perform IPA (Importance Performance Analysis)
   * @param responses Survey responses
   * @param aspectMapping Mapping of aspects to question IDs
   * @param options IPA options
   * @returns IPA analysis result with recommendations
   */
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
  }> {
    this.log('📈 Starting IPA analysis...');

    // Convert aspect mapping to Maps
    const importanceQuestions = new Map<string, string>();
    const performanceQuestions = new Map<string, string>();

    Object.entries(aspectMapping).forEach(([aspect, mapping]) => {
      importanceQuestions.set(aspect, mapping.importanceQuestionId);
      performanceQuestions.set(aspect, mapping.performanceQuestionId);
    });

    // Convert to IPA data points
    const ipaDataPoints = SurveyDataConverter.convertToIPADataPoints(
      responses,
      importanceQuestions,
      performanceQuestions
    );

    if (ipaDataPoints.length === 0) {
      throw new Error('No IPA data points available for analysis');
    }

    // Perform IPA analysis
    const result = IPAAnalytics.performAnalysis(ipaDataPoints, options?.useGrandMean ?? true);

    // Generate recommendations
    const recommendations = IPAAnalytics.getPriorityRecommendations(result);

    // Generate chart data
    const chartData = IPAAnalytics.generateChartData(result);

    // Perform gap analysis
    const gapAnalysis = IPAAnalytics.calculateGapAnalysis(result);

    this.log(`✅ IPA analysis complete: ${result.aspects.length} aspects analyzed`);

    console.dir(result);

    return {
      result,
      recommendations,
      chartData,
      gapAnalysis,
    };
  }

  /**
   * Perform comprehensive analytics including both clustering and IPA
   * @param answerSheets Raw answer sheets
   * @param aspectMapping IPA aspect mapping
   * @param options Analysis options
   * @returns Comprehensive analytics result
   */
  async performComprehensiveAnalysis(
    answerSheets: Answer_Sheets[],
    aspectMapping?: {
      [aspect: string]: {
        importanceQuestionId: string;
        performanceQuestionId: string;
      };
    },
    options?: {
      clusteringConfig?: Partial<HybridClusteringConfig>;
      ipaOptions?: { useGrandMean?: boolean; segmentAnalysis?: boolean };
      dataOptions?: { startDate?: string; endDate?: string; filterSegment?: string };
    }
  ): Promise<{
    surveyResponses: SurveyResponse[];
    clusteringAnalysis?: {
      result: ClusteringResult;
      dataPoints: DataPoint[];
      clusterInfo: any;
      recommendations: string[];
    };
    ipaAnalysis?: {
      result: IPAAnalysisResult;
      recommendations: any;
      chartData: any;
      gapAnalysis: any;
    };
    insights: string[];
    metadata: {
      totalResponses: number;
      analysisDate: string;
      segmentDistribution: Record<string, number>;
    };
  }> {
    this.log('🚀 Starting comprehensive analytics...');

    // Convert survey data
    const surveyResponses = this.convertSurveyData(answerSheets, options?.dataOptions);

    // Initialize results
    let clusteringAnalysis: any = undefined;
    let ipaAnalysis: any = undefined;
    const insights: string[] = [];

    // Perform clustering analysis
    try {
      clusteringAnalysis = await this.performClusteringAnalysis(
        surveyResponses,
        options?.clusteringConfig
      );
      insights.push(
        `Identified ${clusteringAnalysis.result.numClusters} distinct response patterns`
      );
      if (clusteringAnalysis.result.numOutliers > 0) {
        insights.push(
          `Detected ${clusteringAnalysis.result.numOutliers} outlier responses (${(
            (clusteringAnalysis.result.numOutliers / surveyResponses.length) *
            100
          ).toFixed(1)}%)`
        );
      }
    } catch (error) {
      this.log(`⚠️ Clustering analysis failed: ${error}`);
      insights.push('Clustering analysis could not be performed due to insufficient data');
    }

    // Perform IPA analysis if mapping is provided
    if (aspectMapping) {
      try {
        ipaAnalysis = await this.performIPAAnalysis(
          surveyResponses,
          aspectMapping,
          options?.ipaOptions
        );
        insights.push(
          `Analyzed ${ipaAnalysis.result.aspects.length} aspects for importance vs performance`
        );
        insights.push(
          `${ipaAnalysis.recommendations.concentrateHere.length} aspects need immediate attention`
        );
      } catch (error) {
        this.log(`⚠️ IPA analysis failed: ${error}`);
        insights.push('IPA analysis could not be performed');
      }
    }

    // Generate metadata
    const segmentDistribution = this.calculateSegmentDistribution(surveyResponses);

    this.log('✅ Comprehensive analysis complete');

    return {
      surveyResponses,
      clusteringAnalysis,
      ipaAnalysis,
      insights,
      metadata: {
        totalResponses: surveyResponses.length,
        analysisDate: new Date().toISOString(),
        segmentDistribution,
      },
    };
  }

  /**
   * Perform hybrid clustering
   * @param dataPoints Data points for clustering
   * @param config Hybrid clustering configuration
   * @returns Clustering result
   */
  private async performHybridClustering(
    dataPoints: DataPoint[],
    config?: Partial<HybridClusteringConfig>
  ): Promise<ClusteringResult> {
    const optimalConfig = config || HybridClusteringAnalytics.suggestOptimalConfig(dataPoints);
    const hybridAnalytics = new HybridClusteringAnalytics(optimalConfig as HybridClusteringConfig);
    return hybridAnalytics.cluster(dataPoints);
  }

  /**
   * Perform K-Means clustering
   * @param dataPoints Data points for clustering
   * @param config K-Means configuration
   * @returns Clustering result
   */
  private async performKMeansClustering(
    dataPoints: DataPoint[],
    config?: Partial<KMeansConfig>
  ): Promise<ClusteringResult> {
    const k = config?.k || KMeansAnalytics.findOptimalK(dataPoints);
    const kmeansConfig: KMeansConfig = { k, ...config };
    const kmeans = new KMeansAnalytics(kmeansConfig);
    return kmeans.cluster(dataPoints);
  }

  /**
   * Perform DBSCAN clustering
   * @param dataPoints Data points for clustering
   * @param config DBSCAN configuration
   * @returns Clustering result
   */
  private async performDBSCANClustering(
    dataPoints: DataPoint[],
    config?: Partial<DBSCANConfig>
  ): Promise<ClusteringResult> {
    const dbscanConfig = config || DBSCANAnalytics.suggestConfig(dataPoints);
    const dbscan = new DBSCANAnalytics(dbscanConfig as DBSCANConfig);
    return dbscan.cluster(dataPoints);
  }

  /**
   * Generate clustering recommendations
   * @param result Clustering result
   * @param clusterInfo Detailed cluster information
   * @returns Array of recommendations
   */
  private generateClusteringRecommendations(result: ClusteringResult, clusterInfo: any): string[] {
    const recommendations: string[] = [];

    // Quality assessment
    const silhouetteScore = result.metrics?.silhouetteScore || 0;
    if (silhouetteScore > 0.7) {
      recommendations.push(
        'Excellent clustering quality - clusters are well-separated and cohesive'
      );
    } else if (silhouetteScore > 0.5) {
      recommendations.push('Good clustering quality - reasonable cluster separation');
    } else if (silhouetteScore > 0.25) {
      recommendations.push('Moderate clustering quality - consider adjusting parameters');
    } else {
      recommendations.push('Poor clustering quality - data may not have clear cluster structure');
    }

    // Outlier analysis
    const noiseRatio = result.metrics?.noiseRatio || 0;
    if (noiseRatio > 0.1) {
      recommendations.push(
        `High outlier ratio (${(noiseRatio * 100).toFixed(1)}%) - investigate data quality`
      );
    } else if (noiseRatio > 0.05) {
      recommendations.push('Moderate outlier presence - normal for survey data');
    }

    // Cluster balance
    const clusterSizes = clusterInfo.clusters.map((c: any) => c.size);
    const maxSize = Math.max(...clusterSizes);
    const minSize = Math.min(...clusterSizes);
    const imbalanceRatio = maxSize / minSize;

    if (imbalanceRatio > 5) {
      recommendations.push('Highly imbalanced clusters - consider different clustering parameters');
    } else if (imbalanceRatio > 3) {
      recommendations.push(
        'Moderately imbalanced clusters - review if this reflects actual data patterns'
      );
    }

    // Actionable insights
    if (result.numClusters <= 3) {
      recommendations.push(
        'Few distinct response patterns identified - consider targeted interventions'
      );
    } else if (result.numClusters >= 8) {
      recommendations.push(
        'Many response patterns found - consider grouping similar clusters for analysis'
      );
    }

    return recommendations;
  }

  /**
   * Calculate segment distribution
   * @param responses Survey responses
   * @returns Segment distribution
   */
  private calculateSegmentDistribution(responses: SurveyResponse[]): Record<string, number> {
    const segmentCounts: Record<string, number> = {};

    responses.forEach((response) => {
      let segment = 'unknown';

      // Try to determine segment from question answers
      for (const qa of response.question_answers) {
        if (qa.question?.segment) {
          segment = qa.question.segment;
          break;
        }
      }

      segmentCounts[segment] = (segmentCounts[segment] || 0) + 1;
    });

    return segmentCounts;
  }

  /**
   * Log message if verbose mode is enabled
   * @param message Message to log
   */
  private log(message: string): void {
    if (this.config.verbose) {
      console.log(`[AnalyticsService] ${message}`);
    }
  }

  /**
   * Get service configuration
   * @returns Current service configuration
   */
  getConfig(): AnalyticsServiceConfig {
    return { ...this.config };
  }

  /**
   * Update service configuration
   * @param newConfig New configuration options
   */
  updateConfig(newConfig: Partial<AnalyticsServiceConfig>): void {
    this.config = { ...this.config, ...newConfig };
  }

  /**
   * Validate input data for analysis
   * @param answerSheets Answer sheets to validate
   * @returns Validation result
   */
  static validateInputData(answerSheets: Answer_Sheets[]): {
    isValid: boolean;
    issues: string[];
    suggestions: string[];
  } {
    const issues: string[] = [];
    const suggestions: string[] = [];

    if (answerSheets.length === 0) {
      issues.push('No answer sheets provided');
      return { isValid: false, issues, suggestions };
    }

    // Check for minimum data requirements
    if (answerSheets.length < 10) {
      suggestions.push(
        'Consider collecting more responses for better analysis quality (recommended: 30+)'
      );
    }

    // Check for question answers
    const sheetsWithAnswers = answerSheets.filter(
      (sheet) => sheet.question_answers && sheet.question_answers.length > 0
    );

    if (sheetsWithAnswers.length === 0) {
      issues.push('No question answers found in the provided data');
      return { isValid: false, issues, suggestions };
    }

    if (sheetsWithAnswers.length < answerSheets.length) {
      suggestions.push(
        'Some answer sheets have no question answers - these will be excluded from analysis'
      );
    }

    // Check for data completeness
    const avgAnswersPerSheet =
      sheetsWithAnswers.reduce((sum, sheet) => sum + sheet.question_answers.length, 0) /
      sheetsWithAnswers.length;

    if (avgAnswersPerSheet < 3) {
      suggestions.push('Low average responses per sheet - analysis quality may be limited');
    }

    return {
      isValid: issues.length === 0,
      issues,
      suggestions,
    };
  }
}
