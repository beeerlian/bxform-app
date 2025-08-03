import { Questions } from '@/__generated__/graphql';
import { QUESTION_ANSWER } from '@/apollo/Operations';
import QuestionTypeChip from '@/components/chip/QuestionTypeChip';
import Spinner from '@/components/loading/Spinner';
import EssaiOption from '@/components/option/EssaiOptions';
import IpaOption from '@/components/option/IPAOptions';
import MultipleOption from '@/components/option/MultipleOptions';
import RatioOption from '@/components/option/RatioOptions';
import { OptionType } from '@/types/dto-types';
import { convertQuestionToFormFillment } from '@/utils/quissionare.util';
import { useMutation } from '@apollo/client';
import React, { useEffect } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { FaPlus } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

interface Props {
  questions: Questions[];
  quissionareId: string;
  refetch: (variables?: Partial<any> | undefined) => Promise<any>;
}

const QuestionsFillmentSection: React.FC<Props> = ({ questions, quissionareId, refetch }) => {
  const [sumbitAnswers, sumbitAnswersState] = useMutation(QUESTION_ANSWER.SUBMIT);
  const methods = useForm({
    defaultValues: {
      questions: convertQuestionToFormFillment(questions),
    },
    mode: 'onSubmit',
  });

  const {
    formState: { errors },
  } = methods;
  const navigate = useNavigate();

  const renderQuestion = (question: Questions, index: number) => {
    switch (question.option?.type as OptionType) {
      case 'Multiple':
        return (
          <MultipleOption
            name={`questions.${index}.answer`}
            options={question.option}
            required={question.required}
          />
        );
      case 'Ratio':
        return (
          <RatioOption
            name={`questions.${index}.answer`}
            options={question.option}
            required={question.required}
          />
        );
      case 'Importance Performance':
        return (
          <IpaOption
            name={`questions.${index}.answer`}
            option={question.option}
            required={question.required}
          />
        );
      case 'Essai':
        return <EssaiOption name={`questions.${index}.answer`} required={question.required} />;
      default:
        return null;
    }
  };

  const onSubmit = (data: any) => {
    // handle submit
    console.log('data: ', data);
    // ...your submit logic
  };

  useEffect(() => {
    if (!sumbitAnswersState.loading && sumbitAnswersState.data) {
      navigate('/survey/fillment-recorded');
    } else if (sumbitAnswersState.error) {
      toast.error('Failed to submit answers');
    }
  }, [sumbitAnswersState]);

  return (
    <div className="space-y-4">
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)} className="space-y-4">
          {questions.map((question, index) => (
            <div key={question.id} className="flex flex-row gap-2">
              <div className="border p-4 rounded w-full">
                <div className="flex gap-2 justify-end">
                  {question.required && (
                    <div className="flex items-center justify-center px-2 rounded bg-red-100 text-red-500 text-xs">
                      Required
                    </div>
                  )}
                  <QuestionTypeChip type={question.option?.type} />
                </div>
                <h2 className="font-semibold mb-2">{question.content}</h2>
                {renderQuestion(question, index)}
                {/* Show error for this question */}
                {errors?.questions?.[index]?.answer && (
                  <p className="text-red-500 text-sm">{errors.questions[index].answer.message}</p>
                )}
              </div>
            </div>
          ))}
          <div className="flex justify-end">
            <button
              className="bg-green-500 py-2 px-4 rounded-full"
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
      </FormProvider>
    </div>
  );
};

export default QuestionsFillmentSection;
