import { Table, Tr } from "../components/LadderRow";
import Layout from "../components/Layout";
import React, { useEffect, useState } from "react";
import { Match } from "../shared";
import api from "../service/api";
import styled from "styled-components";
import Head from "next/head";
import { NextPageContext } from "next";
import { MatchmakingMode } from "../utils/format/formatGameMode";
import MatchRow from "../components/MatchRow";
import { Tab, Tabs } from "../components/Tabs";
import HistoryStore from "../stores/HistoryStore";

import { observer, useLocalStore } from "mobx-react";
import useWillMount from "../utils/useWillMount";

export const Heroes = styled.div`
  display: flex;
  flex-direction: row;
`;

export const MatchIdCol = styled.div`
  display: flex;
  flex-direction: column;
`;

const NextButton = styled.button`
  border: none;
  color: #c2c2c2;
  font-size: 20px;
  padding: 8px;
  margin-top: 10px;
  border-radius: 4px;
  cursor: pointer;
  transition: 0.3s ease;
  &:hover {
    background: rgba(0, 0, 0, 0.3);
  }
  background: rgba(0, 0, 0, 0.1);
`;

const Page = observer((p: Partial<{ history: Match[] }>) => {
  const store = useLocalStore(() => new HistoryStore());

  useWillMount(() => {
    if (p.history) {
      store.matches = p.history;
    }
  });

  useEffect(() => {
    store.fetch();
  }, []);

  return (
    <Layout title="dota2classic.ru 6.81b история матчей">
      <Head>
        <title>История матчей</title>
      </Head>
      <Tabs>
        <Tab
          onClick={() => (store.mode = MatchmakingMode.RANKED)}
          className={(store.mode === MatchmakingMode.RANKED && "active") || undefined}
        >
          Ranked
        </Tab>
        <Tab
          onClick={() => (store.mode = MatchmakingMode.UNRANKED)}
          className={(store.mode === MatchmakingMode.UNRANKED && "active") || undefined}
        >
          Unranked
        </Tab>
        <Tab
          onClick={() => (store.mode = MatchmakingMode.SOLOMID)}
          className={(store.mode === MatchmakingMode.SOLOMID && "active") || undefined}
        >
          1x1
        </Tab>
        <Tab onClick={() => (store.mode = undefined)} className={(store.mode === undefined && "active") || undefined}>
          Все
        </Tab>
      </Tabs>
      <Table className="compact">
        <thead>
          <Tr>
            <th>ID матча</th>
            <th>Режим</th>
            <th>Победитель</th>
            <th>Длительность</th>
            <th className="green omit">Radiant team</th>
            <th className="red omit">Dire team</th>
          </Tr>
        </thead>
        <tbody>
          {store.matches.map((it, index) => (
            <MatchRow index={index} {...it} />
          ))}
        </tbody>
      </Table>
      {store.hasMore && (
        <NextButton
          onClick={() => {
            store.page++;
          }}
        >
          More
        </NextButton>
      )}
    </Layout>
  );
});

export default Page;
