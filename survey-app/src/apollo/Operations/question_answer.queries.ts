import { gql } from '@apollo/client';

export const SUBMIT = gql`
  mutation CreateMultipleQuestions($objects: [question_answers_insert_input!]!) {
    insert_question_answers(objects: $objects) {
      returning {
        id
        question_id
        answer
        created_at
        updated_at
      }
    }
  }
`;
