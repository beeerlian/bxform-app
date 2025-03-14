import { Forms } from '@/__generated__/graphql';
import * as d3 from 'd3';
import React from 'react';

interface Props {
  data: Forms;
}

const BarChart: React.FC<Props> = ({ data }) => {
  React.useEffect(() => {
    // Chart Bar
    const barChartSvg = d3.select('#barchart').append('svg').attr('width', 500).attr('height', 500);

    // Example bar chart data
    const barChartData = [10, 20, 30, 40, 50];

    // Create bar chart
    barChartSvg
      .selectAll('rect')
      .data(barChartData)
      .enter()
      .append('rect')
      .attr('x', (d, i) => i * 60)
      .attr('y', (d) => 500 - d * 10)
      .attr('width', 50)
      .attr('height', (d) => d * 10)
      .attr('fill', 'blue');
  }, [data]);

  return <div id="barchart"></div>;
};

export default BarChart;
