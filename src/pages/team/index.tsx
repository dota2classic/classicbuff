import { useApi } from "../../api/hooks";
import Layout from "../../components/Layout";
import React, { ReactNode, useState } from "react";
import TeamCard from "components/UI/TeamCard";
import styled from "styled-components";
import Button from "../../components/UI/Button";
import { Hint } from "../../components/UI/Hint";
import { useRouter } from "next/router";
import i18n from "pages-i18n/team.i18n";

const TeamsContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 40px;
  width: 100%;
`;
export default () => {
  const { data } = useApi().team.useTeamControllerListTeams();
  const router = useRouter();
  return (
    <Layout title={i18n.teams}>
      <Button
        onClick={() => {
          return router.push(`/team/create`);
        }}
      >
        Создать команду
      </Button>
      <TeamsContainer>
        {data?.length === 0 && <Hint>{i18n.noTeams}</Hint>}
        {data?.map(t => (
          <TeamCard team={t} />
        ))}
      </TeamsContainer>
    </Layout>
  );
};
