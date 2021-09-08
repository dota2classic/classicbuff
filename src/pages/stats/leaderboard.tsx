import React from "react";
import LadderRow, { LadderHeader } from "components/LadderRow";
import Layout from "components/Layout";
import styled from "styled-components";
import Head from "next/head";
import { useApi } from "api/hooks";
import { Table } from "components/UI/Table";
import i18n from "pages-i18n/leaderboard.i18n";
const Thin = styled.div`
  max-width: 800px;
  width: 100%;
`;
export default () => {
  const { data } = useApi().playerApi.usePlayerControllerLeaderboard();

  return (
    <Layout title={i18n.title}>
      <Head>
        <title>Таблица лидеров - dota2classic.ru</title>
        <meta
          name="description"
          content="dota2classic.ru - таблица лидеров в рейтинговом сезоне. Классическая старая дота 6.81"
        />
      </Head>
      <Thin>
        <Table>
          <thead>
            <LadderHeader />
          </thead>
          <tbody>
            {data?.map(it => (
              <LadderRow {...it} key={it.steamId} />
            ))}
          </tbody>
        </Table>
      </Thin>
    </Layout>
  );
};
