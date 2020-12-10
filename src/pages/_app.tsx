import React from "react";
import App from "next/app";
import { Provider } from "mobx-react";
import AuthService from "../service/AuthService";
import { TokenSniffer } from "../utils/sniffToken";
import { ModalProvider } from "react-modal-hook";
import { local } from "../config";
import { Game } from "../stores/Game";
import { stores } from "../stores";
import { captureComponentException } from "../utils/sentry";

const API = local ? "http://localhost:5002/graphql" : "https://dota2classic.ru/prod-api/graphql";

export default class MyApp extends App<any> {
  componentDidCatch(error: Error, errorInfo: any) {
    captureComponentException(error, errorInfo);
    super.componentDidCatch(error, errorInfo);
  }

  render() {
    const { Component, pageProps } = this.props;
    return (
      <ModalProvider>
        <Provider {...stores}>
          <TokenSniffer />
          <Component {...pageProps} />
        </Provider>
      </ModalProvider>
    );
  }
}
