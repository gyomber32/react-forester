import React from "react";
import ReactDOM from "react-dom";
import "./index.scss";
import App from "./App";

import {
    ApolloClient,
    InMemoryCache,
    ApolloProvider,
  } from "@apollo/client";
  import { createUploadLink } from 'apollo-upload-client'
  
  const client = new ApolloClient({
    cache: new InMemoryCache(),
    //@ts-ignore
    link: createUploadLink({
      uri: "http://localhost:3000",
    }),
  });

ReactDOM.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
