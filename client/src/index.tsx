import { ApolloProvider } from "@apollo/client";
import { ChakraProvider } from "@chakra-ui/react";

import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import AppRouter from "routes/app";
import { getApolloClientSync } from "services/apollo";
import "./assets/css/App.css";
import theme from "./theme/theme";

const client = getApolloClientSync();

ReactDOM.render(
  <ApolloProvider client={client}>
    <ChakraProvider theme={theme}>
      <React.StrictMode>
        <BrowserRouter>
          <AppRouter />
        </BrowserRouter>
      </React.StrictMode>
    </ChakraProvider>
  </ApolloProvider>,
  document.getElementById("root")
);
