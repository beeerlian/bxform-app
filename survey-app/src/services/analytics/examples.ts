/**
 * Example usage of the Analytics Service
 * This file demonstrates how to use the analytics service in different scenarios
 */

import { Answer_Sheets } from '../../__generated__/graphql';
import { AnalyticsService } from './index';

/**
 * Example 1: Basic Clustering Analysis
 */
async function basicClusteringExample(answerSheets: Answer_Sheets[]) {
  console.log('🎯 Example 1: Basic Clustering Analysis');

  // Initialize analytics service
  const analytics = new AnalyticsService({
    normalizeFeatures: true,
    verbose: true,
    defaultClustering: 'hybrid',
  });

  try {
    // Convert survey data
    const responses = analytics.convertSurveyData(answerSheets, {
      startDate: '2024-01-01',
      endDate: '2024-12-31',
    });

    console.log(`📊 Converted ${responses.length} survey responses`);

    // Perform clustering analysis
    const clusteringResult = await analytics.performClusteringAnalysis(responses, {
      dbscan: { eps: 0.5, minPts: 3 },
      kmeans: { k: 4 },
      includeOutliers: false,
    });

    // Display results
    console.log('📈 Clustering Results:');
    console.log(`- Clusters found: ${clusteringResult.result.numClusters}`);
    console.log(`- Outliers detected: ${clusteringResult.result.numOutliers}`);
    console.log(
      `- Silhouette score: ${clusteringResult.result.metrics?.silhouetteScore?.toFixed(3)}`
    );
    console.log(
      `- Quality: ${
        clusteringResult.result.metrics?.silhouetteScore! > 0.5 ? 'Good' : 'Needs improvement'
      }`
    );

    // Show recommendations
    console.log('💡 Recommendations:');
    clusteringResult.recommendations.forEach((rec) => console.log(`- ${rec}`));

    // Analyze clusters
    console.log('🔍 Cluster Details:');
    clusteringResult.clusterInfo.clusters.forEach((cluster: any) => {
      console.log(`- Cluster ${cluster.id}: ${cluster.size} respondents`);
    });

    return clusteringResult;
  } catch (error) {
    console.error('❌ Clustering analysis failed:', error);
    throw error;
  }
}

/**
 * Example 2: IPA Analysis
 */
async function ipaAnalysisExample(answerSheets: Answer_Sheets[]) {
  console.log('📈 Example 2: IPA Analysis');

  const analytics = new AnalyticsService({ verbose: true });

  // Define aspect mapping for university evaluation
  const aspectMapping = {
    academic_programs: {
      importanceQuestionId: 'academic_importance_q1',
      performanceQuestionId: 'academic_performance_q1',
    },
    research_facilities: {
      importanceQuestionId: 'research_importance_q2',
      performanceQuestionId: 'research_performance_q2',
    },
    student_services: {
      importanceQuestionId: 'services_importance_q3',
      performanceQuestionId: 'services_performance_q3',
    },
    campus_facilities: {
      importanceQuestionId: 'campus_importance_q4',
      performanceQuestionId: 'campus_performance_q4',
    },
    faculty_quality: {
      importanceQuestionId: 'faculty_importance_q5',
      performanceQuestionId: 'faculty_performance_q5',
    },
    technology_resources: {
      importanceQuestionId: 'tech_importance_q6',
      performanceQuestionId: 'tech_performance_q6',
    },
  };

  try {
    const responses = analytics.convertSurveyData(answerSheets);

    const ipaResult = await analytics.performIPAAnalysis(responses, aspectMapping, {
      useGrandMean: true,
      segmentAnalysis: true,
    });

    // Display IPA results
    console.log('📊 IPA Analysis Results:');
    console.log(`- Aspects analyzed: ${ipaResult.result.aspects.length}`);
    console.log(`- Total responses: ${ipaResult.result.overall.totalResponses}`);
    console.log(`- Average importance: ${ipaResult.result.overall.avgImportance.toFixed(2)}`);
    console.log(`- Average performance: ${ipaResult.result.overall.avgPerformance.toFixed(2)}`);

    // Show quadrant analysis
    console.log('🎯 Quadrant Analysis:');
    console.log(`- Keep Up Good Work: ${ipaResult.recommendations.keepUpGoodWork.length} aspects`);
    console.log(`- Concentrate Here: ${ipaResult.recommendations.concentrateHere.length} aspects`);
    console.log(`- Low Priority: ${ipaResult.recommendations.lowPriority.length} aspects`);
    console.log(
      `- Possible Overkill: ${ipaResult.recommendations.possibleOverkill.length} aspects`
    );

    // Priority recommendations
    console.log('🚨 Priority Actions:');
    ipaResult.recommendations.actionItems.forEach((action: string) => {
      console.log(`- ${action}`);
    });

    // Gap analysis
    console.log('📉 Gap Analysis (Top 3 deficits):');
    ipaResult.gapAnalysis.slice(0, 3).forEach((gap: any) => {
      console.log(
        `- ${gap.aspect}: ${gap.gap > 0 ? 'surplus' : 'deficit'} of ${Math.abs(gap.gap).toFixed(2)}`
      );
    });

    return ipaResult;
  } catch (error) {
    console.error('❌ IPA analysis failed:', error);
    throw error;
  }
}

