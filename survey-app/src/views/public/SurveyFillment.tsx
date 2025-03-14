import { Forms } from '@/__generated__/graphql';
import { FORM } from '@/apollo/Operations';
import Spinner from '@/components/Spinner';
import { useTransformedQuery } from '@/utils/hooks';
import { useQuery } from '@apollo/client';
import { isNonEmptyArray } from '@apollo/client/utilities';
import React from 'react';
import { useParams } from 'react-router-dom';
import QuestionsFillmentSection from './QuestionsFillmentSection';

const SurveyFillment: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  const { data, loading, error, refetch } = useTransformedQuery<any, Forms>(
    useQuery(FORM.GET_BY_PUBLIC_ID, { variables: { id: id } }),
    (data) => isNonEmptyArray(data?.forms) && data?.forms[0]
  );

  return (
    <div>
      {loading && (
        <div className="flex justify-center items-center h-64">
          <Spinner />
        </div>
      )}
      {error && <p>Error: {error.message}</p>}
      {data && (
        <div>
          <p className="text-xl font-semibold mb-4">{data?.title}</p>
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
