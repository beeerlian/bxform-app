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

export const INSERT_ANSWER_SHEET = gql`
  mutation InsertAnswerSheet($form_id: uuid!, $user_id: uuid) {
    insert_answer_sheets_one(object: { form_id: $form_id, user_id: $user_id }) {
      id
      form_id
      user_id
      created_at
    }
  }
`;

export const INSERT_QUESTION_ANSWERS = gql`
  mutation InsertQuestionAnswers($objects: [question_answers_insert_input!]!) {
    insert_question_answers(objects: $objects) {
      returning {
        id
        question_id
        answer
        answer_sheet_id
        form_id
        user_id
        created_at
        updated_at
      }
    }
  }
`;
