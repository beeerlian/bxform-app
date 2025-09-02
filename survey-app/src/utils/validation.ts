import { Questions } from '@/__generated__/graphql';
import { OptionType } from '@/types/dto-types';
import * as yup from 'yup';

// Function to generate validation schema based on questions
export const generateValidationSchema = (questions: Questions[]) => {
  const schema: Record<string, any> = {};

  questions.forEach((question) => {
    const fieldName = `question_${question.id}`;
    const type = question.option?.type as OptionType;
    const isRequired = question.required;

    // Set up validation based on question type
    switch (type) {
      case 'Multiple':
        schema[fieldName] = isRequired
          ? yup
              .array()
              .of(
                yup.object().shape({
                  selected: yup.boolean(),
                  label: yup.string(),
                  value: yup.string(),
                })
              )
              .test('at-least-one-selected', 'Please select at least one option', (value) =>
                value?.some((item) => item.selected)
              )
          : yup.array().nullable();
        break;

      case 'Ratio':
        schema[fieldName] = isRequired
          ? yup
              .object()
              .shape({
                id: yup.string().required(),
                label: yup.string().required(),
                value: yup.mixed().required(),
              })
              .required('Please select an option')
          : yup
              .object()
              .shape({
                id: yup.string(),
                label: yup.string(),
                value: yup.mixed(),
              })
              .nullable()
              .optional();
        break;

      case 'Importance Performance':
        schema[fieldName] = yup.object().shape({
          importance: isRequired
            ? yup
                .object()
                .shape({
                  id: yup.string().required(),
                  label: yup.string().required(),
                  value: yup.mixed().required(),
                })
                .required('Please rate the importance')
            : yup
                .object()
                .shape({
                  id: yup.string(),
                  label: yup.string(),
                  value: yup.mixed(),
                })
                .nullable()
                .optional(),
          performance: isRequired
            ? yup
                .object()
                .shape({
                  id: yup.string().required(),
                  label: yup.string().required(),
                  value: yup.mixed().required(),
                })
                .required('Please rate the performance')
            : yup
                .object()
                .shape({
                  id: yup.string(),
                  label: yup.string(),
                  value: yup.mixed(),
                })
                .nullable()
                .optional(),
        });
        break;

      case 'Essai':
      case 'Address':
        schema[fieldName] = isRequired
          ? yup.string().required('Please provide an answer').trim()
          : yup.string().nullable();
        break;

      case 'Email':
        schema[fieldName] = isRequired
          ? yup.string().email('Please enter a valid email').required('Email is required')
          : yup.string().email('Please enter a valid email').nullable();
        break;

      case 'Number':
        schema[fieldName] = isRequired
          ? yup.number().typeError('Please enter a valid number').required('This field is required')
          : yup.number().typeError('Please enter a valid number').nullable();
        break;

      case 'Phone':
        schema[fieldName] = isRequired
          ? yup
              .string()
              .matches(/^[0-9+\-\s()]*$/, 'Please enter a valid phone number')
              .required('Phone number is required')
          : yup
              .string()
              .matches(/^[0-9+\-\s()]*$/, 'Please enter a valid phone number')
              .nullable();
        break;

      case 'Date':
      case 'Time':
      case 'DateTime':
      case 'Name':
      default:
        schema[fieldName] = isRequired
          ? yup.string().required('This field is required')
          : yup.string().nullable();
    }
  });

  return yup.object().shape(schema);
};

// Transform form data to API submission format with answer sheet ID
export const transformFormDataForSubmission = (
  formData: Record<string, any>,
  questions: Questions[],
  answerSheetId: string,
  formId: string,
  userId?: string
) => {
  return Object.entries(formData)
    .map(([key, value]) => {
      const questionId = key.replace('question_', '');
      const question = questions.find((q) => q.id === questionId);

      if (!question || value === null || value === undefined || value === '') {
        return null;
      }

      return {
        question_id: questionId,
        answer: typeof value === 'object' ? JSON.stringify(value) : String(value),
        answer_sheet_id: answerSheetId,
        form_id: formId,
        user_id: userId || null,
      };
    })
    .filter(Boolean);
};
