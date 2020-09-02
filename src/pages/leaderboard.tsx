import React, { useEffect, useState } from "react";
import api from "../service/api";
import { Player } from "../shared";
import LadderRow, { LadderHeader, Table } from "../components/LadderRow";
import Layout from "../components/Layout";
import styled from "styled-components";
import Head from "next/head";
import sniffToken from "../utils/sniffToken";
import useLadder from "../data/useLadder";

const Thin = styled.div`
  max-width: 800px;
  width: 100%;
`;
export default () => {
  const { data } = useLadder();

  return (
    <Layout title={<h1>Таблица лидеров</h1>}>
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
            {data?.Ladder.map((it, index) => (
              <LadderRow index={index + 1} {...it} key={it.steam_id} />
            ))}
          </tbody>
        </Table>
      </Thin>
    </Layout>
  );
};
