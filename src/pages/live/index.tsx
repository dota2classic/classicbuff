import Head from "next/head";
import Layout from "../../components/Layout";
import React from "react";
import { LiveMatch } from "../../components/live/LiveMatch";
import { useApi } from "../../api/hooks";
import styled from "styled-components";
import Link from "next/link";
import { mockLiveMatch } from "../../utils/mockLiveMatch";

const NoGamesInfo = styled.div`
  color: #c2c2c2;
  font-size: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  & a {
    text-decoration: none;
    color: #c2c2c2;

    transition: 0.3s ease;
    &:hover {
      color: white;
    }
  }
`;
export default () => {
  // const { data } = useApi().matchApi.useMatchControllerLiveMatches();

  const data = [mockLiveMatch];
  return (
    <Layout>
      <Head>
        <title>Текущие матчи - dota2classic.ru</title>
      </Head>

      {data?.length === 0 && (
        <NoGamesInfo>
          <span>Сейчас не идет ни одной игры.</span>
          <Link href={`/queue`}>
            <a> Отличный повод запустить поиск ;)</a>
          </Link>
        </NoGamesInfo>
      )}

      {data?.map(t => (
        <LiveMatch {...t} />
      ))}
    </Layout>
  );
};
