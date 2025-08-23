import { FORM } from '@/apollo/Operations';
import { useQuery } from '@apollo/client';
import React from 'react';
import ResponsesList from './components/ResponsesList';

interface ResponsesSectionProps {
  formId: string;
}

const ResponsesSection: React.FC<ResponsesSectionProps> = ({ formId }) => {
  const { data, loading, error, refetch } = useQuery(FORM.GET_FORM_RESPONSES, {
    variables: { form_id: formId },
    pollInterval: 30000, // Poll every 30 seconds for new responses
  });

  // Also get the form data to get question details
  const { data: formData, loading: formLoading } = useQuery(FORM.GET_BY_ID, {
    variables: { id: formId },
  });

  const answerSheets = data?.answer_sheets || [];
  const questions = formData?.forms_by_pk?.questions || [];

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-gray-900">Survey Responses</h2>
        <button
          onClick={() => refetch()}
          className="px-3 py-1 text-sm bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
          disabled={loading}
        >
          {loading ? 'Refreshing...' : 'Refresh'}
        </button>
      </div>

      <ResponsesList
        answerSheets={answerSheets}
        questions={questions}
        loading={loading || formLoading}
        error={error}
      />
    </div>
  );
};

export default ResponsesSection;
