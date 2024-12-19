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

export const UPDATE = gql`
  mutation CreateEmptyForm(
    $id: uuid!
    $end_date: timestamptz
    $start_date: timestamptz
    $title: String!
    $password: String
    $target_audience: Int
  ) {
    update_forms_by_pk(
      pk_columns: { id: $id }
      _set: {
        end_date: $end_date
        password: $password
        start_date: $start_date
        title: $title
        target_audience: $target_audience
      }
    ) {
      ...FormDetailFragment
    }
  }
  ${FORM_DETAIL_FRAGMENT}
`;
