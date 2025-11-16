import { FORM } from '@/apollo/Operations';
import Spinner from '@/components/loading/Spinner';
import { useQuery } from '@apollo/client';
import React, { useEffect, useState } from 'react';

// Import existing charts
import DBScanClusteringChart from '@/components/chart/DBScanClusteringChart';
import IPAChart from '@/components/chart/IPAChart';
import KMeansClusteringChart from '@/components/chart/KMeansClusteringChart';
import { analyzePipeline, DBSCANResult, IPAClusterResult, KMeansResult, PreprocessResult } from '@/services/analytics/analytics';
import { ClusterSummary } from '@/services/analytics/clusterNarratives';
import { Answer_Sheets } from '@/__generated__/graphql';

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
    preprocess: PreprocessResult | null;
    kmeans: KMeansResult | null;
    membersPerCluster: Map<number, Answer_Sheets[]> | null;
    dbscanMap: Map<number, DBSCANResult> | null;
    ipa: IPAClusterResult[] | null;
    summaries: ClusterSummary[] | null;
  } | null>(null);

  // State for selected cluster in DBSCAN visualization
  const [selectedCluster, setSelectedCluster] = useState<number>(0);

  // State for clustering parameters
  const [clusteringParams, setClusteringParams] = useState({
    k: 3,
    eps: 0.06,
    minPts: 4
  });
  const [isAnalyzing, setIsAnalyzing] = useState(false);

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
          k: clusteringParams.k,
          dbscan: { eps: clusteringParams.eps, minPts: clusteringParams.minPts }
        });

        setAnalyticsResults(results);
        console.log('Analytics pipeline executed successfully:');
      } catch (error) {
        console.error('Error executing analytics pipeline:', error);
      }
    }
  }, [answerSheetsData, answerSheetsLoading, answerSheetsError]);

  // Function to rerun analysis with new parameters
  const applyClusteringParams = async () => {
    if (!answerSheetsData?.answer_sheets) return;

    setIsAnalyzing(true);
    console.log('Rerunning analyzePipeline with new parameters:', clusteringParams);

    try {
      const results = analyzePipeline({
        answerSheets: answerSheetsData.answer_sheets,
        k: clusteringParams.k,
        dbscan: { eps: clusteringParams.eps, minPts: clusteringParams.minPts }
      }); setAnalyticsResults(results);
      console.log('Analytics pipeline rerun successfully with new parameters:');
    } catch (error) {
      console.error('Error rerunning analytics pipeline:', error);
    } finally {
      setIsAnalyzing(false);
    }
  };





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
          {analyticsResults.kmeans && analyticsResults.preprocess && (
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <h3 className="text-lg font-medium mb-4">K-Means Clustering Analysis</h3>
              <p className="text-gray-600 mb-6">
                Analysis has been processed with K-Means clustering algorithm using {analyticsResults.preprocess.featureMeta.length} features.
              </p>

              {/* K-Means Parameter Control */}
              <div className="mb-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
                <h4 className="font-medium text-gray-900 mb-3">K-Means Parameters</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-end">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Number of Clusters (K)
                    </label>
                    <input
                      type="number"
                      min="2"
                      max="10"
                      defaultValue={clusteringParams.k}
                      onChange={(e) => setClusteringParams(prev => ({ ...prev, k: parseInt(e.target.value) || 3 }))}
                      className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                    <p className="text-xs text-gray-500 mt-1">Number of clusters to create</p>
                  </div>
                  <div>
                    <button
                      onClick={applyClusteringParams}
                      disabled={isAnalyzing}
                      className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-medium py-2 px-4 rounded-md transition-colors duration-200 flex items-center justify-center"
                    >
                      {isAnalyzing ? (
                        <>
                          <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Analyzing...
                        </>
                      ) : (
                        'Apply Parameters'
                      )}
                    </button>
                  </div>
                </div>
              </div>

              {/* K-Means Chart */}
              <KMeansClusteringChart
                kmeansResult={analyticsResults.kmeans}
                preprocessResult={analyticsResults.preprocess}
              />

              {/* Additional clustering insights */}
              <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                <h4 className="font-medium text-gray-900 mb-2">Algorithm Details</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-gray-600">Features used:</span>
                    <span className="ml-2 font-medium">{analyticsResults.preprocess.featureMeta.length}</span>
                  </div>
                  <div>
                    <span className="text-gray-600">Data points:</span>
                    <span className="ml-2 font-medium">{analyticsResults.preprocess.X.length}</span>
                  </div>
                  <div>
                    <span className="text-gray-600">Within-cluster sum of squares:</span>
                    <span className="ml-2 font-medium">{analyticsResults.kmeans.inertia.toFixed(3)}</span>
                  </div>
                  <div>
                    <span className="text-gray-600">Clusters found:</span>
                    <span className="ml-2 font-medium">{analyticsResults.kmeans.k}</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* DBSCAN Analysis Results */}
          {analyticsResults.dbscanMap && analyticsResults.preprocess && analyticsResults.kmeans && (
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <h3 className="text-lg font-medium mb-4">DBSCAN Outlier Detection</h3>
              <p className="text-gray-600 mb-6">
                DBSCAN analysis within each K-Means cluster to identify outliers and dense subclusters.
              </p>

              {/* DBSCAN Parameter Controls */}
              <div className="mb-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
                <h4 className="font-medium text-gray-900 mb-3">DBSCAN Parameters</h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Epsilon (eps)
                    </label>
                    <input
                      type="number"
                      step="0.001"
                      min="0.001"
                      max="1"
                      defaultValue={clusteringParams.eps}
                      onChange={(e) => setClusteringParams(prev => ({ ...prev, eps: parseFloat(e.target.value) || 0.06 }))}
                      className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                    <p className="text-xs text-gray-500 mt-1">Maximum distance between points in a cluster</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Min Points
                    </label>
                    <input
                      type="number"
                      min="1"
                      max="20"
                      defaultValue={clusteringParams.minPts}
                      onChange={(e) => setClusteringParams(prev => ({ ...prev, minPts: parseInt(e.target.value) || 4 }))}
                      className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                    <p className="text-xs text-gray-500 mt-1">Minimum points required to form a cluster</p>
                  </div>
                  <div>
                    <button
                      onClick={applyClusteringParams}
                      disabled={isAnalyzing}
                      className="w-full bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-400 text-white font-medium py-2 px-4 rounded-md transition-colors duration-200 flex items-center justify-center"
                    >
                      {isAnalyzing ? (
                        <>
                          <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Analyzing...
                        </>
                      ) : (
                        'Apply Parameters'
                      )}
                    </button>
                  </div>
                </div>
              </div>

              {/* Cluster Selector */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Select K-Means Cluster to Analyze:
                </label>
                <select
                  value={selectedCluster}
                  onChange={(e) => setSelectedCluster(Number(e.target.value))}
                  className="block w-48 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                >
                  {Array.from(analyticsResults.dbscanMap.keys()).map(clusterId => (
                    <option key={clusterId} value={clusterId}>
                      Cluster {clusterId}
                    </option>
                  ))}
                </select>
              </div>

              {/* DBSCAN Chart */}
              <DBScanClusteringChart
                dbscanMap={analyticsResults.dbscanMap}
                preprocessResult={analyticsResults.preprocess}
                kmeansResult={analyticsResults.kmeans}
                selectedKMeansCluster={selectedCluster}
              />

              {/* DBSCAN Statistics */}
              <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                <h4 className="font-medium text-gray-900 mb-2">DBSCAN Statistics</h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                  {Array.from(analyticsResults.dbscanMap.entries()).map(([clusterId, dbscanResult]) => {
                    const noisePoints = Array.from(dbscanResult.labels.values()).filter(label => label === -1).length;
                    const totalPoints = dbscanResult.labels.size;
                    const subclusters = new Set(Array.from(dbscanResult.labels.values()).filter(label => label !== -1)).size;

                    return (
                      <div key={clusterId} className="border border-gray-200 rounded p-3">
                        <h5 className="font-medium text-gray-800 mb-1">Cluster {clusterId}</h5>
                        <div className="space-y-1 text-xs text-gray-600">
                          <div>Points: {totalPoints}</div>
                          <div>Outliers: {noisePoints} ({totalPoints > 0 ? ((noisePoints / totalPoints) * 100).toFixed(1) : 0}%)</div>
                          <div>Subclusters: {subclusters}</div>
                          <div>eps: {dbscanResult.params.eps}, minPts: {dbscanResult.params.minPts}</div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {/* IPA Analysis Results */}
          {analyticsResults.ipa && analyticsResults.ipa.length > 0 && (
            <div className="space-y-6">
              {analyticsResults.ipa.map((clusterIPA) => (
                <div key={`ipa-cluster-${clusterIPA.clusterId}`} className="bg-white rounded-lg border border-gray-200 p-6">
                  <h3 className="text-lg font-medium mb-4">
                    Importance-Performance Analysis - Cluster {clusterIPA.clusterId}
                  </h3>
                  <p className="text-gray-600 mb-6">
                    IPA analysis for cluster {clusterIPA.clusterId} with {clusterIPA.size} responses.
                  </p>

                  {/* IPA Chart */}
                  <div className="mb-6">
                    <IPAChart data={clusterIPA} />
                  </div>

                  {/* Summary Statistics */}
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
                    <div className="bg-red-50 p-4 rounded-lg">
                      <p className="text-sm text-red-600 font-medium">Concentrate Here</p>
                      <p className="text-2xl font-bold text-red-900">
                        {clusterIPA.attrs.filter(a => a.quadrant === 1).length}
                      </p>
                    </div>
                    <div className="bg-green-50 p-4 rounded-lg">
                      <p className="text-sm text-green-600 font-medium">Keep Up Good Work</p>
                      <p className="text-2xl font-bold text-green-900">
                        {clusterIPA.attrs.filter(a => a.quadrant === 2).length}
                      </p>
                    </div>
                    <div className="bg-yellow-50 p-4 rounded-lg">
                      <p className="text-sm text-yellow-600 font-medium">Low Priority</p>
                      <p className="text-2xl font-bold text-yellow-900">
                        {clusterIPA.attrs.filter(a => a.quadrant === 3).length}
                      </p>
                    </div>
                    <div className="bg-blue-50 p-4 rounded-lg">
                      <p className="text-sm text-blue-600 font-medium">Possible Overkill</p>
                      <p className="text-2xl font-bold text-blue-900">
                        {clusterIPA.attrs.filter(a => a.quadrant === 4).length}
                      </p>
                    </div>
                  </div>

                  {/* Detailed Attributes Table */}
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b border-gray-200">
                          <th className="text-left py-2">Attribute</th>
                          <th className="text-left py-2">Importance</th>
                          <th className="text-left py-2">Performance</th>
                          <th className="text-left py-2">Gap</th>
                          <th className="text-left py-2">Quadrant</th>
                        </tr>
                      </thead>
                      <tbody>
                        {clusterIPA.attrs.map((attr, attrIndex) => {
                          const quadrantNames = {
                            1: 'Concentrate Here',
                            2: 'Keep Up Good Work',
                            3: 'Low Priority',
                            4: 'Possible Overkill'
                          };
                          const quadrantColors = {
                            1: 'bg-red-100 text-red-800',
                            2: 'bg-green-100 text-green-800',
                            3: 'bg-yellow-100 text-yellow-800',
                            4: 'bg-blue-100 text-blue-800'
                          };
                          return (
                            <tr key={attrIndex} className="border-b border-gray-100">
                              <td className="py-2 font-medium">
                                {attr.attributeQuestionContent || `Attribute ${attr.attributeQuestionId}`}
                              </td>
                              <td className="py-2">{attr.impMean.toFixed(2)}</td>
                              <td className="py-2">{attr.perfMean.toFixed(2)}</td>
                              <td className="py-2">
                                <span className={attr.gap > 0 ? 'text-red-600' : 'text-green-600'}>
                                  {attr.gap.toFixed(2)}
                                </span>
                              </td>
                              <td className="py-2">
                                <span className={`px-2 py-1 rounded text-xs ${quadrantColors[attr.quadrant as keyof typeof quadrantColors]}`}>
                                  {quadrantNames[attr.quadrant as keyof typeof quadrantNames]}
                                </span>
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Analysis Summaries */}
          {analyticsResults.summaries && (
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <h3 className="text-lg font-medium mb-4">Analysis Summaries</h3>
              <p className="text-gray-600 mb-4">
                Summarized insights from clustering and IPA analyses.
              </p>
              {/* Add more detailed visualization here based on your ipa result structure */}
              {analyticsResults.summaries.map((summary) => (
                <div className="bg-white rounded-lg border border-gray-200 p-6">
                  <h3 className="text-lg font-medium mb-4">Cluster {summary.clusterId}</h3>
                  <p className="text-sm text-gray-600 mb-4">
                    {summary.narrative}
                  </p>
                  {/* <IPAChart data={analyticsResults.ipa} /> */}
                </div>
              ))}
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









