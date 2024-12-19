import { Forms } from '@/__generated__/graphql';
import { FORM } from '@/apollo/Operations';
import { useQuery } from '@apollo/client';
import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import QuestionList from './QuestionList';
import QuestionnaireSetting from './QuestionnaireSetting';
import ResponseList from './ResponseList';

const QuestionnaireDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  const { data, loading, error } = useQuery<{ forms_by_pk: Forms }>(FORM.GET_BY_ID, {
    variables: {
      id: id,
    },
  });

  const [activeTab, setActiveTab] = useState('questions');
  const navigate = useNavigate();

  const editQuestion = () => {
    navigate(`/admin/questionnaire/${id}/edit`);
  };

  return (
    <div className="w">
      {data && <h2 className="text-xl font-semibold mb-4">{data.forms_by_pk.title}</h2>}
      <div className="mb-4">
        <button
          className={`mr-2 px-4 py-2 ${
            activeTab === 'questions' ? 'bg-blue-500 text-white' : 'bg-gray-200'
          }`}
          onClick={() => setActiveTab('questions')}
        >
          Questions
        </button>
        <button
          className={`mr-2 px-4 py-2 ${
            activeTab === 'responses' ? 'bg-blue-500 text-white' : 'bg-gray-200'
          }`}
          onClick={() => setActiveTab('responses')}
        >
          Responses
        </button>
        <button
          className={`px-4 py-2 ${
            activeTab === 'settings' ? 'bg-blue-500 text-white' : 'bg-gray-200'
          }`}
          onClick={() => setActiveTab('settings')}
        >
          Settings
        </button>
      </div>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error.message}</p>}
      {data && (
        <div>
         
          {activeTab === 'questions' && (
            <QuestionList
              quissionareId={data.forms_by_pk.id}
              questions={data.forms_by_pk.questions ?? []}
            />
          )}
          {activeTab === 'responses' && <ResponseList responses={[]} questions={[]} />}
          {activeTab === 'settings' && <QuestionnaireSetting questionnaire={data.forms_by_pk} />}
        </div>
      )}
    </div>
  );
};

export default QuestionnaireDetail;
