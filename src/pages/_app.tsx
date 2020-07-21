import React from "react";
import App from "next/app";
import { Provider } from "mobx-react";
import AuthService from "../service/AuthService";

export default class MyApp extends App<any> {
  render() {
    const { Component, pageProps } = this.props;
    return (
      <>
        <Provider authService={AuthService}>
          <Component {...pageProps} />
        </Provider>
      </>
    );
  }
}
