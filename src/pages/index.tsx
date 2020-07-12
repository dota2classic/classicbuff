import React, { useEffect, useState } from "react";
import api from "../service/api";
import { LadderElement } from "../shared";
import LadderRow, { LadderHeader, Table } from "../components/LadderRow";
import Layout from "../components/Layout";
import styled from "styled-components";
import Head from "next/head";

const Thin = styled.div`
  max-width: 800px;
  width: 100%;
`;
export default () => {
  const [ladder, setLadder] = useState<LadderElement[]>([]);

  useEffect(() => {
    const fetch = () => {
      api.get<LadderElement[]>("/ladder").then(it => {
        console.log(it.data);
        setLadder(it.data as LadderElement[]);
      });
    };
    fetch();
    const int = setInterval(fetch, 10000);

    return () => clearInterval(int);
  }, []);

  return (
    <Layout title="dota2classic.ru 6.81b leaderboard">
      <Head>
        <title>Таблица лидеров</title>
      </Head>
      <Thin>
        <Table>
          <thead>
            <LadderHeader />
          </thead>
          <tbody>
            {ladder.map((it, index) => (
              <LadderRow index={index + 1} {...it} key={it.steam_id} />
            ))}
          </tbody>
        </Table>
      </Thin>
    </Layout>
  );
};
