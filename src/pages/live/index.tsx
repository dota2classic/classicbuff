import Head from "next/head";
import Layout from "../../components/Layout";
import React from "react";
import { LiveMatch } from "../../components/live/LiveMatch";
import { useApi } from "../../api/hooks";
import styled from "styled-components";
import Link from "next/link";
import { mockLiveMatch } from "../../utils/mockLiveMatch";
import { LiveMatchPreview } from "../../components/live/LiveMatchPreview";
import i18n from "pages-i18n/live";
const NoGamesInfo = styled.div`
  color: #c2c2c2;
  font-size: 35px;
  line-height: 45px;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 200px;
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
  const { data } = useApi().liveApi.useLiveMatchControllerListMatches({
    refreshInterval: 1000
  });

  return (
    <Layout>
      <Head>
        <title>Текущие матчи - dota2classic.ru</title>
      </Head>

      {data?.length === 0 && (
        <NoGamesInfo>
          <span>{i18n.noGames}</span>
          <Link href={`/queue`}>
            <a>{i18n.goodReasonToQueue}</a>
          </Link>
        </NoGamesInfo>
      )}

      {data?.map(t => (
        <LiveMatchPreview {...t} />
      ))}
    </Layout>
  );
};
