import { Forms } from '@/__generated__/graphql';
import { FORM } from '@/apollo/Operations';
import QuestionnareStatusChip from '@/components/QuestionnareStatusChip';
import { useQuery } from '@apollo/client';
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import AnalysisSection from './AnalysisSection';
import QuestionsSection from './QuestionsSection';
import ResponsesSection from './ResponsesSection';
import SettingsSection from './SettingsSection';

const QuestionnaireDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  const { data, loading, error, refetch } = useQuery<{ forms_by_pk: Forms }>(FORM.GET_BY_ID, {
    variables: {
      id: id,
    },
  });

  const [activeTab, setActiveTab] = useState('questions');

  return (
    <div className="w">
      <div className="flex justify-between items-center mb-4">
        {data && <p className="text-xl font-semibold mb-4">{data.forms_by_pk.title}</p>}
        {data?.forms_by_pk.status && <QuestionnareStatusChip status={data!.forms_by_pk.status} />}
      </div>
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
          className={`mr-2 px-4 py-2 ${
            activeTab === 'analysis' ? 'bg-blue-500 text-white' : 'bg-gray-200'
          }`}
          onClick={() => setActiveTab('analysis')}
        >
          Analysis
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
            <QuestionsSection
              quissionareId={data.forms_by_pk.id}
              questions={data.forms_by_pk.questions ?? []}
              refetch={refetch}
            />
          )}
          {activeTab === 'responses' && <ResponsesSection responses={[]} questions={[]} />}
          {activeTab === 'analysis' && <AnalysisSection data={data.forms_by_pk} />}
          {activeTab === 'settings' && (
            <SettingsSection questionnaire={data.forms_by_pk} refetch={refetch} />
          )}
        </div>
      )}
    </div>
  );
};

export default QuestionnaireDetail;
