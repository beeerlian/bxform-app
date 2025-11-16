import * as d3 from 'd3';
import React, { useEffect, useRef } from 'react';
import { DBSCANResult, KMeansResult, PreprocessResult } from '../../services/analytics/analytics';

interface DBScanClusteringChartProps {
       dbscanMap: Map<number, DBSCANResult>;
       preprocessResult: PreprocessResult;
       kmeansResult: KMeansResult;
       selectedKMeansCluster?: number;
}

const DBScanClusteringChart: React.FC<DBScanClusteringChartProps> = ({
       dbscanMap,
       preprocessResult,
       kmeansResult,
       selectedKMeansCluster
}) => {
       const svgRef = useRef<SVGSVGElement>(null);

       useEffect(() => {
              if (!dbscanMap || !preprocessResult || !kmeansResult || dbscanMap.size === 0) {
                     return;
              }

              const svg = d3.select(svgRef.current);

              // Find best feature pair for visualization (same logic as KMeansChart)
              const findBestFeaturePair = () => {
                     const featureCount = preprocessResult.X[0]?.length || 0;
                     let bestPair = { x: 0, y: 1 };
                     let maxVariation = 0;

                     for (let i = 0; i < Math.min(featureCount, 10); i++) {
                            for (let j = i + 1; j < Math.min(featureCount, 10); j++) {
                                   const xValues = preprocessResult.X.map(point => point[i] || 0);
                                   const yValues = preprocessResult.X.map(point => point[j] || 0);

                                   const xVariation = d3.variance(xValues) || 0;
                                   const yVariation = d3.variance(yValues) || 0;
                                   const totalVariation = xVariation + yVariation;

                                   if (totalVariation > maxVariation) {
                                          maxVariation = totalVariation;
                                          bestPair = { x: i, y: j };
                                   }
                            }
                     }

                     console.log(`DBSCAN visualization - Best feature pair: ${bestPair.x}, ${bestPair.y} with variation: ${maxVariation}`);
                     return bestPair;
              };

              const bestFeatures = findBestFeaturePair();

              // Calculate dynamic canvas size based on data spread
              const featureXValues = preprocessResult.X.map(point => point[bestFeatures.x] !== undefined ? point[bestFeatures.x] : 0);
              const featureYValues = preprocessResult.X.map(point => point[bestFeatures.y] !== undefined ? point[bestFeatures.y] : 0);

              const featureXExtent = d3.extent(featureXValues) as [number, number];
              const featureYExtent = d3.extent(featureYValues) as [number, number];

              const featureXRange = Math.max(featureXExtent[1] - featureXExtent[0], 1);
              const featureYRange = Math.max(featureYExtent[1] - featureYExtent[0], 1);
              const aspectRatio = featureXRange / featureYRange;

              // Calculate canvas size
              const minWidth = 600, maxWidth = 1200;
              const minHeight = 500, maxHeight = 1000;

              let width, height;
              if (aspectRatio > 1.5) {
                     width = Math.min(maxWidth, Math.max(minWidth, featureXRange * 120));
                     height = Math.min(maxHeight, Math.max(minHeight, width / aspectRatio));
              } else if (aspectRatio < 0.67) {
                     height = Math.min(maxHeight, Math.max(minHeight, featureYRange * 120));
                     width = Math.min(maxWidth, Math.max(minWidth, height * aspectRatio));
              } else {
                     width = Math.min(maxWidth, Math.max(minWidth, 800));
                     height = Math.min(maxHeight, Math.max(minHeight, 600));
              }

              const margin = {
                     top: Math.max(60, height * 0.1),
                     right: Math.max(60, width * 0.08),
                     bottom: Math.max(80, height * 0.13),
                     left: Math.max(80, width * 0.1)
              };

              console.log('DBSCAN dynamic sizing:', { width, height, margin, aspectRatio, dataRange: { xRange: featureXRange, yRange: featureYRange } });

              // Clear previous content
              svg.selectAll('*').remove();
              svg.attr('width', width).attr('height', height);

              // Create the main plot area
              const plotArea = svg.append('g');

              // Determine which K-means cluster to show
              const clusterToShow = selectedKMeansCluster !== undefined ? selectedKMeansCluster : Array.from(dbscanMap.keys())[0];
              const dbscanResult = dbscanMap.get(clusterToShow);

              if (!dbscanResult) {
                     // Show message when no DBSCAN data available
                     plotArea
                            .append('text')
                            .attr('x', width / 2)
                            .attr('y', height / 2)
                            .attr('text-anchor', 'middle')
                            .style('font-size', '16px')
                            .style('fill', '#6b7280')
                            .text('No DBSCAN data available for selected cluster');
                     return;
              }

              // Get indices for the selected K-means cluster
              const kmeansClusterIndices = kmeansResult.labels
                     .map((label, index) => ({ label, index }))
                     .filter(item => item.label === clusterToShow)
                     .map(item => item.index);

              // Create data points for visualization with DBSCAN subclusters
              const dataPoints = kmeansClusterIndices.map(globalIndex => {
                     const baseX = preprocessResult.X[globalIndex][bestFeatures.x] !== undefined
                            ? preprocessResult.X[globalIndex][bestFeatures.x] : 0;
                     const baseY = preprocessResult.X[globalIndex][bestFeatures.y] !== undefined
                            ? preprocessResult.X[globalIndex][bestFeatures.y] : 0;

                     // Get DBSCAN subcluster label
                     const dbscanLabel = dbscanResult.labels.get(globalIndex) ?? -1;

                     // Add small jitter to separate overlapping points
                     const jitterX = (Math.random() - 0.5) * 0.015;
                     const jitterY = (Math.random() - 0.5) * 0.015;

                     return {
                            x: baseX + jitterX,
                            y: baseY + jitterY,
                            baseX,
                            baseY,
                            globalIndex,
                            kmeansCluster: clusterToShow,
                            dbscanSubcluster: dbscanLabel,
                            isNoise: dbscanLabel === -1,
                            id: preprocessResult.ids[globalIndex]
                     };
              });

              // Calculate scales
              let xExtent = d3.extent(dataPoints, d => d.x) as [number, number];
              let yExtent = d3.extent(dataPoints, d => d.y) as [number, number];

              // Handle edge cases
              if (!xExtent[0] && xExtent[0] !== 0) xExtent = [0, 1];
              if (!yExtent[0] && yExtent[0] !== 0) yExtent = [0, 1];
              if (Math.abs(xExtent[1] - xExtent[0]) < 0.01) xExtent = [xExtent[0] - 0.5, xExtent[0] + 0.5];
              if (Math.abs(yExtent[1] - yExtent[0]) < 0.01) yExtent = [yExtent[0] - 0.5, yExtent[0] + 0.5];

              // Add padding to extents
              const xRange = xExtent[1] - xExtent[0];
              const yRange = yExtent[1] - yExtent[0];
              const xPadding = xRange * 0.1;
              const yPadding = yRange * 0.1;

              const xScale = d3
                     .scaleLinear()
                     .domain([xExtent[0] - xPadding, xExtent[1] + xPadding])
                     .range([margin.left, width - margin.right]);

              const yScale = d3
                     .scaleLinear()
                     .domain([yExtent[0] - yPadding, yExtent[1] + yPadding])
                     .range([height - margin.bottom, margin.top]);

              // Create color scale for DBSCAN subclusters
              const subclusterLabels = Array.from(new Set(dataPoints.map(d => d.dbscanSubcluster)))
                     .filter(label => label !== -1)
                     .sort((a, b) => a - b);

              const colorScale = d3.scaleOrdinal(d3.schemeSet3)
                     .domain(subclusterLabels.map(String));

              // Add axes
              const xAxis = d3.axisBottom(xScale).ticks(8);
              const yAxis = d3.axisLeft(yScale).ticks(8);

              plotArea
                     .append('g')
                     .attr('class', 'x-axis')
                     .attr('transform', `translate(0, ${height - margin.bottom})`)
                     .call(xAxis);

              plotArea
                     .append('g')
                     .attr('class', 'y-axis')
                     .attr('transform', `translate(${margin.left}, 0)`)
                     .call(yAxis);

              // Add axis labels
              plotArea
                     .append('text')
                     .attr('class', 'x-label')
                     .attr('x', width / 2)
                     .attr('y', height - 20)
                     .style('text-anchor', 'middle')
                     .style('font-size', '12px')
                     .style('fill', '#374151')
                     .text(`Feature ${bestFeatures.x} (${preprocessResult.featureMeta[bestFeatures.x]?.questionContent || 'Unknown'})`);

              plotArea
                     .append('text')
                     .attr('class', 'y-label')
                     .attr('x', -height / 2)
                     .attr('y', 20)
                     .attr('transform', 'rotate(-90)')
                     .style('text-anchor', 'middle')
                     .style('font-size', '12px')
                     .style('fill', '#374151')
                     .text(`Feature ${bestFeatures.y} (${preprocessResult.featureMeta[bestFeatures.y]?.questionContent || 'Unknown'})`);

              // Create tooltip
              const tooltip = d3.select('body')
                     .selectAll('.dbscan-tooltip')
                     .data([0])
                     .enter()
                     .append('div')
                     .attr('class', 'dbscan-tooltip')
                     .style('position', 'absolute')
                     .style('background', 'rgba(0, 0, 0, 0.9)')
                     .style('color', 'white')
                     .style('padding', '8px 12px')
                     .style('border-radius', '6px')
                     .style('font-size', '12px')
                     .style('pointer-events', 'none')
                     .style('display', 'none')
                     .style('z-index', '1000');

              // Draw data points
              const circles = plotArea
                     .selectAll('circle.data-point')
                     .data(dataPoints)
                     .enter()
                     .append('circle')
                     .attr('class', 'data-point')
                     .attr('cx', d => xScale(d.x))
                     .attr('cy', d => yScale(d.y))
                     .attr('r', (d: any) => d.isNoise ? 4 : 6)
                     .attr('fill', (d: any) => {
                            if (d.isNoise) return '#dc2626'; // Red for noise points
                            return colorScale(String(d.dbscanSubcluster));
                     })
                     .attr('stroke', (d: any) => d.isNoise ? '#991b1b' : '#fff')
                     .attr('stroke-width', (d: any) => d.isNoise ? 1 : 2)
                     .style('cursor', 'pointer')
                     .style('opacity', (d: any) => d.isNoise ? 0.7 : 0.9)
                     .on('mouseover', (event, d: any) => {
                            // Highlight the hovered point
                            d3.select(event.currentTarget)
                                   .attr('r', d.isNoise ? 6 : 8)
                                   .style('opacity', 1);

                            tooltip
                                   .style('display', 'block')
                                   .html(
                                          `<strong>Point ID:</strong> ${d.id}<br/>
             <strong>K-Means Cluster:</strong> ${d.kmeansCluster}<br/>
             <strong>DBSCAN Subcluster:</strong> ${d.isNoise ? 'Noise (-1)' : d.dbscanSubcluster}<br/>
             <strong>Feature ${bestFeatures.x}:</strong> ${d.baseX.toFixed(3)}<br/>
             <strong>Feature ${bestFeatures.y}:</strong> ${d.baseY.toFixed(3)}<br/>
             <strong>Status:</strong> ${d.isNoise ? 'Outlier' : 'Core/Border Point'}`
                                   )
                                   .style('left', `${event.pageX + 10}px`)
                                   .style('top', `${event.pageY - 10}px`);
                     })
                     .on('mouseout', (event, d: any) => {
                            // Reset the point size
                            d3.select(event.currentTarget)
                                   .attr('r', d.isNoise ? 4 : 6)
                                   .style('opacity', (d: any) => d.isNoise ? 0.7 : 0.9);

                            tooltip.style('display', 'none');
                     });

              // Add legend
              const legend = plotArea.append('g')
                     .attr('class', 'legend')
                     .attr('transform', `translate(${width - margin.right - 150}, ${margin.top + 20})`);

              // Background for legend
              const legendBg = legend.append('rect')
                     .attr('x', -10)
                     .attr('y', -10)
                     .attr('width', 140)
                     .attr('height', (subclusterLabels.length + 2) * 25 + 10)
                     .attr('fill', 'rgba(255, 255, 255, 0.9)')
                     .attr('stroke', '#d1d5db')
                     .attr('stroke-width', 1)
                     .attr('rx', 4);

              // Legend title
              legend.append('text')
                     .attr('x', 0)
                     .attr('y', 0)
                     .style('font-size', '12px')
                     .style('font-weight', 'bold')
                     .style('fill', '#374151')
                     .text('DBSCAN Subclusters');

              // Subcluster legend items
              subclusterLabels.forEach((label, i) => {
                     const legendItem = legend.append('g')
                            .attr('transform', `translate(0, ${(i + 1) * 20})`);

                     legendItem.append('circle')
                            .attr('cx', 8)
                            .attr('cy', 0)
                            .attr('r', 6)
                            .attr('fill', colorScale(String(label)))
                            .attr('stroke', '#fff')
                            .attr('stroke-width', 2);

                     legendItem.append('text')
                            .attr('x', 20)
                            .attr('y', 0)
                            .attr('dy', '0.35em')
                            .style('font-size', '11px')
                            .style('fill', '#374151')
                            .text(`Subcluster ${label}`);
              });

              // Noise legend item
              const noiseItem = legend.append('g')
                     .attr('transform', `translate(0, ${(subclusterLabels.length + 1) * 20})`);

              noiseItem.append('circle')
                     .attr('cx', 8)
                     .attr('cy', 0)
                     .attr('r', 4)
                     .attr('fill', '#dc2626')
                     .attr('stroke', '#991b1b')
                     .attr('stroke-width', 1);

              noiseItem.append('text')
                     .attr('x', 20)
                     .attr('y', 0)
                     .attr('dy', '0.35em')
                     .style('font-size', '11px')
                     .style('fill', '#374151')
                     .text('Noise (Outliers)');

              // Add title
              plotArea
                     .append('text')
                     .attr('x', width / 2)
                     .attr('y', margin.top / 2)
                     .style('text-anchor', 'middle')
                     .style('font-size', '16px')
                     .style('font-weight', 'bold')
                     .style('fill', '#1f2937')
                     .text(`DBSCAN Analysis - K-Means Cluster ${clusterToShow}`);

              // Add statistics
              const noiseCount = dataPoints.filter(d => d.isNoise).length;
              const coreCount = dataPoints.length - noiseCount;
              const subclusterCount = subclusterLabels.length;

              plotArea
                     .append('text')
                     .attr('x', margin.left)
                     .attr('y', margin.top / 2 + 20)
                     .style('font-size', '12px')
                     .style('fill', '#6b7280')
                     .text(`Points: ${dataPoints.length} | Core/Border: ${coreCount} | Noise: ${noiseCount} | Subclusters: ${subclusterCount} | eps: ${dbscanResult.params.eps} | minPts: ${dbscanResult.params.minPts}`);

              // Log debug information
              console.log('DBSCAN Visualization:', {
                     clusterToShow,
                     totalPoints: dataPoints.length,
                     noisePoints: noiseCount,
                     corePoints: coreCount,
                     subclusters: subclusterCount,
                     params: dbscanResult.params
              });

       }, [dbscanMap, preprocessResult, kmeansResult, selectedKMeansCluster]);

       return (
              <div className="w-full">
                     {/* Instructions */}
                     <div className="mb-4 p-3 bg-purple-50 rounded-lg border-l-4 border-purple-400">
                            <p className="text-sm text-purple-800">
                                   <strong>🔍 DBSCAN Analysis:</strong> Shows density-based subclusters within each K-Means cluster.
                                   Red dots are outliers (noise points), colored dots are core/border points in subclusters.
                            </p>
                     </div>

                     <svg ref={svgRef}></svg>
              </div>
       );
};

export default DBScanClusteringChart;
