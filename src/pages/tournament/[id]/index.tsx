import { useRouter } from "next/router";
import { appApi, useApi } from "../../../api/hooks";
import Layout from "../../../components/Layout";
import React from "react";
import styled from "styled-components";
import { colors } from "../../../shared";
import { formatTournamentStatus, formatTournamentType } from "../../../utils/format/formatTournamentType";
import { Tab, Tabs } from "../../../components/UI/Tabs";
import cx from "classnames";
import { useTab } from "../../../utils/useTab";
import {
  FullTournamentDto,
  FullTournamentDtoEntryTypeEnum,
  FullTournamentDtoStatusEnum,
  TournamentParticipantDto,
  TournamentStandingDto
} from "../../../api/back/models";
import { CompactTeamCard } from "components/UI/TeamCard";
import { TeamMemberPreview } from "../../../components/UI/TeamMemberPreview";
import { formatDateStr } from "../../../utils/format/formateDateStr";
import Head from "next/head";
import { AppRouter } from "../../../utils/route";
import Link from "next/link";
import { NextPageContext } from "next";
import { SsrProps } from "../../../utils/SsrProps";
import { EmbedProps } from "../../../components/util/EmbedProps";
import { PlayerLeaderboardPreview } from "../../../components/UI/tournament/player-leaderboard-preview";

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

interface InitialProps {
  tournament?: FullTournamentDto;
}

export default (p: InitialProps) => {
  const r = useRouter();
  const id = r.query.id as string;

  const api = useApi().tournament;
  const { data, revalidate } = api.useTournamentControllerGetTournament(Number(id), {
    initialData: p.tournament
  });

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
      <Head>
        <title>Турнир {data?.name}</title>
        <meta
          name="description"
          content="dota2classic.ru - discord сервер для игры в классическую доту 6.81 2014 года"
        />
      </Head>

      <EmbedProps
        title={`Турнир ${data?.name}`}
        description={`${data?.entryType && formatTournamentType(data.entryType)} турнир по классической dota 2. ${
          data?.participants.length
        } участников`}
        image={data?.imageUrl}
      />

      <TournamentImage src={data.imageUrl} />
      <TournamentName>{data.name}</TournamentName>
      <TournamentType>Турнир {formatTournamentType(data.entryType)}</TournamentType>
      <TournamentType>
        {formatTournamentStatus(data.status)}
        {data.status === FullTournamentDtoStatusEnum.NEW && " начало " + formatDateStr(data.startDate)}
      </TournamentType>

      <Tabs>
        <Tab className={cx(tab === 0 && "active")} onClick={() => setTab(0)}>
          {data.entryType === FullTournamentDtoEntryTypeEnum.PLAYER ? "Игроки" : "Команды"}
        </Tab>
        {/*<Tab className={cx(tab === 1 && "active")} onClick={() => setTab(1)}>*/}
        {/*  Матчи*/}
        {/*</Tab>*/}

        {data.status === FullTournamentDtoStatusEnum.FINISHED && (
          <Tab className={cx(tab === 1 && "active")} onClick={() => setTab(1)}>
            Результаты
          </Tab>
        )}

        {!data.isLocked &&
          (data.isParticipating ? (
            <Tab onClick={() => unregister()}>Покинуть турнир</Tab>
          ) : (
            <Tab onClick={() => register()}>Участвовать</Tab>
          ))}
        {(data.status === FullTournamentDtoStatusEnum.ONGOING ||
          data.status === FullTournamentDtoStatusEnum.FINISHED) && (
          <Link passHref {...AppRouter.tournament.bracket(data.id).link}>
            <Tab>Сетка</Tab>
          </Link>
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

        {tab === 1 && (
          <>
            {data.standings
              ?.sort((a, b) => a.position - b.position)
              .map((p: TournamentStandingDto) =>
                data.entryType === FullTournamentDtoEntryTypeEnum.PLAYER ? (
                  <PlayerLeaderboardPreview standing={p} />
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

export async function getServerSideProps(ctx: NextPageContext): Promise<SsrProps<InitialProps>> {
  const res = await appApi.tournament.tournamentControllerGetTournament(Number(ctx.query.id));
  return {
    props: {
      tournament: JSON.parse(JSON.stringify(res))
    } // will be passed to the page component as props
  };
}
