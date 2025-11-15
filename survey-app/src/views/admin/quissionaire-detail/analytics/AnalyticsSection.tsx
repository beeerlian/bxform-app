import { FORM } from '@/apollo/Operations';
import Spinner from '@/components/loading/Spinner';
import { useQuery } from '@apollo/client';
import React, { useEffect, useState } from 'react';

// Import existing charts
import { analyzePipeline } from '@/services/analytics/analytics';

interface Props {
  formId: string;
}

/**
 * Analytics section providing comprehensive survey data analysis
 * Features:
 * - Basic statistics (mean, median, mode, standard deviation)
 * - Clustering analysis (K-Means, DBSCAN, Hybrid)
 * - Importance-Performance Analysis (IPA)
 * - Multiple visualization formats (charts, tables, text summaries)
 */
const AnalyticsSection: React.FC<Props> = ({ formId }) => {
  // State for analytics results
  const [analyticsResults, setAnalyticsResults] = useState<{
    preprocess: any;
    kmeans: any;
    membersPerCluster: any;
    dbscanMap: any;
    ipa: any;
  } | null>(null);

  // Fetch form details to get questions (for basic form info)
  const {
    data: answerSheetsData,
    loading: answerSheetsLoading,
    error: answerSheetsError,
  } = useQuery(FORM.GET_FORM_RESPONSES, {
    variables: { form_id: formId },
  });

  // Execute analyzePipeline hooks when answerSheetsData is successfully loaded
  useEffect(() => {
    if (answerSheetsData?.answer_sheets && !answerSheetsLoading && !answerSheetsError) {
      console.log('Executing analyzePipeline with loaded data...');
      
      try {
        const results = analyzePipeline({
          answerSheets: answerSheetsData.answer_sheets,
          k: 3,
          dbscan: { eps: 0.06, minPts: 4 }
        });
        
        setAnalyticsResults(results);
        console.log('Analytics pipeline executed successfully:');
        console.dir(results);
      } catch (error) {
        console.error('Error executing analytics pipeline:', error);
      }
    }
  }, [answerSheetsData, answerSheetsLoading, answerSheetsError]);




  
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="border-b border-gray-200 pb-4">
        <h2 className="text-2xl font-bold text-gray-900">Survey Analytics</h2>
        <p className="text-gray-600 mt-1">
          Comprehensive analysis of survey responses
        </p>
      </div>

      {/* Loading State */}
      {answerSheetsLoading && (
        <div className="flex justify-center py-12">
          <Spinner />
        </div>
      )}

      {/* Error State */}
      {answerSheetsError && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-6">
          <h3 className="text-lg font-medium text-red-800 mb-2">Error Loading Data</h3>
          <p className="text-red-600">{answerSheetsError.message}</p>
        </div>
      )}

      {/* Analytics Results */}
      {analyticsResults && answerSheetsData?.answer_sheets && (
        <div className="space-y-8">
          {/* Basic Statistics */}
          {answerSheetsData.answer_sheets.length > 0 && (
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <h3 className="text-lg font-medium mb-4">Analytics Overview</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-blue-50 p-4 rounded-lg">
                  <p className="text-sm text-blue-600 font-medium">Total Responses</p>
                  <p className="text-2xl font-bold text-blue-900">
                    {answerSheetsData.answer_sheets.length}
                  </p>
                </div>
                <div className="bg-green-50 p-4 rounded-lg">
                  <p className="text-sm text-green-600 font-medium">Preprocessing Complete</p>
                  <p className="text-2xl font-bold text-green-900">
                    {analyticsResults.preprocess ? '✓' : '✗'}
                  </p>
                </div>
                <div className="bg-purple-50 p-4 rounded-lg">
                  <p className="text-sm text-purple-600 font-medium">Analysis Ready</p>
                  <p className="text-2xl font-bold text-purple-900">
                    {analyticsResults.kmeans ? '✓' : '✗'}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Clustering Analysis Results */}
          {analyticsResults.kmeans && (
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <h3 className="text-lg font-medium mb-4">K-Means Clustering Analysis</h3>
              <p className="text-gray-600 mb-4">
                Analysis has been processed with K-Means clustering algorithm.
              </p>
              {/* Add more detailed visualization here based on your kmeans result structure */}
            </div>
          )}

          {/* DBSCAN Analysis Results */}
          {analyticsResults.dbscanMap && (
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <h3 className="text-lg font-medium mb-4">DBSCAN Clustering Analysis</h3>
              <p className="text-gray-600 mb-4">
                DBSCAN clustering analysis has been completed.
              </p>
              {/* Add more detailed visualization here based on your dbscan result structure */}
            </div>
          )}

          {/* IPA Analysis Results */}
          {analyticsResults.ipa && (
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <h3 className="text-lg font-medium mb-4">Importance-Performance Analysis</h3>
              <p className="text-gray-600 mb-4">
                IPA analysis has been processed for performance insights.
              </p>
              {/* Add more detailed visualization here based on your ipa result structure */}
            </div>
          )}
        </div>
      )}

      {/* No Data State */}
      {!answerSheetsLoading && 
       !answerSheetsError && 
       answerSheetsData?.answer_sheets && 
       answerSheetsData.answer_sheets.length === 0 && (
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-12 text-center">
          <h3 className="text-lg font-medium text-gray-900 mb-2">No Response Data</h3>
          <p className="text-gray-600">
            There are no survey responses available for analysis yet.
          </p>
        </div>
      )}
    </div>
  );
};

export default AnalyticsSection;









