/**
 * Basic test file for analytics service functionality
 * Run this to validate that all analytics components are working correctly
 */

import { SurveyDataConverter } from './converter';
import { DBSCANAnalytics } from './dbscan';
import { HybridClusteringAnalytics } from './hybrid';
import { AnalyticsService } from './index';
import { IPAAnalytics } from './ipa';
import { KMeansAnalytics } from './kmeans';
import { DataPoint, IPADataPoint, SurveyResponse } from './types';

/**
 * Generate mock survey data for testing
 */
function generateMockSurveyData(): SurveyResponse[] {
  const responses: SurveyResponse[] = [];

  for (let i = 0; i < 50; i++) {
    responses.push({
      answer_sheet_id: `sheet_${i}`,
      user_id: `user_${i}`,
      user_name: `User ${i}`,
      user_email: `user${i}@example.com`,
      created_at: new Date(2024, 0, 1 + i).toISOString(),
      question_answers: [
        {
          question_id: 'q1',
          answer: Math.random() * 5 + 1, // Random score 1-6
          question: {
            content: 'Teaching Quality',
            type: 'rating',
            segment: 'academic',
            weight: 1,
          },
        },
        {
          question_id: 'q2',
          answer: Math.random() * 5 + 1,
          question: {
            content: 'Research Facilities',
            type: 'rating',
            segment: 'research',
            weight: 1,
          },
        },
        {
          question_id: 'q3',
          answer: Math.random() * 5 + 1,
          question: {
            content: 'Student Services',
            type: 'rating',
            segment: 'service',
            weight: 1,
          },
        },
        {
          question_id: 'q4_importance',
          answer: Math.random() * 5 + 1,
          question: {
            content: 'Campus Life Importance',
            type: 'rating',
            segment: 'campus',
            weight: 1,
          },
        },
        {
          question_id: 'q4_performance',
          answer: Math.random() * 5 + 1,
          question: {
            content: 'Campus Life Performance',
            type: 'rating',
            segment: 'campus',
            weight: 1,
          },
        },
      ],
    });
  }

  return responses;
}

/**
 * Generate mock data points for clustering
 */
function generateMockDataPoints(): DataPoint[] {
  const points: DataPoint[] = [];

  for (let i = 0; i < 30; i++) {
    points.push({
      id: `point_${i}`,
      features: [Math.random() * 10, Math.random() * 10, Math.random() * 10],
      metadata: { index: i },
    });
  }

  return points;
}

/**
 * Generate mock IPA data points
 */
function generateMockIPADataPoints(): IPADataPoint[] {
  const points: IPADataPoint[] = [];
  const aspects = ['teaching', 'research', 'services', 'facilities'];

  for (const aspect of aspects) {
    for (let i = 0; i < 20; i++) {
      const importance = Math.random() * 5 + 1;
      const performance = Math.random() * 5 + 1;

      points.push({
        id: `${aspect}_${i}`,
        features: [importance, performance],
        importance,
        performance,
        aspect,
        segment: 'university',
        metadata: { respondent: i },
      });
    }
  }

  return points;
}

/**
 * Test data converter functionality
 */
async function testDataConverter(): Promise<boolean> {
  console.log('🧪 Testing Data Converter...');

  try {
    const mockResponses = generateMockSurveyData();

    // Test conversion to data points
    const dataPoints = SurveyDataConverter.convertToDataPoints(mockResponses);
    console.log(
      `✅ Converted ${mockResponses.length} responses to ${dataPoints.length} data points`
    );

    // Test normalization
    const normalizedPoints = SurveyDataConverter.normalizeFeatures(dataPoints);
    console.log(`✅ Normalized ${normalizedPoints.length} data points`);

    // Test filtering
    const filtered = SurveyDataConverter.filterByDateRange(
      mockResponses,
      '2024-01-10',
      '2024-01-20'
    );
    console.log(`✅ Filtered to ${filtered.length} responses in date range`);

    // Test grouping by segment
    const segmentGroups = SurveyDataConverter.groupBySegment(mockResponses);
    console.log(`✅ Grouped responses into ${segmentGroups.size} segments`);

    return true;
  } catch (error) {
    console.error('❌ Data converter test failed:', error);
    return false;
  }
}

