// import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';

// const httpLink = createHttpLink({
//   uri: 'YOUR_GRAPHQL_ENDPOINT', // Replace with your actual GraphQL endpoint
// });

// export const client = new ApolloClient({
//   link: httpLink,
//   cache: new InMemoryCache(),
// });


import { ApolloClient, InMemoryCache } from "@apollo/client";
import initCache from "./Cache";
import link from "./Middlewares";

let client: ApolloClient<any>;

export const getApolloClient = async (): Promise<ApolloClient<any>> => {
  if (client) return client;

  const cache: InMemoryCache = await initCache();

  const apolloClient: ApolloClient<any> = new ApolloClient({
    link,
    cache,
    connectToDevTools: process.env.NODE_ENV === "development",
  });

  client = apolloClient;

  return apolloClient;
};

export const getApolloClientSync = () => {
  if (client) return client;

  const cache: InMemoryCache = new InMemoryCache();

  const apolloClient: ApolloClient<any> = new ApolloClient({
    link,
    cache,
    connectToDevTools: process.env.NODE_ENV === "development",
  });

  client = apolloClient;

  return apolloClient;
};
