import { gql } from '@apollo/client';
import { FORM_DETAIL_FRAGMENT, FORM_OVERVIEW_FRAGMENT } from '../Fragments';

export const GET_LIST = gql`
  query GetForms($limit: Int, $orderBy: [forms_order_by!], $where: forms_bool_exp) {
    forms(limit: $limit, order_by: $orderBy, where: $where) {
      ...FormOverviewFragment
    }
  }

  ${FORM_OVERVIEW_FRAGMENT}
`;

export const GET_BY_ID = gql`
  query GetFormById($id: uuid!) {
    forms_by_pk(id: $id) {
      ...FormDetailFragment
    }
  }
  ${FORM_DETAIL_FRAGMENT}
`;
export const GET_BY_PUBLIC_ID = gql`
  query GetFormByPublicId($id: uuid!) {
    forms(limit: 1, where: { public_id: { _eq: $id } }) {
      ...FormDetailFragment
    }
  }
  ${FORM_DETAIL_FRAGMENT}
`;

export const _STATUS = gql`
  mutation UpdateFormStatusByPK($id: uuid!, $status: smallint) {
    update_forms_by_pk(pk_columns: { id: $id }, _set: { status: $status }) {
      status
    }
  }
`;

export const UPDATE = gql`
  mutation UpdateFormByPK(
    $id: uuid!
    $end_date: timestamptz
    $start_date: timestamptz
    $title: String!
    $password: String
    $target_audience: Int
    $is_public: Boolean
  ) {
    update_forms_by_pk(
      pk_columns: { id: $id }
      _set: {
        end_date: $end_date
        password: $password
        start_date: $start_date
        title: $title
        target_audience: $target_audience
        is_public: $is_public
      }
    ) {
      end_date
      password
      start_date
      title
      target_audience
      is_public
    }
  }
`;
export const GET_FORM_RESPONSES = gql`
  query GetFormResponses($form_id: uuid!) {
    answer_sheets(where: { form_id: { _eq: $form_id } }) {
      id
      form_id
      user_id
      created_at
      updated_at
      recorded
      user {
        id
        name
        email
        created_at
        updated_at
      }
      question_answers {
        answer
        created_at
        form_id
        id
        question_id
        updated_at
        user_id
        question {
          caption
          created_at
          content
          id
          option
          order
          form_id
          question_type_id
          required
          topic
          updated_at
        }
      }
    }
  }
`;

export const GET_FORM_ANALYTICS_DATA = gql`
  query GetFormAnalyticsData($form_id: uuid!) {
    questions(where: { form_id: { _eq: $form_id } }) {
      id
      question_answers {
        answer
        answer_sheet_id 
        created_at
        form_id
        id
        question_id
        updated_at
        user_id
      }
      order
      option
      form_id
      created_at
      content
      caption
    }
  }
`;
