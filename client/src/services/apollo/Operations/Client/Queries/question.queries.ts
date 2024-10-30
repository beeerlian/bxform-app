import { gql } from "@apollo/client";



export const createEmptyQuestion = gql`
  mutation CreateEmptyForm($formId: uuid!, $order: Int!, $question_type_id: Int) {
    insert_questions_one(object: {caption: null, content: "", form_id: $formId, order: $order, question_type_id: $question_type_id}){
    id
    }
  }
`;


export const deleteQuestion = gql`
  mutation DeleteQuestion($id: uuid!) {
    delete_questions_by_pk(id: $id) {
      id
    }
  }
`;
export const updateQuestionByPk = gql`
  mutation UpdateQuestionByPk($id: uuid!, $caption: String, $topic: String, $content: String!, $order: Int!, $question_type_id: Int!) {
    update_questions_by_pk(pk_columns: {id: $id}, _set: {caption: $caption, caption: $topic, content: $content, order: $order, question_type_id: $question_type_id}) {
      id
      caption,
      topic,
      content
      order
      question_type_id
    }
  }
`;