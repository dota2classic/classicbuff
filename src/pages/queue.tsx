import Head from "next/head";
import { Layout as QueueLayout } from "../container/queue/layout/layout";
import React, { useEffect } from "react";
import Layout from "../components/Layout";

const Queue = () => {
  return (
    <Layout noScroll>
      <Head>
        <title>Поиск игры - dota2classic.ru</title>
        <meta name="description" content="dota2classic.ru - поиск игры" />
      </Head>
      <QueueLayout />
    </Layout>
  );
};

export default Queue;