/**
 * Test K-Means clustering
 */
async function testKMeans(): Promise<boolean> {
  console.log('🧪 Testing K-Means Clustering...');

  try {
    const dataPoints = generateMockDataPoints();

    const kmeans = new KMeansAnalytics({ k: 3 });
    const result = kmeans.cluster(dataPoints);

    console.log(`✅ K-Means found ${result.numClusters} clusters`);
    console.log(`✅ Silhouette score: ${result.metrics?.silhouetteScore?.toFixed(3)}`);

    // Test optimal k finding
    const optimalK = KMeansAnalytics.findOptimalK(dataPoints, 8);
    console.log(`✅ Optimal k suggested: ${optimalK}`);

    return true;
  } catch (error) {
    console.error('❌ K-Means test failed:', error);
    return false;
  }
}

/**
 * Test DBSCAN clustering
 */
async function testDBSCAN(): Promise<boolean> {
  console.log('🧪 Testing DBSCAN Clustering...');

  try {
    const dataPoints = generateMockDataPoints();

    const dbscan = new DBSCANAnalytics({ eps: 2.0, minPts: 3 });
    const result = dbscan.cluster(dataPoints);

    console.log(`✅ DBSCAN found ${result.numClusters} clusters`);
    console.log(`✅ Outliers detected: ${result.numOutliers}`);
    console.log(`✅ Noise ratio: ${(result.metrics?.noiseRatio! * 100).toFixed(1)}%`);

    // Test parameter suggestion
    const suggestedConfig = DBSCANAnalytics.suggestConfig(dataPoints);
    console.log(
      `✅ Suggested eps: ${suggestedConfig.eps.toFixed(3)}, minPts: ${suggestedConfig.minPts}`
    );

    return true;
  } catch (error) {
    console.error('❌ DBSCAN test failed:', error);
    return false;
  }
}

/**
 * Test hybrid clustering
 */
async function testHybridClustering(): Promise<boolean> {
  console.log('🧪 Testing Hybrid Clustering...');

  try {
    const dataPoints = generateMockDataPoints();

    const hybridAnalytics = new HybridClusteringAnalytics({
      dbscan: { eps: 1.5, minPts: 2 },
      kmeans: { k: 3 },
      includeOutliers: false,
    });

    const result = hybridAnalytics.cluster(dataPoints);

    console.log(`✅ Hybrid clustering found ${result.numClusters} clusters`);
    console.log(`✅ Outliers removed: ${result.numOutliers}`);
    console.log(`✅ Final silhouette score: ${result.metrics?.silhouetteScore?.toFixed(3)}`);

    // Test stability analysis
    const stability = hybridAnalytics.analyzeStability(dataPoints, 3);
    console.log(`✅ Stability score: ${stability.stabilityScore.toFixed(3)}`);

    return true;
  } catch (error) {
    console.error('❌ Hybrid clustering test failed:', error);
    return false;
  }
}

/**
 * Test IPA analysis
 */
async function testIPAAnalysis(): Promise<boolean> {
  console.log('🧪 Testing IPA Analysis...');

  try {
    const ipaDataPoints = generateMockIPADataPoints();

    const result = IPAAnalytics.performAnalysis(ipaDataPoints, true);

    console.log(`✅ IPA analyzed ${result.aspects.length} aspects`);
    console.log(`✅ Overall importance: ${result.overall.avgImportance.toFixed(2)}`);
    console.log(`✅ Overall performance: ${result.overall.avgPerformance.toFixed(2)}`);

    // Test recommendations
    const recommendations = IPAAnalytics.getPriorityRecommendations(result);
    console.log(`✅ Priority recommendations: ${recommendations.actionItems.length} items`);

    // Test gap analysis
    const gapAnalysis = IPAAnalytics.calculateGapAnalysis(result);
    console.log(`✅ Gap analysis: ${gapAnalysis.length} aspects analyzed`);

    // Test chart data generation
    const chartData = IPAAnalytics.generateChartData(result);
    console.log(`✅ Chart data generated for ${chartData.data.length} points`);

    return true;
  } catch (error) {
    console.error('❌ IPA analysis test failed:', error);
    return false;
  }
}

