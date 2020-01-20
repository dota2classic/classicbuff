import * as React from "react";
import Layout from "containers/common/Layout";
import Container from "containers/offer-requests/Container";
import Filters from "containers/offer-requests/Filter";
import Toolbar from "containers/offer-requests/Toolbar";
import Header from "containers/offer-requests/Header";

export default () => (
  <Layout filters={<Filters />}>
    <Header />
    <Toolbar />
    <Container />
  </Layout>
);
