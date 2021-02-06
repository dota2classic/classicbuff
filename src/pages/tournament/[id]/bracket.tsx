import Layout from "../../../components/Layout";
import React from "react";
import { useApi } from "../../../api/hooks";
import { useRouter } from "next/router";
import BracketViewer from "components/UI/BracketViewer";
import { colors } from "../../../shared";
import styled from "styled-components";

const Title = styled.div`
  font-size: 26px;
  margin-top: 20px;
  margin-bottom: 20px;
  color: ${colors.primaryText};
`;
export default () => {
  const router = useRouter();
  const id = router.query.id as string;
  const { data } = useApi().tournament.useTournamentControllerGetBracket(Number(id));

  const { data: tData } = useApi().tournament.useTournamentControllerGetTournament(Number(id));

  if (!data) return <Layout landing />;
  return (
    <Layout landing>
      <Title>Сетка {tData?.name}</Title>

      <BracketViewer rounds={data.winning} />
      <BracketViewer rounds={data.losing} />
    </Layout>
  );
};
