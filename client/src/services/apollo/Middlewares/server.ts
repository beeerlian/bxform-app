/**
 * This file setup the connection to a graphql server
 */
import { HttpLink } from "@apollo/client";

const uri = process.env.GRAPHQL_PATH;


const serverLink: HttpLink = new HttpLink({
    uri: "http://localhost:8080/v1/graphql",
    headers: {},
});

export default serverLink;
