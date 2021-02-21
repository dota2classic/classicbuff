import { useApi } from "../../api/hooks";
import Layout from "../../components/Layout";
import React, { ReactNode, useState } from "react";
import TeamCard from "components/UI/TeamCard";
import styled from "styled-components";
import Button from "../../components/UI/Button";
import { Hint } from "../../components/UI/Hint";
import { OldRequiredModal } from "components/modal/OldRequiredModal";
import { useStores } from "../../stores";
import { useRouter } from "next/router";
import { ColoredRole } from "../../components/UI/ColoredRole";
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
  const [oldRequiredOpen, setOldRequiredOpen] = useState(false);
  const { auth } = useStores();
  return (
    <Layout title={i18n.teams}>
      <OldRequiredModal open={oldRequiredOpen} close={() => setOldRequiredOpen(false)}>
        {i18n.withValues.oldRequired({
          old: (...chunks: ReactNode[]) => <ColoredRole className="old">{chunks}</ColoredRole>,
          human: (...chunks: ReactNode[]) => <ColoredRole className="human">{chunks}</ColoredRole>
        })}
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
        {data?.length === 0 && <Hint>{i18n.noTeams}</Hint>}
        {data?.map(t => (
          <TeamCard team={t} />
        ))}
      </TeamsContainer>
    </Layout>
  );
};
