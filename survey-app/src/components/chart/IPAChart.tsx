
import { IPAClusterResult } from '@/services/analytics/analytics';
import * as d3 from 'd3';
import React, { useEffect, useRef } from 'react';


const IPAChart: React.FC<{ data: IPAClusterResult }> = ({ data }) => {
  const svgRef = useRef<SVGSVGElement | null>(null);

  useEffect(() => {
    if (!data || !data.attrs || data.attrs.length === 0) return;

    // Debug: Log the complete data structure
    // console.log('=== IPA Chart Debug Info ===');
    // console.log('Cluster ID:', data.clusterId);
    // console.log('Total attributes expected: 10');
    // console.log('Actual attributes received:', data.attrs.length);
    // console.log('All attributes data:', data.attrs);

    // Check for data validity
    const validAttrs = data.attrs.filter(attr => {
      const hasValidValues =
        Number.isFinite(attr.impMean) &&
        Number.isFinite(attr.perfMean) &&
        attr.impMean !== null &&
        attr.perfMean !== null;

      if (!hasValidValues) {
        console.warn('Invalid attribute found:', attr);
      }
      return hasValidValues;
    });

    // console.log('Valid attributes after filtering:', validAttrs.length);
    // console.log('Filtered out attributes:', data.attrs.length - validAttrs.length);

    const svg = d3.select(svgRef.current);

    // Calculate data ranges with padding - use validAttrs instead of data.attrs
    const impValues = validAttrs.map(d => d.impMean);
    const perfValues = validAttrs.map(d => d.perfMean);
    const impExtent = d3.extent(impValues) as [number, number];
    const perfExtent = d3.extent(perfValues) as [number, number];

    // Debug: Log the data ranges
    // console.log('Importance range:', impExtent);
    // console.log('Performance range:', perfExtent);
    // console.log('Importance values:', impValues);
    // console.log('Performance values:', perfValues);

    // Add padding to the ranges
    const impPadding = Math.max((impExtent[1] - impExtent[0]) * 0.15, 0.5);
    const perfPadding = Math.max((perfExtent[1] - perfExtent[0]) * 0.15, 0.5);

    // Calculate dynamic canvas size based on data spread
    const dataWidth = perfExtent[1] - perfExtent[0] + (perfPadding * 2);
    const dataHeight = impExtent[1] - impExtent[0] + (impPadding * 2);

    // Set minimum and maximum canvas dimensions
    const minWidth = 600;
    const maxWidth = 1400;
    const minHeight = 500;
    const maxHeight = 1200;

    // Calculate optimal canvas size based on data spread
    const aspectRatio = dataWidth / dataHeight;
    let width, height;

    if (aspectRatio > 1) {
      // Wider data - base on width
      width = Math.min(Math.max(minWidth, dataWidth * 80), maxWidth);
      height = Math.min(Math.max(minHeight, width / aspectRatio), maxHeight);
    } else {
      // Taller data - base on height
      height = Math.min(Math.max(minHeight, dataHeight * 80), maxHeight);
      width = Math.min(Math.max(minWidth, height * aspectRatio), maxWidth);
    }

    // Dynamic margins based on canvas size
    const margin = {
      top: Math.max(80, height * 0.12),
      right: Math.max(80, width * 0.1),
      bottom: Math.max(80, height * 0.12),
      left: Math.max(80, width * 0.1)
    };

    // console.log('Dynamic canvas size:', { width, height, margin, aspectRatio, dataSpread: { dataWidth, dataHeight } });

    // Clear previous content
    svg.selectAll('*').remove();

    svg.attr('width', width).attr('height', height); const xScale = d3
      .scaleLinear()
      .domain([perfExtent[0] - perfPadding, perfExtent[1] + perfPadding])
      .range([margin.left, width - margin.right]);

    const yScale = d3
      .scaleLinear()
      .domain([impExtent[0] - impPadding, impExtent[1] + impPadding])
      .range([height - margin.bottom, margin.top]);

    // Calculate global means for quadrant dividers - use validAttrs
    const meanImportance = d3.mean(validAttrs, (d) => d.impMean) || 0;
    const meanPerformance = d3.mean(validAttrs, (d) => d.perfMean) || 0;

    // Debug: Log means and scale domains
    // console.log('Mean importance:', meanImportance);
    // console.log('Mean performance:', meanPerformance);
    // console.log('X scale domain:', [perfExtent[0] - perfPadding, perfExtent[1] + perfPadding]);
    // console.log('Y scale domain:', [impExtent[0] - impPadding, impExtent[1] + impPadding]);

    // Create zoom behavior
    const zoom = d3.zoom<SVGSVGElement, unknown>()
      .scaleExtent([0.1, 10])
      .on('zoom', (event) => {
        const transform = event.transform;

        // Update scales with zoom transform
        const newXScale = transform.rescaleX(xScale);
        const newYScale = transform.rescaleY(yScale);

        // Update axes
        svg.select('.x-axis')
          .call(d3.axisBottom(newXScale) as any);

        svg.select('.y-axis')
          .call(d3.axisLeft(newYScale) as any);

        // Update plot area transform
        plotArea.attr('transform', transform.toString());
      });

    // Create plot area group for zoomable content
    const plotArea = svg.append('g').attr('class', 'plot-area');

    // Draw quadrant backgrounds in plot area

    // Quadrant 1: High Importance, Low Performance (Concentrate Here) - Red
    plotArea.append('rect')
      .attr('x', margin.left)
      .attr('y', margin.top)
      .attr('width', xScale(meanPerformance) - margin.left)
      .attr('height', yScale(meanImportance) - margin.top)
      .attr('fill', '#fef2f2')
      .attr('stroke', '#f87171')
      .attr('stroke-width', 1)
      .attr('opacity', 0.3);

    // Quadrant 2: High Importance, High Performance (Keep Up Good Work) - Green
    plotArea.append('rect')
      .attr('x', xScale(meanPerformance))
      .attr('y', margin.top)
      .attr('width', width - margin.right - xScale(meanPerformance))
      .attr('height', yScale(meanImportance) - margin.top)
      .attr('fill', '#f0fdf4')
      .attr('stroke', '#4ade80')
      .attr('stroke-width', 1)
      .attr('opacity', 0.3);

    // Quadrant 3: Low Importance, Low Performance (Low Priority) - Yellow
    plotArea.append('rect')
      .attr('x', margin.left)
      .attr('y', yScale(meanImportance))
      .attr('width', xScale(meanPerformance) - margin.left)
      .attr('height', height - margin.bottom - yScale(meanImportance))
      .attr('fill', '#fefce8')
      .attr('stroke', '#facc15')
      .attr('stroke-width', 1)
      .attr('opacity', 0.3);

    // Quadrant 4: Low Importance, High Performance (Possible Overkill) - Blue
    plotArea.append('rect')
      .attr('x', xScale(meanPerformance))
      .attr('y', yScale(meanImportance))
      .attr('width', width - margin.right - xScale(meanPerformance))
      .attr('height', height - margin.bottom - yScale(meanImportance))
      .attr('fill', '#eff6ff')
      .attr('stroke', '#3b82f6')
      .attr('stroke-width', 1)
      .attr('opacity', 0.3);

    // Draw quadrant divider lines in plot area
    plotArea
      .append('line')
      .attr('x1', xScale(meanPerformance))
      .attr('x2', xScale(meanPerformance))
      .attr('y1', margin.top)
      .attr('y2', height - margin.bottom)
      .attr('stroke', '#374151')
      .attr('stroke-width', 2)
      .attr('stroke-dasharray', '5,5');

    plotArea
      .append('line')
      .attr('x1', margin.left)
      .attr('x2', width - margin.right)
      .attr('y1', yScale(meanImportance))
      .attr('y2', yScale(meanImportance))
      .attr('stroke', '#374151')
      .attr('stroke-width', 2)
      .attr('stroke-dasharray', '5,5');

    // Draw axes (non-zoomable)
    const xAxis = d3.axisBottom(xScale);
    const yAxis = d3.axisLeft(yScale);

    svg
      .append('g')
      .attr('class', 'x-axis')
      .attr('transform', `translate(0,${height - margin.bottom})`)
      .call(xAxis);

    svg
      .append('g')
      .attr('class', 'y-axis')
      .attr('transform', `translate(${margin.left},0)`)
      .call(yAxis);

    // Apply zoom to SVG
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

    // Add title
    svg
      .append('text')
      .attr('x', width / 2)
      .attr('y', margin.top / 2)
      .attr('text-anchor', 'middle')
      .style('font-size', '18px')
      .style('font-weight', 'bold')
      .style('fill', '#1f2937')
      .text(`IPA Analysis - Cluster ${data.clusterId} (${validAttrs.length}/${data.attrs.length} attributes shown)`);

    // Add debug info as subtitle if there are missing attributes
    if (validAttrs.length !== data.attrs.length) {
      svg
        .append('text')
        .attr('x', width / 2)
        .attr('y', margin.top / 2 + 20)
        .attr('text-anchor', 'middle')
        .style('font-size', '12px')
        .style('fill', '#ef4444')
        .text(`⚠️ ${data.attrs.length - validAttrs.length} attributes have invalid data`);
    }

    // Add axis labels
    svg
      .append('text')
      .attr('x', width / 2)
      .attr('y', height - margin.bottom / 3)
      .attr('text-anchor', 'middle')
      .style('font-size', '14px')
      .style('font-weight', '500')
      .style('fill', '#374151')
      .text('Performance →');

    svg
      .append('text')
      .attr('transform', 'rotate(-90)')
      .attr('x', -height / 2)
      .attr('y', margin.left / 3)
      .attr('text-anchor', 'middle')
      .style('font-size', '14px')
      .style('font-weight', '500')
      .style('fill', '#374151')
      .text('← Importance');

    // Create tooltip
    const tooltip = d3
      .select('body')
      .selectAll('.ipa-tooltip')
      .data([null])
      .join('div')
      .attr('class', 'ipa-tooltip')
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

    // Function to get color based on quadrant
    const getQuadrantColor = (quadrant: number) => {
      switch (quadrant) {
        case 1: return '#ef4444'; // Red - Concentrate Here
        case 2: return '#22c55e'; // Green - Keep Up Good Work
        case 3: return '#eab308'; // Yellow - Low Priority
        case 4: return '#3b82f6'; // Blue - Possible Overkill
        default: return '#6b7280'; // Gray - Default
      }
    };

    const getQuadrantName = (quadrant: number) => {
      switch (quadrant) {
        case 1: return 'Concentrate Here';
        case 2: return 'Keep Up Good Work';
        case 3: return 'Low Priority';
        case 4: return 'Possible Overkill';
        default: return 'Unknown';
      }
    };

    // Detect overlapping points and create position adjustments
    const pointAdjustments = new Map();
    const positionCounts = new Map();

    // First pass: count positions
    validAttrs.forEach(d => {
      const x = xScale(d.perfMean);
      const y = yScale(d.impMean);
      const key = `${x.toFixed(1)},${y.toFixed(1)}`;
      const count = (positionCounts.get(key) || 0) + 1;
      positionCounts.set(key, count);
    });

    // Second pass: create adjustments for overlapping points
    const processedPositions = new Map();
    validAttrs.forEach(d => {
      const x = xScale(d.perfMean);
      const y = yScale(d.impMean);
      const key = `${x.toFixed(1)},${y.toFixed(1)}`;

      if (positionCounts.get(key) > 1) {
        // Multiple points at same position - add jitter
        const processed = processedPositions.get(key) || 0;
        const jitterRadius = 8; // pixels
        const angle = (processed / positionCounts.get(key)) * 2 * Math.PI;
        const jitterX = Math.cos(angle) * jitterRadius;
        const jitterY = Math.sin(angle) * jitterRadius;

        pointAdjustments.set(d, { x: x + jitterX, y: y + jitterY });
        processedPositions.set(key, processed + 1);
      } else {
        // Single point at position - no adjustment needed
        pointAdjustments.set(d, { x, y });
      }
    });

    // Draw data points in plot area - use validAttrs with jitter
    const circles = plotArea
      .selectAll('circle.data-point')
      .data(validAttrs)
      .enter()
      .append('circle')
      .attr('class', 'data-point')
      .attr('cx', (d) => {
        const pos = pointAdjustments.get(d);
        return pos.x;
      })
      .attr('cy', (d) => {
        const pos = pointAdjustments.get(d);
        return pos.y;
      })
      .attr('r', 6)
      .attr('fill', (d) => getQuadrantColor(d.quadrant))
      .attr('stroke', '#fff')
      .attr('stroke-width', 2)
      .style('cursor', 'pointer')
      .style('opacity', 0.8)
      .on('mouseover', (event, d) => {
        // Highlight the hovered point
        d3.select(event.currentTarget)
          .attr('r', 8)
          .style('opacity', 1);

        tooltip
          .style('display', 'block')
          .html(
            `<strong>${d.attributeQuestionContent || d.attributeQuestionId || 'Attribute'}</strong><br/>
             Importance: ${d.impMean.toFixed(2)}<br/>
             Performance: ${d.perfMean.toFixed(2)}<br/>
             Gap: ${d.gap.toFixed(2)}<br/>
             <span style="color: ${getQuadrantColor(d.quadrant)}; font-weight: bold;">
               ${getQuadrantName(d.quadrant)}
             </span>`
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


    // Check for overlapping points before jitter
    const originalPositions = validAttrs.map(d => ({
      x: xScale(d.perfMean),
      y: yScale(d.impMean),
      attr: d.attributeQuestionContent || d.attributeQuestionId
    }));

    const uniquePositions = new Map();
    originalPositions.forEach(pos => {
      const key = `${pos.x.toFixed(1)},${pos.y.toFixed(1)}`;
      if (!uniquePositions.has(key)) {
        uniquePositions.set(key, []);
      }
      uniquePositions.get(key).push(pos.attr);
    });

    let overlapCount = 0;
    uniquePositions.forEach((attrs, position) => {
      if (attrs.length > 1) {
        overlapCount += attrs.length;
      } else {
      }
    });
    // Log final jittered positions
    validAttrs.forEach(d => {
      const pos = pointAdjustments.get(d);
    });

    // Add quadrant labels in plot area
    const labelOffset = 15;

    plotArea
      .append('text')
      .attr('x', margin.left + labelOffset)
      .attr('y', margin.top + labelOffset)
      .style('font-size', '12px')
      .style('font-weight', 'bold')
      .style('fill', '#ef4444')
      .text('Concentrate Here');

    plotArea
      .append('text')
      .attr('x', width - margin.right - 120)
      .attr('y', margin.top + labelOffset)
      .style('font-size', '12px')
      .style('font-weight', 'bold')
      .style('fill', '#22c55e')
      .text('Keep Up Good Work');

    plotArea
      .append('text')
      .attr('x', margin.left + labelOffset)
      .attr('y', height - margin.bottom - labelOffset)
      .style('font-size', '12px')
      .style('font-weight', 'bold')
      .style('fill', '#eab308')
      .text('Low Priority');

    plotArea
      .append('text')
      .attr('x', width - margin.right - 100)
      .attr('y', height - margin.bottom - labelOffset)
      .style('font-size', '12px')
      .style('font-weight', 'bold')
      .style('fill', '#3b82f6')
      .text('Possible Overkill');

  }, [data]);

  return (
    <div className="w-full">
      {/* Instructions */}
      <div className="mb-4 p-3 bg-indigo-50 rounded-lg border-l-4 border-indigo-400">
        <p className="text-sm text-indigo-800">
          <strong>💡 Interaction Tips:</strong> Use mouse wheel to zoom, drag to pan, or use the zoom controls (+/-/⌂) to explore the IPA quadrants in detail.
        </p>
      </div>

      <svg ref={svgRef}></svg>
    </div>
  );
};

export default IPAChart;
