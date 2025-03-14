import { Forms } from '@/__generated__/graphql';
import * as d3 from 'd3';
import React from 'react';

interface Props {
  data: Forms;
}

const HeatmapChart: React.FC<Props> = ({ data }) => {
  React.useEffect(() => {
    // Heat Map Section
    const margin = { top: 50, right: 50, bottom: 50, left: 50 };
    const width = 500 - margin.left - margin.right;
    const height = 500 - margin.top - margin.bottom;

    d3.select('#heatmap').selectAll('*').remove();
    const heatMapSvg = d3
      .select('#heatmap')
      .append('svg')
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom)
      .append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`);

    // Example heatmap data
    const heatmapData = [
      { x: 1, y: 1, value: 10 },
      { x: 1, y: 2, value: 20 },
      { x: 2, y: 1, value: 30 },
      { x: 2, y: 2, value: 40 },
      { x: 1, y: 3, value: 15 },
      { x: 1, y: 4, value: 25 },
      { x: 1, y: 5, value: 35 },
      { x: 2, y: 3, value: 45 },
      { x: 2, y: 4, value: 5 },
      { x: 2, y: 5, value: 55 },
      { x: 3, y: 1, value: 65 },
      { x: 3, y: 2, value: 75 },
      { x: 3, y: 3, value: 85 },
      { x: 3, y: 4, value: 95 },
      { x: 3, y: 5, value: 10 },
      { x: 4, y: 1, value: 20 },
      { x: 4, y: 2, value: 30 },
      { x: 4, y: 3, value: 40 },
      { x: 4, y: 4, value: 50 },
      { x: 4, y: 5, value: 60 },
      { x: 5, y: 1, value: 70 },
      { x: 5, y: 2, value: 80 },
      { x: 5, y: 3, value: 90 },
      { x: 5, y: 4, value: 100 },
      { x: 5, y: 5, value: 15 },
      { x: 6, y: 1, value: 25 },
      { x: 6, y: 2, value: 35 },
      { x: 6, y: 3, value: 45 },
      { x: 6, y: 4, value: 55 },
      { x: 6, y: 5, value: 65 },
      { x: 7, y: 1, value: 75 },
      { x: 7, y: 2, value: 85 },
      { x: 7, y: 3, value: 95 },
      { x: 7, y: 4, value: 10 },
      { x: 7, y: 5, value: 20 },
      { x: 8, y: 1, value: 30 },
      { x: 8, y: 2, value: 40 },
      { x: 8, y: 3, value: 50 },
      { x: 8, y: 4, value: 60 },
      { x: 8, y: 5, value: 70 },
      { x: 9, y: 1, value: 80 },
      { x: 9, y: 2, value: 90 },
      { x: 9, y: 3, value: 100 },
      { x: 9, y: 4, value: 15 },
      { x: 9, y: 5, value: 25 },
      { x: 10, y: 1, value: 35 },
      { x: 10, y: 2, value: 45 },
      { x: 10, y: 3, value: 55 },
      { x: 10, y: 4, value: 65 },
      { x: 10, y: 5, value: 75 },
    ];

    // Create scales
    const xScale = d3.scaleBand().domain(d3.range(1, 11).map(String)).range([0, width]);
    const yScale = d3.scaleBand().domain(d3.range(1, 6).map(String)).range([height, 0]);

    // Create axes
    heatMapSvg.append('g').attr('transform', `translate(0,${height})`).call(d3.axisBottom(xScale));
    heatMapSvg.append('g').call(d3.axisLeft(yScale));

    // Add labels
    heatMapSvg
      .append('text')
      .attr('text-anchor', 'end')
      .attr('x', width / 2 + margin.left)
      .attr('y', height + margin.top - 10)
      .text('X Axis');

    heatMapSvg
      .append('text')
      .attr('text-anchor', 'end')
      .attr('transform', 'rotate(-90)')
      .attr('y', -margin.left + 20)
      .attr('x', -height / 2 + margin.top)
      .text('Y Axis');

    // Create tooltip
    const tooltip = d3
      .select('body')
      .append('div')
      .style('position', 'absolute')
      .style('background', '#fff')
      .style('border', '1px solid #ccc')
      .style('padding', '5px')
      .style('display', 'none');

    // Create heatmap
    heatMapSvg
      .selectAll('rect')
      .data(heatmapData)
      .enter()
      .append('rect')
      .attr('x', (d) => xScale(String(d.x))!)
      .attr('y', (d) => yScale(String(d.y))!)
      .attr('width', xScale.bandwidth())
      .attr('height', yScale.bandwidth())
      .attr('fill', (d) => d3.interpolateBlues(d.value / 100))
      .on('mouseover', (event, d) => {
        tooltip
          .style('display', 'block')
          .html(`x: ${d.x}<br>y: ${d.y}<br>value: ${d.value}`)
          .style('left', `${event.pageX + 5}px`)
          .style('top', `${event.pageY - 28}px`);
      })
      .on('mouseout', () => {
        tooltip.style('display', 'none');
      });
  }, [data]);

  return <div id="heatmap"></div>;
};

export default HeatmapChart;
