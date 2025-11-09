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

const KMeansClusteringChart: React.FC<Props> = ({ initialData }) => {
  const [data, setData] = useState<DataPoint[]>(initialData);
  const [numClusters, setNumClusters] = useState(3);

  useEffect(() => {
    // Generate fresh data or use existing data without causing re-render loop
    const currentData = data.length > 0 ? [...data] : initialData;

    let centroids: DataPoint[] = [];

    // K-Means Clustering Algorithm
    const kMeans = (inputData: DataPoint[], k: number) => {
      // Initialize centroids randomly
      centroids = inputData.slice(0, k);

      const assignClusters = () => {
        inputData.forEach((point) => {
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
          const clusterPoints = inputData.filter((point) => point.cluster === i);
          const meanX = d3.mean(clusterPoints, (d) => d.x) || 0;
          const meanY = d3.mean(clusterPoints, (d) => d.y) || 0;
          return { x: meanX, y: meanY, label: '' };
        });
      };

      for (let i = 0; i < 10; i++) {
        assignClusters();
        updateCentroids();
      }

      return inputData;
    };

    const clusteredData = kMeans(currentData, numClusters);

    // Only update state if data has actually changed to prevent infinite loops
    if (JSON.stringify(clusteredData) !== JSON.stringify(data)) {
      setData(clusteredData);
    }

    // Clean up any existing tooltip
    d3.select('body').selectAll('.kmeans-tooltip').remove();

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
      .domain([0, d3.max(clusteredData, (d) => d.x) || 100])
      .range([0, width]);
    const yScale = d3
      .scaleLinear()
      .domain([0, d3.max(clusteredData, (d) => d.y) || 100])
      .range([height, 0]);

    svg.append('g').attr('transform', `translate(0, ${height})`).call(d3.axisBottom(xScale));
    svg.append('g').call(d3.axisLeft(yScale));

    const tooltip = d3
      .select('body')
      .append('div')
      .attr('class', 'kmeans-tooltip')
      .style('position', 'absolute')
      .style('background', '#f9f9f9')
      .style('border', '1px solid #d3d3d3')
      .style('padding', '5px')
      .style('display', 'none')
      .style('pointer-events', 'none');

    svg
      .selectAll('circle')
      .data(clusteredData)
      .enter()
      .append('circle')
      .attr('cx', (d) => xScale(d.x))
      .attr('cy', (d) => yScale(d.y))
      .attr('r', 5)
      .attr('fill', (d) => d3.schemeCategory10[d.cluster || 0])
      .on('mouseover', (event, d) => {
        tooltip
          .style('display', 'block')
          .html(`${d.label}`)
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

    // Cleanup function to remove tooltip when component unmounts
    return () => {
      d3.select('body').selectAll('.kmeans-tooltip').remove();
    };
  }, [numClusters]); // Remove 'data' from dependencies to prevent infinite loop

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
