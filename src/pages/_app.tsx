import React from "react";
import App from "next/app";
import { GlobalStyle } from "../components/shared/global";

export default class MyApp extends App<any> {
  render() {
    const { Component, pageProps } = this.props;
    return (
      <>
        <GlobalStyle />
        <Component {...pageProps} />
      </>
    );
  }
}
