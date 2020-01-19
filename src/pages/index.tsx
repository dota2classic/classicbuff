import React from "react";
import Router from "next/router";
import { NextPageContext } from "next";

export default class extends React.Component {
  static async getInitialProps({ res }: NextPageContext) {
    if (res) {
      res.writeHead(302, {
        Location: "/offer-request"
      });
      res.end();
    } else {
      Router.push("/offer-request");
    }
    return {};
  }
}
