import React from "react";
import App from "next/app";
import { Provider } from "mobx-react";
import AuthService from "../service/AuthService";
import { TokenSniffer } from "../utils/sniffToken";
import SocketService from "../service/SocketService";
import { ModalProvider } from "react-modal-hook";
import { ApolloProvider, ApolloClient, InMemoryCache, createHttpLink } from "@apollo/client";
import { local } from "../config";
import { setContext } from "@apollo/client/link/context";

const API = local ? "http://localhost:5002/graphql" : "https://dota2classic.ru/prod-api/graphql";

const httpLink = createHttpLink({
  uri: API
});

const authLink = setContext((_, { headers }) => {
  const token = AuthService.token;

  return {
    headers: {
      ...headers,
      authorization: token ? `JWT ${token}` : ""
    }
  };
});

export const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache()
});

export default class MyApp extends App<any> {
  render() {
    const { Component, pageProps } = this.props;
    return (
      <>
        <ApolloProvider client={client}>
          <ModalProvider>
            <Provider socketService={SocketService} authService={AuthService}>
              <TokenSniffer />
              <Component {...pageProps} />
            </Provider>
          </ModalProvider>
        </ApolloProvider>
      </>
    );
  }
}
