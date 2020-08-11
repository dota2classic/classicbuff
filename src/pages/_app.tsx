import React from "react";
import App from "next/app";
import { Provider } from "mobx-react";
import AuthService from "../service/AuthService";
import { TokenSniffer } from "../utils/sniffToken";
import SocketService from "../service/SocketService";

export default class MyApp extends App<any> {
  render() {
    const { Component, pageProps } = this.props;
    return (
      <>
        <Provider socketService={SocketService} authService={AuthService}>
          <TokenSniffer />
          <Component {...pageProps} />
        </Provider>
      </>
    );
  }
}
