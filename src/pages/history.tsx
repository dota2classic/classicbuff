import { Table, Tr } from "../components/LadderRow";
import Layout from "../components/Layout";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Head from "next/head";
import formatGameMode, { MatchmakingMode } from "../utils/format/formatGameMode";
import MatchRow from "../components/MatchRow";
import { Tab, Tabs } from "../components/Tabs";

import { observer } from "mobx-react";
import Pagination from "../components/Pagination";
import { useApi } from "../api/hooks";
import { formatDuration } from "./match/[id]";
import Link from "next/link";
import { AdBanner, InlineAdBanner } from "../components/ads/ads";

export const Heroes = styled.div`
  display: flex;
  flex-direction: row;
`;

export const MatchIdCol = styled.div`
  display: flex;
  flex-direction: column;
`;

const LiveMatchEngage = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  color: white;
  border: 1px solid #2b2b2b;

  & .title {
    font-size: 20px;
  }

  & .info-link {
    margin-top: 10px;
    cursor: pointer;
    text-decoration: none;
    color: white;
    transition: 0.3s ease;
    &:hover {
      color: wheat;
    }
  }
`;

const Page = observer(() => {
  const [page, setPage] = useState(0);
  const [mode, setMode] = useState<MatchmakingMode | undefined>(MatchmakingMode.RANKED);

  useEffect(() => setPage(0), [mode]);
  const { data: liveMatches } = useApi().matchApi.useMatchControllerLiveMatches();
  const { data } = useApi().matchApi.useMatchControllerMatches(page, undefined, mode);

  const firstLiveMatch = (liveMatches && liveMatches[0]) || undefined;

  return (
    <Layout title={"История матчей"}>
      <Head>
        <title>История матчей - dota2classic.ru</title>
      </Head>
      {firstLiveMatch && (
        <LiveMatchEngage>
          <div className="title">Сейчас идет игра!</div>
          <Link href={"/live"}>
            <a className="info-link">
              {formatGameMode(firstLiveMatch.type)}, время {formatDuration(firstLiveMatch.duration)}
            </a>
          </Link>
        </LiveMatchEngage>
      )}
      <Tabs>
        <Tab
          onClick={() => setMode(MatchmakingMode.RANKED)}
          className={(mode === MatchmakingMode.RANKED && "active") || undefined}
        >
          Рейтинг
        </Tab>
        <Tab
          onClick={() => setMode(MatchmakingMode.UNRANKED)}
          className={(mode === MatchmakingMode.UNRANKED && "active") || undefined}
        >
          Обычные
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
            <th className="green omit">Силы Света</th>
            <th className="red omit">Силы Тьмы</th>
          </Tr>
        </thead>
        <tbody>
          {data?.data.map((it, index) => (
            <MatchRow {...it} />
          ))}
        </tbody>
      </Table>
      <br />
      <AdBanner />
      {data && (
        <Pagination
          pages={data.pages}
          page={page}
          next={() => setPage(page + 1)}
          prev={() => setPage(Math.max(0, page - 1))}
        />
      )}
    </Layout>
  );
});

export default Page;