/**
 * Example 3: Comprehensive Analysis
 */
async function comprehensiveAnalysisExample(answerSheets: Answer_Sheets[]) {
  console.log('🚀 Example 3: Comprehensive Analysis');

  const analytics = new AnalyticsService({
    normalizeFeatures: true,
    verbose: true,
    defaultClustering: 'hybrid',
  });

  // University satisfaction aspects
  const aspectMapping = {
    teaching_quality: {
      importanceQuestionId: 'teaching_imp',
      performanceQuestionId: 'teaching_perf',
    },
    research_opportunities: {
      importanceQuestionId: 'research_imp',
      performanceQuestionId: 'research_perf',
    },
    campus_life: {
      importanceQuestionId: 'campus_imp',
      performanceQuestionId: 'campus_perf',
    },
    career_services: {
      importanceQuestionId: 'career_imp',
      performanceQuestionId: 'career_perf',
    },
  };

  try {
    const result = await analytics.performComprehensiveAnalysis(answerSheets, aspectMapping, {
      clusteringConfig: {
        dbscan: { eps: 0.4, minPts: 3 },
        kmeans: { k: 5 },
        includeOutliers: false,
      },
      ipaOptions: { useGrandMean: true, segmentAnalysis: true },
      dataOptions: {
        startDate: '2024-01-01',
        filterSegment: 'undergraduate',
      },
    });

    // Display comprehensive results
    console.log('📊 Comprehensive Analysis Results:');
    console.log(`- Survey responses: ${result.surveyResponses.length}`);
    console.log(`- Analysis date: ${result.metadata.analysisDate}`);

    // Clustering insights
    if (result.clusteringAnalysis) {
      console.log('\n🎯 Clustering Insights:');
      console.log(`- Response patterns: ${result.clusteringAnalysis.result.numClusters}`);
      console.log(`- Outlier responses: ${result.clusteringAnalysis.result.numOutliers}`);
      console.log(
        `- Quality score: ${result.clusteringAnalysis.result.metrics?.silhouetteScore?.toFixed(3)}`
      );
    }

    // IPA insights
    if (result.ipaAnalysis) {
      console.log('\n📈 IPA Insights:');
      console.log(`- Aspects analyzed: ${result.ipaAnalysis.result.aspects.length}`);
      console.log(`- Priority areas: ${result.ipaAnalysis.recommendations.concentrateHere.length}`);
      console.log(`- Performing well: ${result.ipaAnalysis.recommendations.keepUpGoodWork.length}`);
    }

    // Key insights
    console.log('\n💡 Key Insights:');
    result.insights.forEach((insight) => console.log(`- ${insight}`));

    // Segment distribution
    console.log('\n📊 Segment Distribution:');
    Object.entries(result.metadata.segmentDistribution).forEach(([segment, count]) => {
      console.log(`- ${segment}: ${count} responses`);
    });

    return result;
  } catch (error) {
    console.error('❌ Comprehensive analysis failed:', error);
    throw error;
  }
}

/**
 * Example 4: Advanced Configuration and Validation
 */
async function advancedConfigurationExample(answerSheets: Answer_Sheets[]) {
  console.log('⚙️ Example 4: Advanced Configuration');

  // Validate input data first
  const validation = AnalyticsService.validateInputData(answerSheets);

  if (!validation.isValid) {
    console.error('❌ Data validation failed:');
    validation.issues.forEach((issue) => console.error(`- ${issue}`));
    return;
  }

  if (validation.suggestions.length > 0) {
    console.log('💡 Data suggestions:');
    validation.suggestions.forEach((suggestion) => console.log(`- ${suggestion}`));
  }

  const analytics = new AnalyticsService({
    normalizeFeatures: true,
    verbose: true,
    defaultClustering: 'hybrid',
  });

  try {
    const responses = analytics.convertSurveyData(answerSheets);

    // Test different clustering approaches
    console.log('🧪 Testing different clustering approaches...');

    // Hybrid clustering
    analytics.updateConfig({ defaultClustering: 'hybrid' });
    const hybridResult = await analytics.performClusteringAnalysis(responses);

    console.log(
      `Hybrid: ${
        hybridResult.result.numClusters
      } clusters, silhouette: ${hybridResult.result.metrics?.silhouetteScore?.toFixed(3)}`
    );

    // K-Means only
    analytics.updateConfig({ defaultClustering: 'kmeans' });
    const kmeansResult = await analytics.performClusteringAnalysis(responses);

    console.log(
      `K-Means: ${
        kmeansResult.result.numClusters
      } clusters, silhouette: ${kmeansResult.result.metrics?.silhouetteScore?.toFixed(3)}`
    );

    // DBSCAN only
    analytics.updateConfig({ defaultClustering: 'dbscan' });
    const dbscanResult = await analytics.performClusteringAnalysis(responses);

    console.log(
      `DBSCAN: ${
        dbscanResult.result.numClusters
      } clusters, silhouette: ${dbscanResult.result.metrics?.silhouetteScore?.toFixed(3)}`
    );

    // Compare results
    const results = [
      { name: 'Hybrid', result: hybridResult.result },
      { name: 'K-Means', result: kmeansResult.result },
      { name: 'DBSCAN', result: dbscanResult.result },
    ];

    const bestResult = results.reduce((best, current) =>
      (current.result.metrics?.silhouetteScore || 0) > (best.result.metrics?.silhouetteScore || 0)
        ? current
        : best
    );

    console.log(`🏆 Best performing approach: ${bestResult.name}`);

    return bestResult;
  } catch (error) {
    console.error('❌ Advanced configuration example failed:', error);
    throw error;
  }
}

