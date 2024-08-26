import { getApolloClient } from "services/apollo";
import { USER_QUERIES } from "services/apollo/Operations/Client/Queries";

export const updateLocalUser = async (isLoggedIn: boolean) => {
  try {
    const client = await getApolloClient();
    const current = client.readQuery({ query: USER_QUERIES.getLocalUser });

    const updatedUser = { ...current.localUser, isLoggedIn };

    client.writeQuery({
      query: USER_QUERIES.getLocalUser,
      data: {
        localUser: updatedUser,
      },
    });
  } catch (error) {
    throw new Error((error as Error).message);
  }
};
