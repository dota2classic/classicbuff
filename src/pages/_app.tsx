import React from "react";
import App from "next/app";
import { Provider } from "mobx-react";
import { TokenSniffer } from "../utils/sniffToken";
import { ModalProvider } from "react-modal-hook";
import { local } from "../config";
import { stores } from "../stores";
import "react-datepicker/dist/react-datepicker.css";
import { SWRConfig } from "swr";

const API = local ? "http://localhost:5002/graphql" : "https://dota2classic.ru/prod-api/graphql";

export default class MyApp extends App<any> {
  componentDidCatch(error: Error, errorInfo: any) {
    // captureComponentException(error, errorInfo);
    super.componentDidCatch(error, errorInfo);
  }

  render() {
    const { Component, pageProps } = this.props;
    return (
      <ModalProvider>
        <SWRConfig
          value={{
            refreshInterval: typeof window === "undefined" ? 0 : 10000
          }}
        >
          <Provider {...stores}>
            <TokenSniffer />
            <Component {...pageProps} />
          </Provider>
        </SWRConfig>
      </ModalProvider>
    );
  }
}
