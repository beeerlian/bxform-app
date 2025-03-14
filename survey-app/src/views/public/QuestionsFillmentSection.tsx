import { Questions } from '@/__generated__/graphql';
import { QUESTION_ANSWER } from '@/apollo/Operations';
import EssaiOption from '@/components/EssaiOptions';
import IpaOption from '@/components/IPAOptions';
import MultipleOption from '@/components/MultipleOptions';
import QuestionTypeChip from '@/components/QuestionTypeChip';
import RatioOption from '@/components/RatioOptions';
import Spinner from '@/components/Spinner';
import { OptionType } from '@/types/dto-types';
import { convertQuestionToFormFillment } from '@/utils/quissionare.util';
import { useMutation } from '@apollo/client';
import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { FaPlus } from 'react-icons/fa';
import { toast } from 'react-toastify';

interface Props {
  questions: Questions[];
  quissionareId: string;
  refetch: (variables?: Partial<any> | undefined) => Promise<any>;
}

const QuestionsFillmentSection: React.FC<Props> = ({ questions, quissionareId, refetch }) => {
  const [sumbitAnswers, sumbitAnswersState] = useMutation(QUESTION_ANSWER.SUBMIT);
  const {
    control,
    handleSubmit,
    register,
    formState: { errors },
    watch,
  } = useForm({
    defaultValues: {
      questions: convertQuestionToFormFillment(questions),
    },
  });

  const renderQuestion = (question: Questions, index: number) => {
    switch (question.option?.type as OptionType) {
      case 'Multiple':
        return (
          <MultipleOption
            data={question.option}
            fieldData={{
              name: `questions.${index}`,
              control,
            }}
          />
        );
      case 'Ratio':
        return (
          <RatioOption
            data={question.option}
            fieldData={{
              name: `questions.${index}`,
              control,
            }}
          />
        );

      case 'Importance Performance':
        return (
          <IpaOption
            data={question.option}
            fieldData={{
              name: `questions.${index}`,
              control,
            }}
          />
        );
      case 'Essai':
        return (
          <EssaiOption data={question.option} fieldData={{ name: `questions.${index}`, control }} />
        );
      default:
        return null;
    }
  };

  const onSubmit = (data: any) => {
    console.log(data);
    try {
      sumbitAnswers({
        variables: {
          objects: data.questions.map((question: any, index: number) => ({
            question_id: question.id,
            form_id: quissionareId,
            user_id: 'a96fdcb2-4c4d-49a9-a227-dad5512fc60a',
            answer: question.answer,
          })),
        },
      });
    } catch (error) {
      toast.error('Failed to submit answers');
    }
  };

  useEffect(() => {
    if (!sumbitAnswersState.loading && sumbitAnswersState.data) {
      toast.success('Answers submitted successfully');
      refetch();
    } else if (sumbitAnswersState.error) {
      toast.error('Failed to submit answers');
    }
  }, [sumbitAnswersState]);

  return (
    <div className="space-y-4">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {questions.map((question, index) => (
          <div key={question.id} className="flex flex-row gap-2">
            <div className="border p-4 rounded w-full">
              <div className="flex gap-2 justify-end">
                {question.required == true && (
                  <div className="flex items-center justify-center px-2 rounded bg-red-100 text-red-500 text-xs">
                    Required
                  </div>
                )}
                <QuestionTypeChip type={question.option?.type} />
              </div>
              <h2 className="font-semibold mb-2">{question.content}</h2>
              {renderQuestion(question, index)}
              {errors.questions && (
                <p className="text-red-500 text-sm">{errors?.questions.message?.toString()}</p>
              )}
            </div>
          </div>
        ))}
        <div className="flex justify-end">
          <button
            key={'add-question'}
            className={`bg-green-500 py-2 px-4 rounded-full`}
            type="submit"
            disabled={sumbitAnswersState.loading}
          >
            <div className="flex flex-row gap-2 items-center">
              {sumbitAnswersState.loading ? (
                <Spinner className="fill-green-400" />
              ) : (
                <FaPlus style={{ color: 'white' }} />
              )}
              <p className="font-semibold text-white">Submit</p>
            </div>
          </button>
        </div>
      </form>
    </div>
  );
};

export default QuestionsFillmentSection;
