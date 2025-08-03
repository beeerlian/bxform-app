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
    id
    form_id
    user_id
    question_id
    answer_sheet_id
    answer
    created_at
    updated_at
  }
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

export const AnswerSheetFragment = gql`
  fragment AnswerSheetFragment on answer_sheets {
    id
    form_id
    user_id
    recorded
    created_at
    updated_at
  }
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
    order
    option
    required
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
    is_public
    updated_at
    user {
      ...UserFragment
    }

    questions(order_by: { order: asc }) {
      ...QuestionFragment
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
  }
`;
