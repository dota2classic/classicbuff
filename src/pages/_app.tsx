import React from "react";
import App from "next/app";

export default class MyApp extends App<any> {
  render() {
    const { Component, pageProps } = this.props;
    return (
      <>
        <Component {...pageProps} />
      </>
    );
  }
}
