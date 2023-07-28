import Layout from "components/Layout";
import React from "react";
import { useApi } from "api/hooks";
import TournamentCard from "components/UI/TournamentCard";
import Head from "next/head";

export default () => {
  const { data } = useApi().tournament.useTournamentControllerListTournaments();

  return (
    <Layout title="Турниры">
      <Head>
        <title>Турниры dota2classic</title>
        <meta
          name="description"
          content="dota2classic.ru - discord сервер для игры в классическую доту 6.84 2015 года"
        />
      </Head>

      {data?.map(t => (
        <TournamentCard tournament={t} />
      ))}
    </Layout>
  );
};