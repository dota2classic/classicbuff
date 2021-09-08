import Layout from "components/Layout";
import React from "react";
import { useApi } from "api/hooks";
import { useRouter } from "next/router";
import { AdminBracketViewerNew } from "components/UI/BracketViewer";
import { colors } from "shared";
import styled from "styled-components";
import Head from "next/head";
import i18n from "pages-i18n/tournament/tournament.i18n";
const Title = styled.div`
  font-size: 26px;
  margin-top: 20px;
  margin-bottom: 20px;
  color: ${colors.primaryText};
`;
export default () => {
  const router = useRouter();
  const id = router.query.id as string;
  const { data } = useApi().tournament.useTournamentControllerGetBracketNew(Number(id));

  const { data: tData } = useApi().tournament.useTournamentControllerGetTournament(Number(id));

  if (!data) return <Layout landing />;
  return (
    <Layout landing>
      <Head>
        <title>Сетка турнира {tData?.name}</title>
        <meta
          name="description"
          content="dota2classic.ru - discord сервер для игры в классическую доту 6.84 2015 года"
        />
      </Head>

      <Title>{i18n.withValues.bracketTitle({ title: tData?.name })}</Title>

      <AdminBracketViewerNew id={`bracket_${id}`} bracket={data} />
    </Layout>
  );
};
