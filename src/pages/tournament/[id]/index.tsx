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
import TeamCard, { TeamLeaderboardCard } from "components/UI/TeamCard";

import { TeamMemberPreview } from "../../../components/UI/TeamMemberPreview";
import { formatDateStr } from "../../../utils/format/formateDateStr";
import Head from "next/head";
import { AppRouter } from "../../../utils/route";
import Link from "next/link";
import { NextPageContext } from "next";
import { SsrProps } from "../../../utils/SsrProps";
import { EmbedProps } from "../../../components/util/EmbedProps";
import { PlayerLeaderboardPreview } from "../../../components/UI/tournament/player-leaderboard-preview";
import { useStores } from "../../../stores";
import i18n from "pages-i18n/tournament/tournament.i18n";

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

const TournamentDescription = styled.div`
  width: 40%;
  display: flex;
  margin: auto;
  white-space: pre;
  min-width: 400px;
  line-height: 24px;
  color: ${colors.primaryText};
`;
interface InitialProps {
  tournament?: FullTournamentDto;
}

export default (p: InitialProps) => {
  const r = useRouter();
  const id = r.query.id as string;

  const { auth } = useStores();
  const api = useApi().tournament;
  const { data, revalidate } = api.useTournamentControllerGetTournament(Number(id), {
    initialData: p.tournament
  });

  const [tab, setTab] = useTab("tab", 2);

  const unregister = async () => {
    if (!data) return;

    if (data.isLocked) return;

    if (data.entryType === FullTournamentDtoEntryTypeEnum.PLAYER) {
      await api.tournamentControllerLeaveTournamentAsPlayer(data.id);
      await revalidate();
    } else {
      await api.tournamentControllerLeaveTournamentAsTeam(data.id);
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
      await api.tournamentControllerJoinTournamentAsTeam(data.id);
      await revalidate();
    }
  };

  if (!data) return <Layout />;

  const canRegister = data.entryType === FullTournamentDtoEntryTypeEnum.PLAYER || auth.me?.team?.members.length === 5;
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
      <TournamentType>
        {i18n.tournament} {formatTournamentType(data.entryType)}
      </TournamentType>
      <TournamentType>
        {formatTournamentStatus(data.status)}
        <br />
        {data.status === FullTournamentDtoStatusEnum.NEW &&
          i18n.withValues.beginning({ beginning: formatDateStr(data.startDate) })}
      </TournamentType>

      <Tabs>
        <Tab className={cx(tab === 2 && "active")} onClick={() => setTab(2)}>
          {i18n.info}
        </Tab>
        <Tab className={cx(tab === 0 && "active")} onClick={() => setTab(0)}>
          {data.entryType === FullTournamentDtoEntryTypeEnum.PLAYER ? i18n.players : i18n.teams}
        </Tab>

        {data.status === FullTournamentDtoStatusEnum.FINISHED && (
          <Tab className={cx(tab === 1 && "active")} onClick={() => setTab(1)}>
            {i18n.results}
          </Tab>
        )}

        {!data.isLocked &&
          (data.isParticipating ? (
            <Tab onClick={() => unregister()}>{i18n.leaveTournament}</Tab>
          ) : (
            <Tab
              className={cx(!canRegister && "disabled")}
              onClick={() => {
                if (canRegister) {
                  register();
                }
              }}
            >
              {i18n.participate}
            </Tab>
          ))}
        {(data.status === FullTournamentDtoStatusEnum.ONGOING ||
          data.status === FullTournamentDtoStatusEnum.FINISHED) && (
          <Link passHref {...AppRouter.tournament.bracket(data.id).link}>
            <Tab>{i18n.bracket}</Tab>
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
                <TeamCard team={p.team!!} />
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
                  <TeamLeaderboardCard standing={p} />
                )
              )}
          </>
        )}

        {tab === 2 && <TournamentDescription>{data.description}</TournamentDescription>}
      </TabWrapper>
    </Layout>
  );
};

export async function getServerSideProps(ctx: NextPageContext): Promise<SsrProps<InitialProps>> {
  try {
    const res = await appApi.tournament.tournamentControllerGetTournament(Number(ctx.query.id));
    return {
      props: {
        tournament: JSON.parse(JSON.stringify(res))
      } // will be passed to the page component as props
    };
  } catch (e) {
    return {
      props: {}
    };
  }
}
