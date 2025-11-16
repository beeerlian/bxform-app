import { KMeansResult, PreprocessResult } from '@/services/analytics/analytics';
import * as d3 from 'd3';
import React, { useEffect, useRef } from 'react';

interface KMeansChartProps {
  kmeansResult: KMeansResult;
  preprocessResult: PreprocessResult;
}

const KMeansClusteringChart: React.FC<KMeansChartProps> = ({ kmeansResult, preprocessResult }) => {
  const svgRef = useRef<SVGSVGElement | null>(null);

  useEffect(() => {
    if (!kmeansResult || !preprocessResult || !preprocessResult.X || preprocessResult.X.length === 0) {
      console.log('Missing data for K-Means visualization');
      return;
    }

    console.log('K-Means data:', {
      dataPoints: preprocessResult.X.length,
      features: preprocessResult.X[0]?.length || 0,
      clusters: kmeansResult.k,
      labels: kmeansResult.labels.length
    });

    const svg = d3.select(svgRef.current);

    // First find best feature pair to calculate data extent
    const findBestFeaturePair = () => {
      const featureCount = preprocessResult.X[0]?.length || 0;
      let bestPair = { x: 0, y: 1 };
      let maxVariation = 0;


      // Ensure we have at least 2 features
      if (featureCount < 2) {
        console.log('Not enough features for 2D visualization, using fallback');
        return { x: 0, y: 0 }; // Will be handled as same feature case
      }

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

      // Fallback: if all variations are 0 or very small, just use first two different features
      if (maxVariation < 0.0001) {
        console.log('All features have very low variation, using fallback feature selection');
        bestPair = { x: 0, y: Math.min(1, featureCount - 1) };
      }

      // Double check that we have different features
      if (bestPair.x === bestPair.y && featureCount > 1) {
        bestPair.y = bestPair.x + 1;
      }

      // console.log(`Final feature pair: ${bestPair.x}, ${bestPair.y} with variation: ${maxVariation}`);
      // console.log(`Feature ${bestPair.x} name: ${preprocessResult.featureMeta[bestPair.x]?.questionContent || preprocessResult.featureMeta[bestPair.x]?.featureKey || 'Unknown'}`);
      // console.log(`Feature ${bestPair.y} name: ${preprocessResult.featureMeta[bestPair.y]?.questionContent || preprocessResult.featureMeta[bestPair.y]?.featureKey || 'Unknown'}`);

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

    // Calculate canvas size based on data distribution
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

    // Clear previous content
    svg.selectAll('*').remove();
    svg.attr('width', width).attr('height', height);

    // Check if we have enough feature dimensions
    const hasMultipleFeatures = preprocessResult.X[0] && preprocessResult.X[0].length >= 2;

    if (!hasMultipleFeatures) {
      // Fallback: create a simple 1D visualization or use random y values
      console.log('Using fallback visualization for single feature');
    }

    const dataPoints = preprocessResult.X.map((point, index) => {
      const baseX = point[bestFeatures.x] !== undefined ? point[bestFeatures.x] : 0;
      const baseY = point[bestFeatures.y] !== undefined ? point[bestFeatures.y] : 0;

      // Add small random jitter to separate overlapping points
      const jitterX = (Math.random() - 0.5) * 0.02;
      const jitterY = (Math.random() - 0.5) * 0.02;

      return {
        x: baseX + jitterX,
        y: baseY + jitterY,
        baseX,
        baseY,
        cluster: kmeansResult.labels[index],
        id: preprocessResult.ids[index],
        originalPoint: point,
        index
      };
    });

    // Calculate extent for better scaling
    let xExtent = d3.extent(dataPoints, d => d.x) as [number, number];
    let yExtent = d3.extent(dataPoints, d => d.y) as [number, number];

    // Handle edge cases where extent might be invalid
    if (!xExtent[0] && xExtent[0] !== 0) xExtent = [0, 1];
    if (!yExtent[0] && yExtent[0] !== 0) yExtent = [0, 1];
    if (Math.abs(xExtent[1] - xExtent[0]) < 0.01) xExtent = [xExtent[0] - 0.5, xExtent[0] + 0.5];
    if (Math.abs(yExtent[1] - yExtent[0]) < 0.01) yExtent = [yExtent[0] - 0.5, yExtent[0] + 0.5];

    // Add padding to extents
    const xRange = xExtent[1] - xExtent[0];
    const yRange = yExtent[1] - yExtent[0];
    const xPadding = Math.max(xRange * 0.1, 0.05);
    const yPadding = Math.max(yRange * 0.1, 0.05);

    const xScale = d3
      .scaleLinear()
      .domain([xExtent[0] - xPadding, xExtent[1] + xPadding])
      .range([margin.left, width - margin.right]);

    const yScale = d3
      .scaleLinear()
      .domain([yExtent[0] - yPadding, yExtent[1] + yPadding])
      .range([height - margin.bottom, margin.top]);

    // Create color scale for clusters
    const colorScale = d3.scaleOrdinal(d3.schemeCategory10);

    // Create zoom behavior
    const zoom = d3.zoom<SVGSVGElement, unknown>()
      .scaleExtent([0.1, 10])
      .on('zoom', (event) => {
        const transform = event.transform;

        // Update scales with zoom transform
        const newXScale = transform.rescaleX(xScale);
        const newYScale = transform.rescaleY(yScale);

        // Update axes with type assertions
        svg.select('.x-axis')
          .call(d3.axisBottom(newXScale).tickFormat(d => Number(d).toFixed(2)) as any);

        svg.select('.y-axis')
          .call(d3.axisLeft(newYScale).tickFormat(d => Number(d).toFixed(2)) as any);

        // Update data points
        svg.selectAll('circle.data-point')
          .attr('cx', (d: any) => newXScale(d.x))
          .attr('cy', (d: any) => newYScale(d.y));

        // Update centroids
        svg.selectAll('polygon.centroid')
          .attr('points', (d: any) => {
            const cx = newXScale(d.x);
            const cy = newYScale(d.y);
            const size = 10;
            return `${cx},${cy - size} ${cx + size},${cy} ${cx},${cy + size} ${cx - size},${cy}`;
          });
      });

    // Apply zoom to SVG with type assertion
    (svg as any).call(zoom);

    // Add zoom controls
    const zoomControls = svg.append('g')
      .attr('class', 'zoom-controls')
      .attr('transform', `translate(${width - margin.right - 100}, ${height - margin.bottom - 100})`);

    // Zoom in button
    const zoomInButton = zoomControls.append('g')
      .attr('class', 'zoom-button')
      .style('cursor', 'pointer')
      .on('click', () => {
        (svg.transition() as any).duration(300).call(
          (zoom as any).scaleBy, 1.5
        );
      });

    zoomInButton.append('rect')
      .attr('width', 30)
      .attr('height', 30)
      .attr('fill', '#4f46e5')
      .attr('stroke', '#fff')
      .attr('stroke-width', 2)
      .attr('rx', 4);

    zoomInButton.append('text')
      .attr('x', 15)
      .attr('y', 20)
      .attr('text-anchor', 'middle')
      .style('fill', '#fff')
      .style('font-size', '18px')
      .style('font-weight', 'bold')
      .style('user-select', 'none')
      .text('+');

    // Zoom out button
    const zoomOutButton = zoomControls.append('g')
      .attr('class', 'zoom-button')
      .attr('transform', 'translate(35, 0)')
      .style('cursor', 'pointer')
      .on('click', () => {
        (svg.transition() as any).duration(300).call(
          (zoom as any).scaleBy, 0.67
        );
      });

    zoomOutButton.append('rect')
      .attr('width', 30)
      .attr('height', 30)
      .attr('fill', '#6b7280')
      .attr('stroke', '#fff')
      .attr('stroke-width', 2)
      .attr('rx', 4);

    zoomOutButton.append('text')
      .attr('x', 15)
      .attr('y', 20)
      .attr('text-anchor', 'middle')
      .style('fill', '#fff')
      .style('font-size', '18px')
      .style('font-weight', 'bold')
      .style('user-select', 'none')
      .text('−');

    // Reset zoom button
    const resetButton = zoomControls.append('g')
      .attr('class', 'zoom-button')
      .attr('transform', 'translate(70, 0)')
      .style('cursor', 'pointer')
      .on('click', () => {
        (svg.transition() as any).duration(500).call(
          (zoom as any).transform,
          d3.zoomIdentity
        );
      });

    resetButton.append('rect')
      .attr('width', 30)
      .attr('height', 30)
      .attr('fill', '#059669')
      .attr('stroke', '#fff')
      .attr('stroke-width', 2)
      .attr('rx', 4);

    resetButton.append('text')
      .attr('x', 15)
      .attr('y', 20)
      .attr('text-anchor', 'middle')
      .style('fill', '#fff')
      .style('font-size', '12px')
      .style('font-weight', 'bold')
      .style('user-select', 'none')
      .text('⌂');

    // Draw axes
    const xAxis = d3.axisBottom(xScale).tickFormat(d => Number(d).toFixed(2));
    const yAxis = d3.axisLeft(yScale).tickFormat(d => Number(d).toFixed(2));

    svg
      .append('g')
      .attr('class', 'x-axis')
      .attr('transform', `translate(0,${height - margin.bottom})`)
      .call(xAxis)
      .append('text')
      .attr('x', width / 2)
      .attr('y', 35)
      .attr('fill', '#374151')
      .style('text-anchor', 'middle')
      .style('font-size', '12px')
      .style('font-weight', '500')
      .text(`Feature ${bestFeatures.x}: ${preprocessResult.featureMeta[bestFeatures.x]?.questionContent || preprocessResult.featureMeta[bestFeatures.x]?.featureKey || `Index ${bestFeatures.x}`}`);

    // console.dir(preprocessResult.featureMeta);
    // console.log(`Feature ${bestFeatures.x}: ${preprocessResult.featureMeta[bestFeatures.x]?.questionContent || preprocessResult.featureMeta[bestFeatures.x]?.featureKey || `Index ${bestFeatures.x}`}`);
    // console.log(`Feature  ${bestFeatures.y}: ${preprocessResult.featureMeta[bestFeatures.y]?.questionContent || preprocessResult.featureMeta[bestFeatures.y]?.featureKey || `Index ${bestFeatures.y}`}`);

    svg
      .append('g')
      .attr('class', 'y-axis')
      .attr('transform', `translate(${margin.left},0)`)
      .call(yAxis)
      .append('text')
      .attr('transform', 'rotate(-90)')
      .attr('y', -45)
      .attr('x', -height / 2)
      .attr('fill', '#374151')
      .style('text-anchor', 'middle')
      .style('font-size', '12px')
      .style('font-weight', '500')
      .text(`Feature ${bestFeatures.y}: ${preprocessResult.featureMeta[bestFeatures.y]?.questionContent || preprocessResult.featureMeta[bestFeatures.y]?.featureKey || `Index ${bestFeatures.y}`}`);

    // Add title
    svg
      .append('text')
      .attr('x', width / 2)
      .attr('y', margin.top / 2)
      .attr('text-anchor', 'middle')
      .style('font-size', '18px')
      .style('font-weight', 'bold')
      .style('fill', '#1f2937')
      .text(`K-Means Clustering Results (k=${kmeansResult.k})`);

    // Create tooltip
    const tooltip = d3
      .select('body')
      .selectAll('.kmeans-tooltip')
      .data([null])
      .join('div')
      .attr('class', 'kmeans-tooltip')
      .style('position', 'absolute')
      .style('background', '#fff')
      .style('border', '1px solid #d1d5db')
      .style('border-radius', '6px')
      .style('padding', '12px')
      .style('box-shadow', '0 4px 6px -1px rgba(0, 0, 0, 0.1)')
      .style('display', 'none')
      .style('z-index', '1000')
      .style('font-size', '12px')
      .style('line-height', '1.4');

    // Draw data points
    const circles = svg
      .selectAll('circle.data-point')
      .data(dataPoints)
      .enter()
      .append('circle')
      .attr('class', 'data-point')
      .attr('cx', d => {
        const x = xScale(d.x);
        return isNaN(x) ? margin.left : x;
      })
      .attr('cy', d => {
        const y = yScale(d.y);
        return isNaN(y) ? margin.top : y;
      })
      .attr('r', 6)
      .attr('fill', d => colorScale(d.cluster.toString()))
      .attr('stroke', '#fff')
      .attr('stroke-width', 2)
      .style('cursor', 'pointer')
      .style('opacity', 0.8)
      .on('mouseover', (event, d) => {
        // Highlight the hovered point
        d3.select(event.currentTarget)
          .attr('r', 8)
          .style('opacity', 1);

        // Get feature names for better tooltip
        const featureXName = preprocessResult.featureMeta[bestFeatures.x]?.questionContent || preprocessResult.featureMeta[bestFeatures.x]?.featureKey || `Feature ${bestFeatures.x}`;
        const featureYName = preprocessResult.featureMeta[bestFeatures.y]?.questionContent || preprocessResult.featureMeta[bestFeatures.y]?.featureKey || `Feature ${bestFeatures.y}`;

        const featureInfo = [
          `${featureXName}: ${d.originalPoint[bestFeatures.x]?.toFixed(3) || 'N/A'}`,
          `${featureYName}: ${d.originalPoint[bestFeatures.y]?.toFixed(3) || 'N/A'}`
        ].join('<br/>');

        tooltip
          .style('display', 'block')
          .html(
            `<strong>Response ${d.index + 1}</strong><br/>
             Cluster: ${d.cluster}<br/>
             ID: ${d.id}<br/>
             X: ${d.baseX.toFixed(3)} (${d.x.toFixed(3)})<br/>
             Y: ${d.baseY.toFixed(3)} (${d.y.toFixed(3)})<br/>
             <br/>
             <strong>Feature Values:</strong><br/>
             ${featureInfo}`
          )
          .style('left', `${event.pageX + 10}px`)
          .style('top', `${event.pageY - 10}px`);
      })
      .on('mouseout', (event) => {
        // Reset the point size
        d3.select(event.currentTarget)
          .attr('r', 6)
          .style('opacity', 0.8);

        tooltip.style('display', 'none');
      });


    // Draw centroids using the same feature indices
    const centroidsData = kmeansResult.centroids.map((centroid, index) => ({
      x: centroid[bestFeatures.x] || 0,
      y: centroid[bestFeatures.y] || 0,
      cluster: index,
      centroid
    }));


    svg
      .selectAll('polygon.centroid')
      .data(centroidsData)
      .enter()
      .append('polygon')
      .attr('class', 'centroid')
      .attr('points', d => {
        const cx = xScale(d.x);
        const cy = yScale(d.y);
        const size = 10;
        // Create diamond shape
        return `${cx},${cy - size} ${cx + size},${cy} ${cx},${cy + size} ${cx - size},${cy}`;
      })
      .attr('fill', d => colorScale(d.cluster.toString()))
      .attr('stroke', '#000')
      .attr('stroke-width', 2)
      .style('cursor', 'pointer')
      .on('mouseover', (event, d) => {
        const featureXName = preprocessResult.featureMeta[bestFeatures.x]?.questionContent || preprocessResult.featureMeta[bestFeatures.x]?.featureKey || `Feature ${bestFeatures.x}`;
        const featureYName = preprocessResult.featureMeta[bestFeatures.y]?.questionContent || preprocessResult.featureMeta[bestFeatures.y]?.featureKey || `Feature ${bestFeatures.y}`;

        const featureInfo = [
          `${featureXName}: ${d.centroid[bestFeatures.x]?.toFixed(3) || 'N/A'}`,
          `${featureYName}: ${d.centroid[bestFeatures.y]?.toFixed(3) || 'N/A'}`
        ].join('<br/>');

        tooltip
          .style('display', 'block')
          .html(
            `<strong>Centroid ${d.cluster}</strong><br/>
             X: ${d.x.toFixed(3)}<br/>
             Y: ${d.y.toFixed(3)}<br/>
             <br/>
             <strong>Feature Values:</strong><br/>
             ${featureInfo}`
          )
          .style('left', `${event.pageX + 10}px`)
          .style('top', `${event.pageY - 10}px`);
      })
      .on('mouseout', () => {
        tooltip.style('display', 'none');
      });

    // Add legend
    const legend = svg
      .append('g')
      .attr('transform', `translate(${width - margin.right - 120}, ${margin.top + 20})`);

    legend
      .append('rect')
      .attr('width', 110)
      .attr('height', (kmeansResult.k + 1) * 25 + 10)
      .attr('fill', '#f9fafb')
      .attr('stroke', '#d1d5db')
      .attr('rx', 4);

    legend
      .append('text')
      .attr('x', 55)
      .attr('y', 15)
      .attr('text-anchor', 'middle')
      .style('font-size', '12px')
      .style('font-weight', 'bold')
      .text('Clusters');

    // Cluster legend items
    for (let i = 0; i < kmeansResult.k; i++) {
      const clusterCount = dataPoints.filter(d => d.cluster === i).length;
      const legendItem = legend
        .append('g')
        .attr('transform', `translate(10, ${25 + i * 20})`);

      legendItem
        .append('circle')
        .attr('cx', 8)
        .attr('cy', 0)
        .attr('r', 4)
        .attr('fill', colorScale(i.toString()));

      legendItem
        .append('text')
        .attr('x', 20)
        .attr('y', 4)
        .style('font-size', '11px')
        .text(`Cluster ${i} (${clusterCount})`);
    }

    // Add centroid legend
    const centroidLegend = legend
      .append('g')
      .attr('transform', `translate(10, ${25 + kmeansResult.k * 20})`);

    centroidLegend
      .append('polygon')
      .attr('points', '8,-4 12,0 8,4 4,0')
      .attr('fill', '#666')
      .attr('stroke', '#000');

    centroidLegend
      .append('text')
      .attr('x', 20)
      .attr('y', 4)
      .style('font-size', '11px')
      .text('Centroids');

  }, [kmeansResult, preprocessResult]);

  return (
    <div className="w-full">
      {/* Instructions */}
      <div className="mb-4 p-3 bg-blue-50 rounded-lg border-l-4 border-blue-400">
        <p className="text-sm text-blue-800">
          <strong>💡 Interaction Tips:</strong> Use mouse wheel to zoom, drag to pan, or use the zoom controls (+/-/⌂) to explore stacked data points in detail.
        </p>
      </div>

      <svg ref={svgRef}></svg>

      {/* Summary Statistics */}
      <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-blue-50 p-4 rounded-lg">
          <p className="text-sm text-blue-600 font-medium">Total Data Points</p>
          <p className="text-2xl font-bold text-blue-900">
            {preprocessResult.X.length}
          </p>
        </div>
        <div className="bg-green-50 p-4 rounded-lg">
          <p className="text-sm text-green-600 font-medium">Number of Clusters</p>
          <p className="text-2xl font-bold text-green-900">
            {kmeansResult.k}
          </p>
        </div>
        <div className="bg-purple-50 p-4 rounded-lg">
          <p className="text-sm text-purple-600 font-medium">Inertia (WCSS)</p>
          <p className="text-2xl font-bold text-purple-900">
            {kmeansResult.inertia.toFixed(2)}
          </p>
        </div>
      </div>

      {/* Cluster Distribution */}
      <div className="mt-6">
        <h4 className="font-medium text-gray-900 mb-3">Cluster Distribution</h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {Array.from({ length: kmeansResult.k }, (_, i) => {
            const clusterPoints = kmeansResult.labels.filter(label => label === i).length;
            const percentage = ((clusterPoints / kmeansResult.labels.length) * 100).toFixed(1);
            return (
              <div key={i} className="bg-gray-50 p-3 rounded-lg">
                <div className="flex items-center mb-2">
                  <div
                    className="w-4 h-4 rounded mr-3"
                    style={{ backgroundColor: d3.scaleOrdinal(d3.schemeCategory10)(i.toString()) }}
                  />
                  <span className="font-medium">Cluster {i}</span>
                </div>
                <p className="text-sm text-gray-600">
                  {clusterPoints} points ({percentage}%)
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default KMeansClusteringChart;
