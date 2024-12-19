import React from 'react';

// const GET_SURVEYS = gql`
//   query GetSurveys {
//     surveys {
//       id
//       title
//     }
//   }
// `;


const data = {
  surveys: [
    {
      id: "1",
      title: "Customer Satisfication",
    },
    {
      id: '2',
      title: "Student Satisfication",
    },
  ]
}

const SurveyList: React.FC = () => {
  // const { loading, error, data } = useQuery(GET_SURVEYS);

  // if (loading) return <p>Loading...</p>;
  // if (error) return <p>Error: {error.message}</p>;

  return (
    <ul className="list-disc pl-4">
      {data.surveys.map((survey: { id: string; title: string }) => (
        <li key={survey.id}>{survey.title}</li>
      ))}
    </ul>
  );
};

export default SurveyList;

