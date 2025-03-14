import * as d3 from 'd3';
import React, { useEffect, useState } from 'react';

interface DataPoint {
  x: number;
  y: number;
  label: string;
  cluster?: number;
}

interface Props {
  initialData: DataPoint[];
}

const KMeansClusteringChart: React.FC<Props> = () => {
  const [data, setData] = useState<DataPoint[]>(generateDummyData(100));
  const [numClusters, setNumClusters] = useState(3);

  useEffect(() => {
    let centroids: DataPoint[] = [];
    // K-Means Clustering Algorithm
    const kMeans = (data: DataPoint[], k: number) => {
      // Initialize centroids randomly
      centroids = data.slice(0, k);

      const assignClusters = () => {
        data.forEach((point) => {
          let minDist = Infinity;
          let cluster = 0;
          centroids.forEach((centroid, i) => {
            const dist = Math.hypot(point.x - centroid.x, point.y - centroid.y);
            if (dist < minDist) {
              minDist = dist;
              cluster = i;
            }
          });
          point.cluster = cluster;
        });
      };

      const updateCentroids = () => {
        centroids = centroids.map((_, i) => {
          const clusterPoints = data.filter((point) => point.cluster === i);
          const meanX = d3.mean(clusterPoints, (d) => d.x) || 0;
          const meanY = d3.mean(clusterPoints, (d) => d.y) || 0;
          return { x: meanX, y: meanY, label: '' };
        });
      };

      for (let i = 0; i < 10; i++) {
        assignClusters();
        updateCentroids();
      }

      return data;
    };

    const clusteredData = kMeans([...data], numClusters);
    setData(clusteredData);

    // D3 Visualization
    const svg = d3
      .select('#scatterplot')
      .html('')
      .append('svg')
      .attr('width', '100%')
      .attr('height', 500);
    const width = parseInt(svg.style('width'));
    const height = parseInt(svg.style('height'));

    const xScale = d3
      .scaleLinear()
      .domain([0, d3.max(data, (d) => d.x) || 100])
      .range([0, width]);
    const yScale = d3
      .scaleLinear()
      .domain([0, d3.max(data, (d) => d.y) || 100])
      .range([height, 0]);

    svg.append('g').attr('transform', `translate(0, ${height})`).call(d3.axisBottom(xScale));
    svg.append('g').call(d3.axisLeft(yScale));

    const tooltip = d3
      .select('body')
      .append('div')
      .style('position', 'absolute')
      .style('background', '#f9f9f9')
      .style('border', '1px solid #d3d3d3')
      .style('padding', '5px')
      .style('display', 'none');

    svg
      .selectAll('circle')
      .data(data)
      .enter()
      .append('circle')
      .attr('cx', (d) => xScale(d.x))
      .attr('cy', (d) => yScale(d.y))
      .attr('r', 5)
      .attr('fill', (d) => d3.schemeCategory10[d.cluster || 0])
      .on('mouseover', (event, d) => {
        tooltip
          .style('display', 'block')
          .html(`Label: ${d.label}<br/>Cluster: ${d.cluster}`)
          .style('left', `${event.pageX + 5}px`)
          .style('top', `${event.pageY - 28}px`);
      })
      .on('mouseout', () => {
        tooltip.style('display', 'none');
      });

    // Draw centroids
    svg
      .selectAll('centroid')
      .data(centroids)
      .enter()
      .append('circle')
      .attr('cx', (d) => xScale(d.x))
      .attr('cy', (d) => yScale(d.y))
      .attr('r', 10)
      .attr('fill', 'black')
      .attr('stroke', 'white')
      .attr('stroke-width', 2);
  }, [data, numClusters]);

  return (
    <div>
      <h2>K-Means Clustering</h2>
      <input
        type="number"
        value={numClusters}
        onChange={(e) => setNumClusters(Number(e.target.value))}
        min="1"
        max="10"
      />
      <div id="scatterplot"></div>
      <div id="conclusion">
        <h3>Conclusion</h3>
        <p>
          The data points have been clustered into {numClusters} clusters using the K-Means
          algorithm.
        </p>
      </div>
    </div>
  );
};

// Dummy data generation
const generateDummyData = (numPoints: number): DataPoint[] => {
  return Array.from({ length: numPoints }, () => ({
    x: Math.random() * 100,
    y: Math.random() * 100,
    label: `Label ${Math.floor(Math.random() * numPoints)}`,
  }));
};

// const dummyData = generateDummyData(100);

export default KMeansClusteringChart;
