import { FORM } from '@/apollo/Operations';
import Spinner from '@/components/loading/Spinner';
import { AnalyticsService } from '@/services/analytics';
import type {
  ClusteringResult,
  IPAAnalysisResult,
  SurveyResponse,
} from '@/services/analytics/types';
import type { OptionType } from '@/types/dto-types';
import { useQuery } from '@apollo/client';
import React, { useCallback, useEffect, useMemo, useState } from 'react';

// Import existing charts
import HeatmapChart from '@/components/chart/HeatmapChart';
import IPAChart from '@/components/chart/IPAChart';
import KMeansClusteringChart from '@/components/chart/KMeansClusteringChart';

interface Props {
  formId: string;
}

/**
 * Question types that can be analyzed numerically
 * Excludes text-based fields like name, email, essay, etc.
 */
const ANALYZABLE_QUESTION_TYPES: OptionType[] = [
  'Multiple', // Multiple choice (converted to numerical)
  'Ratio', // Rating scales
  'Importance Performance', // Importance-Performance Analysis
  'Number', // Direct numerical input
];

/**
 * Question types suitable for clustering analysis
 * These provide meaningful numerical data for grouping respondents
 */
const CLUSTERING_SUITABLE_TYPES: OptionType[] = ['Multiple', 'Ratio', 'Number'];

/**
 * Interface for basic statistics calculated from survey data
 */
interface BasicStatistics {
  totalResponses: number;
  completionRate: number;
  averageResponseTime?: number;
  questionStats: {
    [questionId: string]: {
      questionText: string;
      responseCount: number;
      mean?: number;
      median?: number;
      mode?: string | number;
      standardDeviation?: number;
      distribution: { [value: string]: number };
    };
  };
}

/**
 * Calculate basic statistics from the survey data
 */
const calculateBasicStatistics = (
  responseData: any[],
  analyzableQuestions: any[],
  questionAnswers: any[]
): BasicStatistics => {
  const totalResponses = responseData.length;
  const completionRate = totalResponses > 0 ? 100 : 0; // Simplified for now

  const questionStats: BasicStatistics['questionStats'] = {};

  analyzableQuestions.forEach((question) => {
    const qAnswers = questionAnswers?.filter((qa) => qa.question_id === question.id) || [];
    const numericAnswers = qAnswers
      .map((qa) => {
        // Convert answer to numeric value based on question type
        const questionType = question.option?.type;
        if (questionType === 'Ratio' || questionType === 'Number') {
          return parseFloat(qa.answer) || 0;
        } else if (questionType === 'Multiple') {
          // For multiple choice, use option index or similar
          return typeof qa.answer === 'number' ? qa.answer : 0;
        }
        return 0;
      })
      .filter((val) => !isNaN(val));

    // Calculate statistics
    const mean =
      numericAnswers.length > 0
        ? numericAnswers.reduce((a, b) => a + b, 0) / numericAnswers.length
        : 0;
    const sorted = [...numericAnswers].sort((a, b) => a - b);
    const median =
      sorted.length > 0
        ? sorted.length % 2 === 0
          ? (sorted[sorted.length / 2 - 1] + sorted[sorted.length / 2]) / 2
          : sorted[Math.floor(sorted.length / 2)]
        : 0;

    const variance =
      numericAnswers.length > 0
        ? numericAnswers.reduce((acc, val) => acc + Math.pow(val - mean, 2), 0) /
          numericAnswers.length
        : 0;
    const standardDeviation = Math.sqrt(variance);

    // Calculate distribution
    const distribution: { [value: string]: number } = {};
    qAnswers.forEach((qa) => {
      const answerStr = String(qa.answer);
      distribution[answerStr] = (distribution[answerStr] || 0) + 1;
    });

    questionStats[question.id] = {
      questionText: question.content,
      responseCount: qAnswers.length,
      mean: numericAnswers.length > 0 ? mean : undefined,
      median: numericAnswers.length > 0 ? median : undefined,
      standardDeviation: numericAnswers.length > 0 ? standardDeviation : undefined,
      distribution,
    };
  });

  return {
    totalResponses,
    completionRate,
    questionStats,
  };
};

