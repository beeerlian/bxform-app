import { dummyIPAData } from '@/utils/dummy';
import * as d3 from 'd3';
import React, { useEffect, useRef } from 'react';

interface DataPoint {
  attribute: string;
  importance: number;
  performance: number;
}

const IPAChart: React.FC = () => {
  const svgRef = useRef<SVGSVGElement | null>(null);

  useEffect(() => {
    const svg = d3.select(svgRef.current);
    const width = 800;
    const height = 600;
    const margin = { top: 50, right: 50, bottom: 50, left: 50 };

    svg.attr('width', width).attr('height', height);

    const xScale = d3
      .scaleLinear()
      .domain([0, 10])
      .range([margin.left, width - margin.right]);
    const yScale = d3
      .scaleLinear()
      .domain([0, 10])
      .range([height - margin.bottom, margin.top]);

    const xAxis = d3.axisBottom(xScale);
    const yAxis = d3.axisLeft(yScale);

    svg
      .append('g')
      .attr('transform', `translate(0,${height - margin.bottom})`)
      .call(xAxis);
    svg.append('g').attr('transform', `translate(${margin.left},0)`).call(yAxis);

    svg
      .append('text')
      .attr('x', width / 2)
      .attr('y', margin.top / 2)
      .attr('text-anchor', 'middle')
      .style('font-size', '16px')
      .text('Importance-Performance Analysis');

    svg
      .append('text')
      .attr('x', width / 2)
      .attr('y', height - margin.bottom / 4)
      .attr('text-anchor', 'middle')
      .style('font-size', '12px')
      .text('Performance');

    svg
      .append('text')
      .attr('transform', 'rotate(-90)')
      .attr('x', -height / 2)
      .attr('y', margin.left / 4)
      .attr('text-anchor', 'middle')
      .style('font-size', '12px')
      .text('Importance');

    const meanImportance = d3.mean(dummyIPAData, (d) => d.importance) || 5;
    const meanPerformance = d3.mean(dummyIPAData, (d) => d.performance) || 5;

    svg
      .append('line')
      .attr('x1', xScale(meanPerformance))
      .attr('x2', xScale(meanPerformance))
      .attr('y1', margin.top)
      .attr('y2', height - margin.bottom)
      .attr('stroke', 'black')
      .attr('stroke-dasharray', '4');

    svg
      .append('line')
      .attr('x1', margin.left)
      .attr('x2', width - margin.right)
      .attr('y1', yScale(meanImportance))
      .attr('y2', yScale(meanImportance))
      .attr('stroke', 'black')
      .attr('stroke-dasharray', '4');

    const tooltip = d3
      .select('body')
      .append('div')
      .attr('class', 'tooltip')
      .style('position', 'absolute')
      .style('background', '#fff')
      .style('border', '1px solid #ccc')
      .style('padding', '10px')
      .style('display', 'none');

    svg
      .selectAll('circle')
      .data(dummyIPAData)
      .enter()
      .append('circle')
      .attr('cx', (d) => xScale(d.performance))
      .attr('cy', (d) => yScale(d.importance))
      .attr('r', 5)
      .attr('fill', 'blue')
      .on('mouseover', (event, d) => {
        tooltip
          .style('display', 'block')
          .html(
            `Attribute: ${d.attribute}<br>Importance: ${d.importance.toFixed(
              2
            )}<br>Performance: ${d.performance.toFixed(2)}`
          )
          .style('left', `${event.pageX + 5}px`)
          .style('top', `${event.pageY + 5}px`);
      })
      .on('mouseout', () => {
        tooltip.style('display', 'none');
      });

    svg
      .append('text')
      .attr('x', xScale(meanPerformance) + 5)
      .attr('y', yScale(meanImportance) - 5)
      .style('font-size', '12px')
      .text('Concentrate Here');

    svg
      .append('text')
      .attr('x', xScale(meanPerformance) + 5)
      .attr('y', yScale(meanImportance) + 15)
      .style('font-size', '12px')
      .text('Keep Up the Good Work');

    svg
      .append('text')
      .attr('x', xScale(meanPerformance) - 100)
      .attr('y', yScale(meanImportance) - 5)
      .style('font-size', '12px')
      .text('Low Priority');

    svg
      .append('text')
      .attr('x', xScale(meanPerformance) - 100)
      .attr('y', yScale(meanImportance) + 15)
      .style('font-size', '12px')
      .text('Possible Overkill');
  }, []);

  return <svg ref={svgRef}></svg>;
};

export default IPAChart;
