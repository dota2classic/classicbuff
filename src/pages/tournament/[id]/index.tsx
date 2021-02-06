import { useRouter } from "next/router";
import { useApi } from "../../../api/hooks";
import Layout from "../../../components/Layout";
import React from "react";
import styled from "styled-components";
import { colors } from "../../../shared";
import { formatTournamentType } from "../../../utils/format/formatTournamentType";
import { Tab, Tabs } from "../../../components/UI/Tabs";
import cx from "classnames";
import { useTab } from "../../../utils/useTab";
import { TournamentDtoStatusEnum } from "../../../api/back/models";
import TeamCard, { CompactTeamCard } from "components/UI/TeamCard";

const Card = styled.a`
  display: flex;
  flex-direction: row;
  color: ${colors.primaryText};
  text-decoration: none;
`;

const TournamentName = styled.div`
  font-size: 30px;
  color: ${colors.primaryText};
  margin-top: 10px;
`;

const TournamentType = styled.div`
  color: ${colors.primaryText};
`;

const TournamentImage = styled.img`
  height: 200px;
  //width: 200px;
  object-fit: cover;
`;

const TabWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 20px;
  width: 100%;
`;

export default () => {
  const router = useRouter();
  const id = router.query.id as string;

  const { data } = useApi().tournament.useTournamentControllerGetTournament(Number(id));

  const { data: teamsData } = useApi().tournament.useTournamentControllerTournamentTeams(Number(id));

  const [tab, setTab] = useTab("tab", 0);

  if (!data) return <Layout />;
  return (
    <Layout>
      <TournamentImage src={data.imageUrl} />
      <TournamentName>{data.name}</TournamentName>
      <TournamentType>Турнир {formatTournamentType(data.entryType)}</TournamentType>

      <Tabs>
        <Tab className={cx(tab === 0 && "active")} onClick={() => setTab(0)}>
          Команды
        </Tab>
        <Tab className={cx(tab === 1 && "active")} onClick={() => setTab(1)}>
          Матчи
        </Tab>
        {(data.status === TournamentDtoStatusEnum.ONGOING || data.status === TournamentDtoStatusEnum.FINISHED) && (
          <Tab onClick={() => router.push(`/tournament/${data.id}/bracket`)}>Сетка</Tab>
        )}
      </Tabs>

      <TabWrapper>
        {tab === 0 && (
          <>
            {teamsData?.map(team => (
              <CompactTeamCard team={team} />
            ))}
          </>
        )}
      </TabWrapper>
    </Layout>
  );
};
