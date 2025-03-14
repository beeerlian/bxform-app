import { Forms } from '@/__generated__/graphql';
import { FORM } from '@/apollo/Operations';
import { useQuery } from '@apollo/client';
import React from 'react';
import { useNavigate } from 'react-router-dom';

// const dummyQuestionnaires = [
//   { id: '1', title: 'Customer Satisfaction Survey' },
//   { id: '2', title: 'Employee Engagement Survey' },
//   { id: '3', title: 'Product Feedback Survey' },
// ];

export type AdminListSurveyProps = {
  status: number;
  title: string;
};

const AdminListSurvey: React.FC<AdminListSurveyProps> = ({ status, title }) => {

  const navigate = useNavigate();

  const { data, loading, error } = useQuery<{ forms: Forms[] }>(FORM.GET_LIST, {
    variables: {
      where: {
        status: { _eq: status },
      },
    },
  });
  return (
    <div className='mt-8'>
      <h2 className="text-xl font-semibold mb-4">{title}</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {loading && <p>Loading...</p>}
        {error && <p>Error: {error.message}</p>}
        {data &&
          data.forms.map((quissionare) => (
            <div
              key={quissionare.id}
              onClick={() => navigate(`/admin/questionnaire/${quissionare.id}`)}
              className="block p-4 border rounded-lg hover:bg-gray-100"
            >
              <h3 className="font-semibold">{quissionare.title}</h3>
            </div>
          ))}
      </div>
    </div>
  );
};

export default AdminListSurvey;
