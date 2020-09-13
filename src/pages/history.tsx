import { Table, Tr } from "../components/LadderRow";
import Layout from "../components/Layout";
import React, { useEffect, useState } from "react";
import { BaseGQLConfig } from "../shared";
import styled from "styled-components";
import Head from "next/head";
import { MatchmakingMode } from "../utils/format/formatGameMode";
import MatchRow from "../components/MatchRow";
import { Tab, Tabs } from "../components/Tabs";

import { observer } from "mobx-react";
import Pagination from "../components/Pagination";
import { Match, useHistoryQuery } from "../generated/sdk";

export const Heroes = styled.div`
  display: flex;
  flex-direction: row;
`;

export const MatchIdCol = styled.div`
  display: flex;
  flex-direction: column;
`;

const Page = observer((p: Partial<{ history: Match[] }>) => {
  const [page, setPage] = useState(0);
  const [mode, setMode] = useState<MatchmakingMode | undefined>(MatchmakingMode.RANKED);

  useEffect(() => setPage(0), [mode]);
  const { data } = useHistoryQuery({
    ...BaseGQLConfig,
    variables: {
      page,
      mode
    }
  });

  return (
    <Layout title="dota2classic.ru 6.81b история матчей">
      <Head>
        <title>История матчей</title>
      </Head>
      <Tabs>
        <Tab
          onClick={() => setMode(MatchmakingMode.RANKED)}
          className={(mode === MatchmakingMode.RANKED && "active") || undefined}
        >
          Ranked
        </Tab>
        <Tab
          onClick={() => setMode(MatchmakingMode.UNRANKED)}
          className={(mode === MatchmakingMode.UNRANKED && "active") || undefined}
        >
          Unranked
        </Tab>
        <Tab
          onClick={() => setMode(MatchmakingMode.SOLOMID)}
          className={(mode === MatchmakingMode.SOLOMID && "active") || undefined}
        >
          1x1
        </Tab>
        <Tab onClick={() => setMode(undefined)} className={(mode === undefined && "active") || undefined}>
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
          {data?.History?.data?.map((it, index) => (
            <MatchRow index={index} {...it} />
          ))}
        </tbody>
      </Table>
      {data?.History && (
        <Pagination
          pages={data.History.pages}
          page={page}
          next={() => setPage(page + 1)}
          prev={() => setPage(Math.max(0, page - 1))}
        />
      )}
    </Layout>
  );
});

export default Page;
