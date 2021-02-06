import { useApi } from "../../api/hooks";
import Layout from "../../components/Layout";
import React, { useState } from "react";
import TeamCard, { CompactTeamCard } from "components/UI/TeamCard";
import styled from "styled-components";
import Button from "../../components/UI/Button";
import { Hint } from "../../components/UI/Hint";
import { OldRequiredModal } from "components/modal/OldRequiredModal";
import { useStores } from "../../stores";
import { useRouter } from "next/router";
import { ColoredRole } from "../../components/UI/ColoredRole";

const TeamsContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 40px;
  width: 100%;
`;
export default () => {
  const { data } = useApi().team.useTeamControllerListTeams();
  const router = useRouter();
  const [oldRequiredOpen, setOldRequiredOpen] = useState(false);
  const { auth } = useStores();
  return (
    <Layout title="Команды">
      <OldRequiredModal open={oldRequiredOpen} close={() => setOldRequiredOpen(false)}>
        Создать команду может только игрок с подпиской
        <ColoredRole className="old">Древний</ColoredRole> или <ColoredRole className="human">Человек</ColoredRole>
      </OldRequiredModal>
      <Button
        onClick={() => {
          if (!auth.hasOld) {
            setOldRequiredOpen(true);
          } else {
            return router.push(`/team/create`);
          }
        }}
      >
        Создать команду
      </Button>
      <TeamsContainer>
        {data?.length === 0 && <Hint>Еще нет ни одной команды!</Hint>}
        {data?.map(t => (
          <TeamCard team={t} />
        ))}
      </TeamsContainer>
    </Layout>
  );
};
