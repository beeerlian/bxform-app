import { Forms } from '@/__generated__/graphql';
import { FORM } from '@/apollo/Operations';
import Spinner from '@/components/loading/Spinner';
import PasswordProtectionModal from '@/components/modal/PasswordProtectionModal';
import { useTransformedQuery } from '@/utils/hooks';
import { useQuery } from '@apollo/client';
import { isNonEmptyArray } from '@apollo/client/utilities';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import QuestionsFillmentSection from './QuestionsFillmentSection';

const SurveyFillment: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [passwordError, setPasswordError] = useState<string | null>(null);
  const [isVerifying, setIsVerifying] = useState(false);

  const { data, loading, error, refetch } = useTransformedQuery<any, Forms>(
    useQuery(FORM.GET_BY_PUBLIC_ID, { variables: { id: id } }),
    (data) => isNonEmptyArray(data?.forms) && data?.forms[0]
  );

  // If no password is required, automatically authenticate
  useEffect(() => {
    if (data && (!data.password || data.password.trim() === '')) {
      setIsAuthenticated(true);
    }
  }, [data]);

  // Handle password submission
  const handlePasswordSubmit = (password: string) => {
    setIsVerifying(true);
    setPasswordError(null);

    // Simple timeout to simulate verification (can be removed in production)
    setTimeout(() => {
      if (data && password === data.password) {
        setIsAuthenticated(true);
        setPasswordError(null);
      } else {
        setPasswordError('Incorrect password. Please try again.');
      }
      setIsVerifying(false);
    }, 500);
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      {loading && (
        <div className="flex justify-center items-center h-64">
          <Spinner />
        </div>
      )}

      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 my-4">
          <p className="text-red-600">Error: {error.message}</p>
        </div>
      )}

      {data && data.password && !isAuthenticated && (
        <PasswordProtectionModal
          isOpen={true}
          onSubmit={handlePasswordSubmit}
          errorMessage={passwordError || undefined}
          isLoading={isVerifying}
          surveyTitle={data.title}
        />
      )}

      {data && isAuthenticated && (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="border-b pb-4 mb-6">
            <h1 className="text-2xl font-bold text-gray-800">{data?.title}</h1>
          </div>
          <QuestionsFillmentSection
            questions={data.questions}
            quissionareId={data.id}
            refetch={refetch}
          />
        </div>
      )}
    </div>
  );
};

export default SurveyFillment;
