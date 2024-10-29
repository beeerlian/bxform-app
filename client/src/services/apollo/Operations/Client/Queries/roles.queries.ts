import { gql } from "@apollo/client";

export const getList = () => gql`
  query MyQuery {
    roles {
      code
      created_at
      id
      name
      updated_at
    }
  }
`;


