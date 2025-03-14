import { Questions } from '@/__generated__/graphql';
import { OptionType, QuestionFormITF, QuissionareStatus } from '@/types/dto-types';
import { v4 as uuidv4 } from 'uuid';
import { initialIPAOption } from './constants';

export function quissionareStatusToString(status: QuissionareStatus): string {
  switch (status) {
    case 1:
      return 'Draft';
    case 2:
      return 'Active';
    case 3:
      return 'Closed';
    default:
      throw new Error('Invalid QuissionareStatus');
  }
}

export function normalizeOptionObject(formData: QuestionFormITF): any {
  const optionType = formData.type;
  const key: keyof QuestionFormITF =
    optionType === 'Importance Performance' ? 'ipaOpt' : 'otherOpt';

  return {
    type: optionType,
    ...formData[key],
  };
}

export function getQuestionFormDefaultValue(question?: Questions): QuestionFormITF {
  return {
    content: question?.content ?? '',
    caption: question?.caption as string | undefined,
    required: question?.required ?? false,
    type: question?.option?.type ?? 'Text',
    ipaOpt: {
      importanceQuestion:
        question?.option?.importanceQuestion ?? 'Seberapa penting aspek ini bagi anda?',
      performanceQuestion:
        question?.option?.performanceQuestion ?? 'Bagaimana performa dari aspek ini menurut anda?',
      importance:
        question?.option?.importance ??
        initialIPAOption.importance.map((item) => ({ ...item, id: uuidv4() })),
      performance:
        question?.option?.performance ??
        initialIPAOption.performance.map((item) => ({ ...item, id: uuidv4() })),
    },
    otherOpt: {
      option: question?.option?.option,
    },
  };
}

export function convertQuestionToFormFillment(questions: Questions[]): any {
  return questions.map((question) => {
    const type = question.option!.type as OptionType;
    if (type === 'Importance Performance') {
      return {
        id: question.id,
        answer: {
          data: {
            importance: null,
            performance: null,
          },
          option: question.option,
        },
      };
    } else if (type === 'Multiple') {
      return {
        id: question.id,

        answer: {
          data: question.option!.option!.map((data: any) => ({
            ...data,
            selected: false,
          })),
          option: question.option,
        },
      };
    } else {
      return {
        id: question.id,
        answer: {
          data: null,
          option: question.option,
        },
      };
    }
  });
}
