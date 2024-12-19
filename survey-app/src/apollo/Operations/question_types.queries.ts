import { gql } from '@apollo/client';
import { QUESTION_TYPE_FRAGMENT } from '../Fragments';

export const getList = gql`
  query QuestionType {
    question_types {
      ...QuestionTypeFragment
    }
  }

  ${QUESTION_TYPE_FRAGMENT}
`;