/**
 * Test main analytics service
 */
async function testAnalyticsService(): Promise<boolean> {
  console.log('🧪 Testing Main Analytics Service...');

  try {
    const analytics = new AnalyticsService({
      normalizeFeatures: true,
      verbose: false,
      defaultClustering: 'hybrid',
    });

    const mockResponses = generateMockSurveyData();

    // Test clustering analysis
    const clusteringResult = await analytics.performClusteringAnalysis(mockResponses);
    console.log(`✅ Service clustering: ${clusteringResult.result.numClusters} clusters`);

    // Test IPA analysis
    const aspectMapping = {
      campus_life: {
        importanceQuestionId: 'q4_importance',
        performanceQuestionId: 'q4_performance',
      },
    };

    const ipaResult = await analytics.performIPAAnalysis(mockResponses, aspectMapping);
    console.log(`✅ Service IPA: ${ipaResult.result.aspects.length} aspects`);

    // Test configuration update
    analytics.updateConfig({ verbose: true });
    const config = analytics.getConfig();
    console.log(`✅ Configuration updated: verbose = ${config.verbose}`);

    return true;
  } catch (error) {
    console.error('❌ Analytics service test failed:', error);
    return false;
  }
}

/**
 * Run all tests
 */
export async function runAllTests(): Promise<void> {
  console.log('🚀 Starting Analytics Service Tests...\n');

  const tests = [
    { name: 'Data Converter', test: testDataConverter },
    { name: 'K-Means', test: testKMeans },
    { name: 'DBSCAN', test: testDBSCAN },
    { name: 'Hybrid Clustering', test: testHybridClustering },
    { name: 'IPA Analysis', test: testIPAAnalysis },
    { name: 'Analytics Service', test: testAnalyticsService },
  ];

  const results: { name: string; passed: boolean }[] = [];

  for (const { name, test } of tests) {
    console.log(`\n📋 Running ${name} tests...`);
    const passed = await test();
    results.push({ name, passed });
    console.log(`${passed ? '✅' : '❌'} ${name} tests ${passed ? 'passed' : 'failed'}\n`);
  }

  // Summary
  console.log('📊 Test Results Summary:');
  console.log('========================');

  let totalPassed = 0;
  results.forEach(({ name, passed }) => {
    console.log(`${passed ? '✅' : '❌'} ${name}: ${passed ? 'PASSED' : 'FAILED'}`);
    if (passed) totalPassed++;
  });

  console.log(`\n🎯 Overall: ${totalPassed}/${results.length} tests passed`);

  if (totalPassed === results.length) {
    console.log('🎉 All analytics service tests passed! The service is ready to use.');
  } else {
    console.log('⚠️ Some tests failed. Please check the implementation.');
  }
}

/**
 * Quick validation function for integration
 */
export function validateAnalyticsService(): boolean {
  try {
    // Basic instantiation test
    const analytics = new AnalyticsService();
    const config = analytics.getConfig();

    console.log('✅ Analytics service instantiation successful');
    console.log(`✅ Default configuration: ${JSON.stringify(config)}`);

    return true;
  } catch (error) {
    console.error('❌ Analytics service validation failed:', error);
    return false;
  }
}

// Auto-run validation when file is imported
if (typeof window === 'undefined') {
  // Only run in Node.js environment (not in browser)
  validateAnalyticsService();
}
