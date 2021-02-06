import { useRouter } from "next/router";
import { useApi } from "../../../api/hooks";
import Layout from "../../../components/Layout";
import React from "react";
import styled from "styled-components";
import { colors } from "../../../shared";
import { formatTournamentStatus, formatTournamentType } from "../../../utils/format/formatTournamentType";
import { Tab, Tabs } from "../../../components/UI/Tabs";
import cx from "classnames";
import { useTab } from "../../../utils/useTab";
import {
  FullTournamentDtoEntryTypeEnum,
  FullTournamentDtoStatusEnum,
  TournamentDtoEntryTypeEnum,
  TournamentDtoStatusEnum,
  TournamentParticipantDto
} from "../../../api/back/models";
import { CompactTeamCard } from "components/UI/TeamCard";
import { TeamMemberPreview } from "../../../components/UI/TeamMemberPreview";
import { formatDateStr } from "../../../utils/format/formateDateStr";

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

  const api = useApi().tournament;
  const { data, revalidate } = api.useTournamentControllerGetTournament(Number(id));

  const [tab, setTab] = useTab("tab", 0);

  const unregister = async () => {
    if (!data) return;

    if (data.isLocked) return;

    if (data.entryType === FullTournamentDtoEntryTypeEnum.PLAYER) {
      await api.tournamentControllerLeaveTournamentAsPlayer(data.id);
      await revalidate();
    }
  };

  const register = async () => {
    if (!data) return;

    if (data.isLocked) return;

    if (data.entryType === FullTournamentDtoEntryTypeEnum.PLAYER) {
      await api.tournamentControllerJoinTournamentAsPlayer(data.id);
      await revalidate();
    } else {
      throw "TODO";
    }
  };

  if (!data) return <Layout />;
  return (
    <Layout>
      <TournamentImage src={data.imageUrl} />
      <TournamentName>{data.name}</TournamentName>
      <TournamentType>Турнир {formatTournamentType(data.entryType)}</TournamentType>
      <TournamentType>
        {formatTournamentStatus(data.status)},
        {data.status === FullTournamentDtoStatusEnum.NEW && " начало " + formatDateStr(data.startDate)}
      </TournamentType>

      <Tabs>
        <Tab className={cx(tab === 0 && "active")} onClick={() => setTab(0)}>
          {data.entryType === TournamentDtoEntryTypeEnum.PLAYER ? "Игроки" : "Команды"}
        </Tab>
        <Tab className={cx(tab === 1 && "active")} onClick={() => setTab(1)}>
          Матчи
        </Tab>
        {!data.isLocked &&
          (data.isParticipating ? (
            <Tab onClick={() => unregister()}>Покинуть турнир</Tab>
          ) : (
            <Tab onClick={() => register()}>Участвовать</Tab>
          ))}
        {(data.status === TournamentDtoStatusEnum.ONGOING || data.status === TournamentDtoStatusEnum.FINISHED) && (
          <Tab onClick={() => router.push(`/tournament/${data.id}/bracket`)}>Сетка</Tab>
        )}
      </Tabs>

      <TabWrapper>
        {tab === 0 && (
          <>
            {data.participants.map((p: TournamentParticipantDto) =>
              data.entryType === FullTournamentDtoEntryTypeEnum.PLAYER ? (
                <TeamMemberPreview profile={p.profile!!} />
              ) : (
                <CompactTeamCard team={p.team!!} />
              )
            )}
          </>
        )}
      </TabWrapper>
    </Layout>
  );
};