/**
 * Example 5: Temporal Analysis (Comparing Time Periods)
 */
async function temporalAnalysisExample(
  currentPeriodData: Answer_Sheets[],
  previousPeriodData: Answer_Sheets[]
) {
  console.log('📅 Example 5: Temporal Analysis');

  const analytics = new AnalyticsService({ verbose: true });

  const aspectMapping = {
    overall_satisfaction: {
      importanceQuestionId: 'overall_imp',
      performanceQuestionId: 'overall_perf',
    },
    service_quality: {
      importanceQuestionId: 'service_imp',
      performanceQuestionId: 'service_perf',
    },
  };

  try {
    // Analyze current period
    const currentResponses = analytics.convertSurveyData(currentPeriodData);
    const currentIPA = await analytics.performIPAAnalysis(currentResponses, aspectMapping);

    // Analyze previous period
    const previousResponses = analytics.convertSurveyData(previousPeriodData);
    const previousIPA = await analytics.performIPAAnalysis(previousResponses, aspectMapping);

    // Compare analyses
    const comparison = IPAAnalytics.compareAnalyses(previousIPA.result, currentIPA.result);

    console.log('📊 Temporal Comparison Results:');
    comparison.forEach((comp) => {
      const impChange = comp.importanceChange > 0 ? '↑' : comp.importanceChange < 0 ? '↓' : '→';
      const perfChange = comp.performanceChange > 0 ? '↑' : comp.performanceChange < 0 ? '↓' : '→';

      console.log(`${comp.aspect}:`);
      console.log(
        `  Importance: ${comp.baselineImportance.toFixed(2)} → ${comp.comparisonImportance.toFixed(
          2
        )} ${impChange}`
      );
      console.log(
        `  Performance: ${comp.baselinePerformance.toFixed(
          2
        )} → ${comp.comparisonPerformance.toFixed(2)} ${perfChange}`
      );
      console.log(`  Quadrant changed: ${comp.quadrantChange ? 'Yes' : 'No'}`);
    });

    return comparison;
  } catch (error) {
    console.error('❌ Temporal analysis failed:', error);
    throw error;
  }
}

/**
 * Example 6: Segment-based Analysis
 */
async function segmentAnalysisExample(answerSheets: Answer_Sheets[]) {
  console.log('🎭 Example 6: Segment-based Analysis');

  const analytics = new AnalyticsService({ verbose: true });

  try {
    const responses = analytics.convertSurveyData(answerSheets);

    // Group responses by segment
    const segmentGroups = SurveyDataConverter.groupBySegment(responses);

    console.log('📊 Segment Distribution:');
    segmentGroups.forEach((segmentResponses, segment) => {
      console.log(`- ${segment}: ${segmentResponses.length} responses`);
    });

    // Analyze each segment separately
    for (const [segment, segmentResponses] of segmentGroups) {
      if (segmentResponses.length < 10) continue; // Skip small segments

      console.log(`\n🔍 Analyzing segment: ${segment}`);

      const clusteringResult = await analytics.performClusteringAnalysis(segmentResponses);

      console.log(`- Clusters: ${clusteringResult.result.numClusters}`);
      console.log(`- Quality: ${clusteringResult.result.metrics?.silhouetteScore?.toFixed(3)}`);
      console.log(`- Outliers: ${clusteringResult.result.numOutliers}`);
    }

    return segmentGroups;
  } catch (error) {
    console.error('❌ Segment analysis failed:', error);
    throw error;
  }
}

// Import and export necessary dependencies
import { SurveyDataConverter } from './converter';
import { IPAAnalytics } from './ipa';

// Export all examples for use in other parts of the application
export {
  advancedConfigurationExample,
  basicClusteringExample,
  comprehensiveAnalysisExample,
  ipaAnalysisExample,
  segmentAnalysisExample,
  temporalAnalysisExample,
};
