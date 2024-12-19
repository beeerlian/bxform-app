/**
 * This file setup the connection to a graphql server
 */
import { HttpLink } from '@apollo/client';

const uri = import.meta.env.VITE_GRAPHQL_PATH;

console.log('uri', uri);

const serverLink: HttpLink = new HttpLink({
  uri,
  headers: {},
});

export default serverLink;
