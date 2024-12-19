import { useQuery } from '@apollo/client';
import { Forms } from '@/__generated__/graphql';
import { FORM } from '@/apollo/Operations';
import React from 'react';
import { Link } from 'react-router-dom';

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
  const { data, loading, error } = useQuery<{ forms: Forms[] }>(FORM.GET_LIST, {
    variables: {
      where: {
        status: { _eq: status },
      },
    },
  });
  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">{title}</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {loading && <p>Loading...</p>}
        {error && <p>Error: {error.message}</p>}
        {data &&
          data.forms.map((quissionare) => (
            <Link
              key={quissionare.id}
              to={`/admin/questionnaire/${quissionare.id}`}
              className="block p-4 border rounded-lg hover:bg-gray-100"
            >
              <h3 className="font-semibold">{quissionare.title}</h3>
            </Link>
          ))}
      </div>
    </div>
  );
};

export default AdminListSurvey;
