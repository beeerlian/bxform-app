import React from 'react';

import { SurveyStatus } from '@/types/survey';
import AdminListSurvey from './AdminListSurvey';

const AdminDashboard: React.FC = () => {
  return (
    <div>
      <AdminListSurvey status={SurveyStatus.Active} title="Survey Aktif" />
      <AdminListSurvey status={SurveyStatus.Closed} title="Survey Tutup" />
      <AdminListSurvey status={SurveyStatus.Draft} title="Survey Draft" />
    </div>
  );
};

export default AdminDashboard;