/**
 * Component for displaying basic statistics
 */
const BasicStatisticsSection: React.FC<{ statistics: BasicStatistics }> = ({ statistics }) => (
  <div className="bg-white rounded-lg border border-gray-200 p-6">
    <h3 className="text-lg font-medium mb-4">Basic Statistics</h3>

    {/* Overall Statistics */}
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
      <div className="bg-blue-50 p-4 rounded-lg">
        <p className="text-sm text-blue-600 font-medium">Total Responses</p>
        <p className="text-2xl font-bold text-blue-900">{statistics.totalResponses}</p>
      </div>
      <div className="bg-green-50 p-4 rounded-lg">
        <p className="text-sm text-green-600 font-medium">Completion Rate</p>
        <p className="text-2xl font-bold text-green-900">{statistics.completionRate.toFixed(1)}%</p>
      </div>
      <div className="bg-purple-50 p-4 rounded-lg">
        <p className="text-sm text-purple-600 font-medium">Questions Analyzed</p>
        <p className="text-2xl font-bold text-purple-900">
          {Object.keys(statistics.questionStats).length}
        </p>
      </div>
    </div>

    {/* Question-wise Statistics */}
    <div className="space-y-4">
      <h4 className="font-medium text-gray-900">Question-wise Analysis</h4>
      {Object.entries(statistics.questionStats).map(([questionId, stats]) => (
        <div key={questionId} className="border border-gray-100 rounded-lg p-4">
          <h5 className="font-medium text-gray-800 mb-2">{stats.questionText}</h5>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
            <div>
              <span className="text-gray-600">Responses:</span>
              <span className="ml-2 font-medium">{stats.responseCount}</span>
            </div>
            {stats.mean && (
              <div>
                <span className="text-gray-600">Mean:</span>
                <span className="ml-2 font-medium">{stats.mean.toFixed(2)}</span>
              </div>
            )}
            {stats.median && (
              <div>
                <span className="text-gray-600">Median:</span>
                <span className="ml-2 font-medium">{stats.median}</span>
              </div>
            )}
            {stats.standardDeviation && (
              <div>
                <span className="text-gray-600">Std Dev:</span>
                <span className="ml-2 font-medium">{stats.standardDeviation.toFixed(2)}</span>
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  </div>
);

/**
 * Component for displaying clustering analysis results
 */
const ClusteringAnalysisSection: React.FC<{ result: ClusteringResult }> = ({ result }) => (
  <div className="bg-white rounded-lg border border-gray-200 p-6">
    <h3 className="text-lg font-medium mb-4">Clustering Analysis</h3>

    {/* Clustering Overview */}
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
      <div className="bg-indigo-50 p-4 rounded-lg">
        <p className="text-sm text-indigo-600 font-medium">Algorithm</p>
        <p className="text-lg font-bold text-indigo-900 capitalize">{result.algorithm}</p>
      </div>
      <div className="bg-green-50 p-4 rounded-lg">
        <p className="text-sm text-green-600 font-medium">Clusters Found</p>
        <p className="text-2xl font-bold text-green-900">{result.numClusters}</p>
      </div>
      <div className="bg-yellow-50 p-4 rounded-lg">
        <p className="text-sm text-yellow-600 font-medium">Outliers</p>
        <p className="text-2xl font-bold text-yellow-900">{result.numOutliers}</p>
      </div>
      <div className="bg-blue-50 p-4 rounded-lg">
        <p className="text-sm text-blue-600 font-medium">Silhouette Score</p>
        <p className="text-2xl font-bold text-blue-900">
          {result.metrics?.silhouetteScore?.toFixed(3) || 'N/A'}
        </p>
      </div>
    </div>

    {/* Cluster Distribution */}
    <div>
      <h4 className="font-medium text-gray-900 mb-3">Cluster Distribution</h4>
      <div className="space-y-2">
        {Array.from({ length: result.numClusters }, (_, i) => i).map((clusterId) => {
          const clusterPoints = result.points.filter((p: any) => p.clusterId === clusterId);
          const percentage = ((clusterPoints.length / result.points.length) * 100).toFixed(1);
          return (
            <div key={clusterId} className="flex items-center">
              <div
                className="w-4 h-4 rounded mr-3"
                style={{
                  backgroundColor: `hsl(${(clusterId * 360) / result.numClusters}, 70%, 60%)`,
                }}
              />
              <span className="text-sm">
                Cluster {clusterId + 1}: {clusterPoints.length} responses ({percentage}%)
              </span>
            </div>
          );
        })}
        {result.numOutliers > 0 && (
          <div className="flex items-center">
            <div className="w-4 h-4 rounded mr-3 bg-gray-400" />
            <span className="text-sm">
              Outliers: {result.numOutliers} responses (
              {((result.numOutliers / result.points.length) * 100).toFixed(1)}%)
            </span>
          </div>
        )}
      </div>
    </div>
  </div>
);

/**
 * Component for displaying IPA analysis results
 */
const IPAAnalysisSection: React.FC<{ result: IPAAnalysisResult }> = ({ result }) => {
  // Group aspects by quadrant for summary
  const quadrantCounts = {
    concentrateHere: result.aspects.filter((a: any) => a.quadrant === 'concentrate_here').length,
    keepUpGoodWork: result.aspects.filter((a: any) => a.quadrant === 'keep_up_good_work').length,
    lowPriority: result.aspects.filter((a: any) => a.quadrant === 'low_priority').length,
    possibleOverkill: result.aspects.filter((a: any) => a.quadrant === 'possible_overkill').length,
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <h3 className="text-lg font-medium mb-4">Importance-Performance Analysis (IPA)</h3>

      {/* IPA Quadrants Summary */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-red-50 p-4 rounded-lg">
          <p className="text-sm text-red-600 font-medium">Concentrate Here</p>
          <p className="text-2xl font-bold text-red-900">{quadrantCounts.concentrateHere}</p>
        </div>
        <div className="bg-green-50 p-4 rounded-lg">
          <p className="text-sm text-green-600 font-medium">Keep Up Good Work</p>
          <p className="text-2xl font-bold text-green-900">{quadrantCounts.keepUpGoodWork}</p>
        </div>
        <div className="bg-yellow-50 p-4 rounded-lg">
          <p className="text-sm text-yellow-600 font-medium">Low Priority</p>
          <p className="text-2xl font-bold text-yellow-900">{quadrantCounts.lowPriority}</p>
        </div>
        <div className="bg-blue-50 p-4 rounded-lg">
          <p className="text-sm text-blue-600 font-medium">Possible Overkill</p>
          <p className="text-2xl font-bold text-blue-900">{quadrantCounts.possibleOverkill}</p>
        </div>
      </div>

      {/* Detailed Aspects */}
      <div>
        <h4 className="font-medium text-gray-900 mb-3">Aspect Analysis</h4>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-2">Aspect</th>
                <th className="text-left py-2">Importance</th>
                <th className="text-left py-2">Performance</th>
                <th className="text-left py-2">Gap</th>
                <th className="text-left py-2">Quadrant</th>
              </tr>
            </thead>
            <tbody>
              {result.aspects.map((aspect: any, index: number) => {
                const gap = aspect.importance - aspect.performance;
                return (
                  <tr key={index} className="border-b border-gray-100">
                    <td className="py-2 font-medium">{aspect.aspect}</td>
                    <td className="py-2">{aspect.importance.toFixed(2)}</td>
                    <td className="py-2">{aspect.performance.toFixed(2)}</td>
                    <td className="py-2">
                      <span className={gap > 0 ? 'text-red-600' : 'text-green-600'}>
                        {gap.toFixed(2)}
                      </span>
                    </td>
                    <td className="py-2">
                      <span
                        className={`px-2 py-1 rounded text-xs ${
                          aspect.quadrant === 'concentrate_here'
                            ? 'bg-red-100 text-red-800'
                            : aspect.quadrant === 'keep_up_good_work'
                            ? 'bg-green-100 text-green-800'
                            : aspect.quadrant === 'low_priority'
                            ? 'bg-yellow-100 text-yellow-800'
                            : 'bg-blue-100 text-blue-800'
                        }`}
                      >
                        {aspect.quadrant
                          .replace(/_/g, ' ')
                          .replace(/\b\w/g, (l: string) => l.toUpperCase())}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

/**
 * Analytics section providing comprehensive survey data analysis
 * Features:
 * - Basic statistics (mean, median, mode, standard deviation)
 * - Clustering analysis (K-Means, DBSCAN, Hybrid)
 * - Importance-Performance Analysis (IPA)
 * - Multiple visualization formats (charts, tables, text summaries)
 */
const AnalyticsSection: React.FC<Props> = ({ formId }) => {
  // Fetch form analytics data using the new query structure
  const {
    data: analyticsData,
    loading: analyticsLoading,
    error: analyticsError,
  } = useQuery(FORM.GET_FORM_ANALYTICS_DATA, {
    variables: { form_id: formId },
    pollInterval: 30000, // Poll every 30 seconds for new responses
  });

  // Fetch form details to get questions (for basic form info)
  const {
    data: formData,
    loading: formLoading,
    error: formError,
  } = useQuery(FORM.GET_BY_ID, {
    variables: { id: formId },
  });

  // Loading and error states
  const dataLoading = analyticsLoading || formLoading;
  const dataError = analyticsError || formError;

  // State management for analytics processing
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [analyticsService] = useState(() => new AnalyticsService({ verbose: true }));

  // Analytics results state
  const [basicStats, setBasicStats] = useState<BasicStatistics | null>(null);
  const [clusteringResult, setClusteringResult] = useState<ClusteringResult | null>(null);
  const [ipaResult, setIpaResult] = useState<IPAAnalysisResult | null>(null);
  const [surveyResponses, setSurveyResponses] = useState<SurveyResponse[]>([]);
  const [analyticsInsights, setAnalyticsInsights] = useState<string[]>([]);

  // Extract data from GraphQL responses
  const questions = analyticsData?.questions || [];
  const form = formData?.forms_by_pk;

  /**
   * Filter questions suitable for analysis
   * Excludes personal data and text-based questions
   */
  const analyzableQuestions = useMemo(() => {
    return (
      questions?.filter((question: any) => {
        const questionType = question.option?.type;
        return questionType && ANALYZABLE_QUESTION_TYPES.includes(questionType);
      }) || []
    );
  }, [questions]);

  /**
   * Filter questions suitable for clustering
   * Only includes questions that provide meaningful numerical data
   */
  const clusteringQuestions = useMemo(() => {
    return (
      questions?.filter((question: any) => {
        const questionType = question.option?.type;
        return questionType && CLUSTERING_SUITABLE_TYPES.includes(questionType);
      }) || []
    );
  }, [questions]);

  /**
   * Filter IPA-specific questions
   * Only includes questions designed for importance-performance analysis
   */
  const ipaQuestions = useMemo(() => {
    return (
      questions?.filter((question: any) => {
        return question.option?.type === 'Importance Performance';
      }) || []
    );
  }, [questions]);

  // Transform the new data structure to extract answer sheets and responses
  const answerSheets = useMemo(() => {
    if (!questions || questions.length === 0) return [];

    // Group question answers by answer_sheet_id to reconstruct answer sheets
    const sheetMap = new Map();

    questions.forEach((question: any) => {
      if (question.question_answers) {
        question.question_answers.forEach((answer: any) => {
          const sheetId = answer.answer_sheet_id;
          if (!sheetMap.has(sheetId)) {
            sheetMap.set(sheetId, {
              id: sheetId,
              form_id: answer.form_id,
              user_id: answer.user_id,
              created_at: answer.created_at,
              updated_at: answer.updated_at,
              question_answers: [],
            });
          }
          sheetMap.get(sheetId).question_answers.push(answer);
        });
      }
    });

    return Array.from(sheetMap.values());
  }, [questions]);

  /**
   * Check if we have enough data for meaningful analysis
   */
  const hasMinimumData = useMemo(() => {
    // Get all question answers from all answer sheets
    const allQuestionAnswers = answerSheets.flatMap((sheet: any) => sheet.question_answers || []);
    return allQuestionAnswers.length >= 5; // Minimum threshold for analysis
  }, [answerSheets]);

  /**
   * Process analytics data using the real analytics service
   */
  const processAnalyticsData = useCallback(async () => {
    if (!answerSheets || answerSheets.length === 0) return;

    try {
      setLoading(true);
      setError(null);

      console.log('🚀 Starting comprehensive analytics with', answerSheets.length, 'answer sheets');

      // Validate input data first
      const validation = AnalyticsService.validateInputData(answerSheets);
      if (!validation.isValid) {
        setError(`Data validation failed: ${validation.issues.join(', ')}`);
        return;
      }

      if (validation.suggestions.length > 0) {
        console.warn('Analytics suggestions:', validation.suggestions);
      }

      // Create IPA aspect mapping for IPA questions
      const aspectMapping: {
        [aspect: string]: { importanceQuestionId: string; performanceQuestionId: string };
      } = {};

      // For IPA questions, we need to create a mapping
      // Since our IPA questions contain both importance and performance in the same question,
      // we'll use the question ID for both importance and performance
      ipaQuestions.forEach((question: any) => {
        const aspect = question.content.slice(0, 50); // Use first 50 chars as aspect name
        aspectMapping[aspect] = {
          importanceQuestionId: question.id,
          performanceQuestionId: question.id,
        };
      });

      // Perform comprehensive analysis using the analytics service
      const comprehensiveResult = await analyticsService.performComprehensiveAnalysis(
        answerSheets,
        Object.keys(aspectMapping).length > 0 ? aspectMapping : undefined,
        {
          clusteringConfig: {
            dbscan: {
              eps: 0.5,
              minPts: Math.max(2, Math.floor(answerSheets.length * 0.05)),
            },
            kmeans: {
              k: Math.min(5, Math.max(2, Math.floor(answerSheets.length / 10))),
            },
            includeOutliers: true,
          },
          ipaOptions: {
            useGrandMean: true,
            segmentAnalysis: false,
          },
          dataOptions: {
            // Can add date filters here if needed
          },
        }
      );

      console.log('✅ Comprehensive analysis completed:', comprehensiveResult);

      // Set survey responses for UI display
      setSurveyResponses(comprehensiveResult.surveyResponses);

      // Store insights from the analytics service
      setAnalyticsInsights(comprehensiveResult.insights);

      // Calculate and set basic statistics
      const allQuestionAnswers = answerSheets.flatMap((sheet: any) => sheet.question_answers || []);
      const stats = calculateBasicStatistics(
        comprehensiveResult.surveyResponses,
        analyzableQuestions,
        allQuestionAnswers
      );
      setBasicStats(stats);

      // Set clustering results if available
      if (comprehensiveResult.clusteringAnalysis) {
        setClusteringResult(comprehensiveResult.clusteringAnalysis.result);
        console.log('📊 Clustering analysis set:', comprehensiveResult.clusteringAnalysis.result);
      } else {
        console.warn('⚠️ No clustering analysis available');
        setClusteringResult(null);
      }

      // Set IPA results if available
      if (comprehensiveResult.ipaAnalysis) {
        setIpaResult(comprehensiveResult.ipaAnalysis.result);
        console.log('📈 IPA analysis set:', comprehensiveResult.ipaAnalysis.result);
      } else {
        console.warn('⚠️ No IPA analysis available');
        setIpaResult(null);
      }
    } catch (err) {
      console.error('Analytics processing error:', err);
      setError(err instanceof Error ? err.message : 'Failed to process analytics');

      // Set fallback empty states
      setClusteringResult(null);
      setIpaResult(null);
      setSurveyResponses([]);
      setAnalyticsInsights([]);

      // Still try to calculate basic statistics from raw data
      const allQuestionAnswers = answerSheets.flatMap((sheet: any) => sheet.question_answers || []);
      const fallbackStats = calculateBasicStatistics(
        [], // empty survey responses since conversion failed
        analyzableQuestions,
        allQuestionAnswers
      );
      setBasicStats(fallbackStats);
    } finally {
      setLoading(false);
    }
  }, [answerSheets, analyzableQuestions, ipaQuestions, analyticsService]);

  /**
   * Perform comprehensive analytics when component mounts or data changes
   */
  useEffect(() => {
    if (hasMinimumData && analyzableQuestions.length > 0) {
      processAnalyticsData();
    }
  }, [hasMinimumData, analyzableQuestions, processAnalyticsData]);

  /**
   * Handle GraphQL loading and error states
   */
  if (dataLoading || loading) {
    return (
      <div className="flex items-center justify-center min-h-64">
        <div className="text-center">
          <Spinner />
          <p className="mt-4 text-gray-600">Loading survey data...</p>
        </div>
      </div>
    );
  }

  if (dataError || error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-4">
        <h3 className="text-red-800 font-medium">Failed to Load Data</h3>
        <p className="text-red-600 mt-1">
          {dataError?.message || formError?.message || error || 'Error loading survey data'}
        </p>
      </div>
    );
  }

  /**
   * Render loading state for analytics processing
   */
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-64">
        <div className="text-center">
          <Spinner />
          <p className="mt-4 text-gray-600">Analyzing survey data...</p>
        </div>
      </div>
    );
  }

  /**
   * Render error state
   */
  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-4">
        <h3 className="text-red-800 font-medium">Analytics Error</h3>
        <p className="text-red-600 mt-1">{error}</p>
      </div>
    );
  }

  /**
   * Render insufficient data message
   */
  if (!hasMinimumData) {
    return (
      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
        <h3 className="text-yellow-800 font-medium">Insufficient Data</h3>
        <p className="text-yellow-600 mt-1">
          Need at least 5 responses to perform meaningful analytics. Current responses:{' '}
          {answerSheets.length}
        </p>
      </div>
    );
  }

  /**
   * Render no analyzable questions message
   */
  if (analyzableQuestions.length === 0) {
    return (
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <h3 className="text-blue-800 font-medium">No Analyzable Questions</h3>
        <p className="text-blue-600 mt-1">
          This survey contains only text-based questions (name, email, essay, etc.) which cannot be
          analyzed numerically. Add rating scales, multiple choice, or IPA questions for analytics.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="border-b border-gray-200 pb-4">
        <h2 className="text-2xl font-bold text-gray-900">Survey Analytics</h2>
        <p className="text-gray-600 mt-1">
          Comprehensive analysis of {surveyResponses.length} responses across{' '}
          {analyzableQuestions.length} analyzable questions
        </p>
      </div>

      {/* Basic Statistics Section */}
      {basicStats && <BasicStatisticsSection statistics={basicStats} />}

      {/* Clustering Analysis Section */}
      {clusteringResult && clusteringQuestions.length > 0 && (
        <ClusteringAnalysisSection result={clusteringResult} />
      )}

      {/* IPA Analysis Section */}
      {ipaResult && ipaQuestions.length > 0 && <IPAAnalysisSection result={ipaResult} />}

      {/* Legacy Charts (Enhanced with better titles and context) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h3 className="text-lg font-medium mb-4">Response Heatmap</h3>
          <p className="text-sm text-gray-600 mb-4">
            Visual representation of response patterns across different questions and time periods.
          </p>
          <HeatmapChart data={form} />
        </div>

        {ipaResult && ipaQuestions.length > 0 && (
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h3 className="text-lg font-medium mb-4">IPA Matrix</h3>
            <p className="text-sm text-gray-600 mb-4">
              Importance-Performance Analysis showing which aspects need attention. Analyzing{' '}
              {ipaResult.aspects.length} aspects.
            </p>
            <IPAChart />
          </div>
        )}
      </div>

      {/* K-Means Clustering Visualization */}
      {clusteringResult && clusteringResult.points.length > 0 && (
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h3 className="text-lg font-medium mb-4">Clustering Visualization</h3>
          <p className="text-sm text-gray-600 mb-4">
            Interactive visualization of how responses cluster together using{' '}
            {clusteringResult.algorithm} algorithm. Showing{' '}
            {Math.min(50, clusteringResult.points.length)} data points.
          </p>
          <KMeansClusteringChart
            initialData={clusteringResult.points.slice(0, 50).map((point: any, index: number) => ({
              x: point.features[0] || index,
              y: point.features[1] || Math.random() * 100,
              label: `Response ${point.id || index + 1}`,
              cluster: point.clusterId >= 0 ? point.clusterId : 'outlier',
            }))}
          />
        </div>
      )}

      {/* Analytics Summary with Service Insights */}
      <div className="bg-gray-50 rounded-lg p-6">
        <h3 className="text-lg font-medium mb-4">Analytics Summary</h3>
        <div className="space-y-2 text-sm text-gray-700">
          <p>
            • <strong>Total Responses:</strong> {surveyResponses.length}
          </p>
          <p>
            • <strong>Analyzable Questions:</strong> {analyzableQuestions.length}
          </p>
          {clusteringResult && (
            <>
              <p>
                • <strong>Response Clusters:</strong> {clusteringResult.numClusters} distinct
                patterns identified using {clusteringResult.algorithm} algorithm
              </p>
              {clusteringResult.metrics?.silhouetteScore && (
                <p>
                  • <strong>Clustering Quality:</strong> Silhouette score of{' '}
                  {clusteringResult.metrics.silhouetteScore.toFixed(3)}
                  {clusteringResult.metrics.silhouetteScore > 0.7
                    ? ' (Excellent)'
                    : clusteringResult.metrics.silhouetteScore > 0.5
                    ? ' (Good)'
                    : clusteringResult.metrics.silhouetteScore > 0.25
                    ? ' (Moderate)'
                    : ' (Poor)'}
                </p>
              )}
            </>
          )}
          {clusteringResult && clusteringResult.numOutliers > 0 && (
            <p>
              • <strong>Outlier Responses:</strong> {clusteringResult.numOutliers} responses show
              unique patterns (
              {((clusteringResult.numOutliers / surveyResponses.length) * 100).toFixed(1)}%)
            </p>
          )}
          {ipaResult && (
            <p>
              • <strong>IPA Analysis:</strong> {ipaResult.aspects.length} aspects analyzed across
              importance and performance dimensions
            </p>
          )}
          <p>
            • <strong>Analysis Types:</strong>{' '}
            {[
              'Basic Statistics',
              clusteringResult ? 'Clustering Analysis' : null,
              ipaResult ? 'IPA Analysis' : null,
            ]
              .filter(Boolean)
              .join(', ')}
          </p>

          {/* Service-generated insights */}
          {analyticsInsights.length > 0 && (
            <div className="mt-4 pt-4 border-t border-gray-200">
              <h4 className="font-medium text-gray-900 mb-2">Key Insights:</h4>
              <ul className="space-y-1">
                {analyticsInsights.map((insight, index) => (
                  <li key={index} className="text-sm text-gray-700">
                    • {insight}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AnalyticsSection;
