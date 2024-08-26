import { gql } from "@apollo/client";

const getLocalUser = gql`
  query LocalUser {
    localUser @client {
      isLoggedIn
    }
  }
`;

const updateLocalUser = gql`
  mutation UpdateLocalUser($isLoggedIn: Boolean!) {
    UpdateLocalUser(isLoggedIn: $isLoggedIn) @client
  }
`;

const localUserSignOut = gql`
  mutation SignOut {
    signOut @client
  }
`;

export { getLocalUser, updateLocalUser, localUserSignOut };
