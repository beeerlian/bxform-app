import { Forms } from '@/__generated__/graphql';
import HeatmapChart from '@/components/chart/HeatmapChart';
import IPAChart from '@/components/chart/IPAChart';
import KMeansClusteringChart from '@/components/chart/KMeansClusteringChart';
import React from 'react';

interface Props {
  data: Forms;
}

const AnalysisSection: React.FC<Props> = ({ data }) => {
  return (
    <div className="space-y-4">
      <HeatmapChart data={data} />
      <IPAChart />
      <KMeansClusteringChart initialData={[]} />
    </div>
  );
};

export default AnalysisSection;
