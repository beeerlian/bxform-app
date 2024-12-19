import { gql } from '@apollo/client';

export const USER_FRAGMENT = gql`
  fragment UserFragment on users {
    email
    name
    id
    created_at
  }
`;

export const ROLE_FRAGMENT = gql`
  fragment RoleFragment on roles {
    code
    name
    id
    created_at
  }
`;

export const QUESTION_ANSWER_FRAGMENT = gql`
  fragment QuestionAnswerFragment on question_answers {
    answer
    answer_sheet_id
    created_at
    id
    question_id
    updated_at
  }
`;

export const ANSWER_SHEET_FRAGMENT = gql`
  fragment AnswerSheetFragment on answer_sheets {
    form_id
    id
    updated_at
    user_id
    created_at
    user {
      ...UserFragment
    }
    question_answers {
      ...QuestionAnswerFragment
    }
  }
  ${USER_FRAGMENT}
  ${QUESTION_ANSWER_FRAGMENT}
`;

export const FORM_ACCESS_FRAGMENT = gql`
  fragment FormAccessFragment on form_access {
    user {
      ...UserFragment
    }
    user_id
    id
    updated_at
    created_at
    form_id
  }
  ${USER_FRAGMENT}
`;

export const FORM_AUDIENCE_FRAGMENT = gql`
  fragment FormAudienceFragment on form_audiences {
    role_id
    id
    role {
      ...RoleFragment
    }
    form_id
    created_at
  }
  ${ROLE_FRAGMENT}
`;

export const QUESTION_TYPE_FRAGMENT = gql`
  fragment QuestionTypeFragment on question_types {
    id
    code
    name
    created_at
    updated_at
  }
`;

export const QUESTION_FRAGMENT = gql`
  fragment QuestionFragment on questions {
    id
    form_id
    question_type {
      ...QuestionTypeFragment
    }
    question_type_id
    topic
    updated_at
    created_at
    content
    caption
    option
  }
  ${QUESTION_TYPE_FRAGMENT}
`;

export const FORM_DETAIL_FRAGMENT = gql`
  fragment FormDetailFragment on forms {
    id
    public_id
    category_id
    created_at
    created_by
    end_date
    password
    start_date
    status
    target_audience
    title
    updated_at
    user {
      ...UserFragment
    }
    answer_sheets_aggregate {
      aggregate {
        count
      }
    }
    questions(order_by: { order: asc }) {
      ...QuestionFragment
    }
    answer_sheets {
      ...AnswerSheetFragment
    }
    form_accesses {
      ...FormAccessFragment
    }
    form_audiences {
      ...FormAudienceFragment
    }
  }
  ${USER_FRAGMENT}
  ${QUESTION_FRAGMENT}
  ${ANSWER_SHEET_FRAGMENT}
  ${FORM_ACCESS_FRAGMENT}
  ${FORM_AUDIENCE_FRAGMENT}
`;

export const FORM_OVERVIEW_FRAGMENT = gql`
  fragment FormOverviewFragment on forms {
    id
    public_id
    category_id
    created_at
    created_by
    end_date
    password
    start_date
    status
    target_audience
    title
    updated_at
    answer_sheets_aggregate {
      aggregate {
        count
      }
    }
  }
`;
