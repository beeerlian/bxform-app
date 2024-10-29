import { gql } from "@apollo/client";

export const updateFormSettings = gql`
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
      title
      start_date
      end_date
      password
      created_by
      created_at
      target_audience
    }
  }
`;
