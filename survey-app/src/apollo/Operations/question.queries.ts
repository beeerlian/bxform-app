import { gql } from '@apollo/client';
import { QUESTION_FRAGMENT } from '../Fragments';

export const createQuestion = gql`
  mutation CreateQuestion(
    $form_id: uuid!
    $order: Int!
    $required: Boolean
    $caption: String
    $content: String
    $option: jsonb
  ) {
    insert_questions_one(
      object: {
        caption: $caption
        content: $content
        required: $required
        form_id: $form_id
        order: $order
        option: $option
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
    $required: Boolean
    $content: String!
    $order: Int!
    $option: jsonb
  ) {
    update_questions_by_pk(
      pk_columns: { id: $id }
      _set: {
        caption: $caption
        topic: $topic
        required: $required
        content: $content
        order: $order
        option: $option
      }
    ) {
      ...QuestionFragment
    }
  }
  ${QUESTION_FRAGMENT}
`;
