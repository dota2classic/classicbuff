import React from "react";
import App from "next/app";
import { Provider } from "mobx-react";
import AuthService from "../service/AuthService";
import { TokenSniffer } from "../utils/sniffToken";
import { ModalProvider } from "react-modal-hook";
import { ApolloProvider, ApolloClient, InMemoryCache, createHttpLink } from "@apollo/client";
import { local } from "../config";
import { setContext } from "@apollo/client/link/context";
import { Game } from "../stores/Game";
import { stores } from "../stores";
import { captureComponentException } from "../utils/sentry";

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
  componentDidCatch(error: Error, errorInfo: any) {
    captureComponentException(error, errorInfo);
    super.componentDidCatch(error, errorInfo);
  }

  render() {
    const { Component, pageProps } = this.props;
    return (
      <>
        <ApolloProvider client={client}>
          <ModalProvider>
            <Provider {...stores}>
              <TokenSniffer />
              <Component {...pageProps} />
            </Provider>
          </ModalProvider>
        </ApolloProvider>
      </>
    );
  }
}
