import Layout from "../../components/Layout";
import React from "react";
import { useApi } from "../../api/hooks";
import TournamentCard from "components/UI/TournamentCard";

export default () => {
  const { data } = useApi().tournament.useTournamentControllerListTournaments();

  return (
    <Layout>
      {data?.map(t => (
        <TournamentCard tournament={t} />
      ))}
    </Layout>
  );
};
