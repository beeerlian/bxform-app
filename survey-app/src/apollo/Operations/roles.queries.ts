import { gql } from '@apollo/client';
import { ROLE_FRAGMENT } from '../Fragments';

export const getList = () => gql`
  query MyQuery {
    roles {
      ...RoleFragment
    }
  }
  ${ROLE_FRAGMENT}
`;
