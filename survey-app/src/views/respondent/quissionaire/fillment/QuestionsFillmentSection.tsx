import { Questions } from '@/__generated__/graphql';
import { QUESTION_ANSWER } from '@/apollo/Operations';
import QuestionItem from '@/components/form-fields/QuestionItem';
import Spinner from '@/components/loading/Spinner';
import { OptionType } from '@/types/dto-types';
import { generateValidationSchema, transformFormDataForSubmission } from '@/utils/validation';
import { useMutation } from '@apollo/client';
import { yupResolver } from '@hookform/resolvers/yup';
import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { FaPlus } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

interface Props {
  questions: Questions[];
  quissionareId: string;
  refetch: (variables?: Partial<any> | undefined) => Promise<any>;
}

const QuestionsFillmentSection: React.FC<Props> = ({ questions, quissionareId, refetch }) => {
  const [insertAnswerSheet, insertAnswerSheetState] = useMutation(
    QUESTION_ANSWER.INSERT_ANSWER_SHEET
  );
  const [insertQuestionAnswers, insertQuestionAnswersState] = useMutation(
    QUESTION_ANSWER.INSERT_QUESTION_ANSWERS
  );
  const navigate = useNavigate();

  // Generate initial default values
  const getDefaultValues = () => {
    const defaultValues: Record<string, any> = {};

    questions.forEach((question) => {
      const fieldName = `question_${question.id}`;
      const type = question.option?.type as OptionType;

      switch (type) {
        case 'Multiple':
          // For multiple choice questions, initialize with all options unchecked
          defaultValues[fieldName] = (question.option?.option || []).map((opt: any) => ({
            ...opt,
            selected: false,
          }));
          break;

        case 'Ratio':
          // For ratio questions, initialize with null (no selection)
          defaultValues[fieldName] = null;
          break;

        case 'Importance Performance':
          // For IPA questions, initialize with null for both importance and performance
          defaultValues[fieldName] = {
            importance: null,
            performance: null,
          };
          break;

        case 'Essai':
          // For text questions, initialize with empty string
          defaultValues[fieldName] = '';
          break;
        case 'Text':
          // For text questions, initialize with empty string
          defaultValues[fieldName] = '';
          break;

        default:
          defaultValues[fieldName] = null;
      }
    });

    return defaultValues;
  };

  // Create the validation schema based on questions
  const validationSchema = generateValidationSchema(questions);

  // Initialize the form with validation schema
  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: getDefaultValues(),
    resolver: yupResolver(validationSchema),
    mode: 'onSubmit',
  });

  // Handle form submission
  const onSubmit = async (data: Record<string, any>) => {
    try {
      console.log('Form data:', data);

      // Step 1: Create answer sheet first
      const answerSheetResult = await insertAnswerSheet({
        variables: {
          form_id: quissionareId,
          user_id: 'c67aa1b1-dd73-41c6-a752-57cef6bfa6dd', // For anonymous submissions
        },
      });

      const answerSheetId = answerSheetResult.data?.insert_answer_sheets_one?.id;

      if (!answerSheetId) {
        throw new Error('Failed to create answer sheet');
      }

      // Step 2: Transform form data for GraphQL mutation with answer sheet ID
      const answersToSubmit = transformFormDataForSubmission(
        data,
        questions,
        answerSheetId,
        quissionareId,
        'c67aa1b1-dd73-41c6-a752-57cef6bfa6dd'
      );

      if (answersToSubmit.length === 0) {
        toast.error('Please fill at least one question');
        return;
      }

      console.log('Submitting answers:', answersToSubmit);

      // Step 3: Insert all question answers
      await insertQuestionAnswers({
        variables: {
          objects: answersToSubmit,
        },
      });

      toast.success('Answers submitted successfully!');
    } catch (error) {
      console.error('Submission error:', error);
      toast.error('Failed to submit answers. Please try again.');
    }
  };

  // Handle navigation after successful submission
  useEffect(() => {
    if (!insertQuestionAnswersState.loading && insertQuestionAnswersState.data) {
      navigate('/survey/fillment-recorded');
    } else if (insertQuestionAnswersState.error) {
      toast.error('Failed to submit answers');
    }
  }, [insertQuestionAnswersState, navigate]);

  return (
    <div className="space-y-4">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {questions.map((question) => (
          <QuestionItem key={question.id} question={question} control={control} errors={errors} />
        ))}

        <div className="flex justify-end">
          <button
            className="bg-green-500 py-2 px-4 rounded-full"
            type="submit"
            disabled={
              isSubmitting || insertAnswerSheetState.loading || insertQuestionAnswersState.loading
            }
          >
            <div className="flex flex-row gap-2 items-center">
              {isSubmitting ||
              insertAnswerSheetState.loading ||
              insertQuestionAnswersState.loading ? (
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
