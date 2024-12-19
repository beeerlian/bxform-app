import { gql } from '@apollo/client';
import { QUESTION_FRAGMENT } from '../Fragments';

export const CREATE = gql`
  mutation CreateQuestion(
    $formId: uuid!
    $order: Int!
    $question_type_id: Int
    $caption: String
    $content: String
  ) {
    insert_questions_one(
      object: {
        caption: $caption
        content: $content
        form_id: $formId
        order: $order
        question_type_id: $question_type_id
      }
    ) {
      ...QuestionFragment
    }
  }
  ${QUESTION_FRAGMENT}
`;

export const deleteQuestion = gql`
  mutation DeleteQuestion($id: uuid!) {
    delete_questions_by_pk(id: $id) {
      ...QuestionFragment
    }
  }
  ${QUESTION_FRAGMENT}
`;

export const updateQuestionByPk = gql`
  mutation UpdateQuestionByPk(
    $id: uuid!
    $caption: String
    $topic: String
    $content: String!
    $order: Int!
    $question_type_id: Int!
  ) {
    update_questions_by_pk(
      pk_columns: { id: $id }
      _set: {
        caption: $caption
        topic: $topic
        content: $content
        order: $order
        question_type_id: $question_type_id
      }
    ) {
      ...QuestionFragment
    }
  }
  ${QUESTION_FRAGMENT}
`;
