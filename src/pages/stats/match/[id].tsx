import styled from "styled-components";
import { useRouter } from "next/router";
import React from "react";
import Layout from "components/Layout";
import Head from "next/head";
import TeamTable from "components/TeamTable";
import formatGameMode from "utils/format/formatGameMode";
import { appApi, useApi } from "api/hooks";
import { LiveMatchDto, LiveMatchDtoFromJSON, MatchDto, PlayerInMatchDto } from "api/back/models";
import { AdBanner } from "components/ads/ads";
import { useEventSource } from "utils/useEventSource";
import { LiveMatch } from "components/live/LiveMatch";
import { colors } from "shared";
import { NextPageContext } from "next";
import { SsrProps } from "utils/SsrProps";
import { DateFormatter } from "utils/format/formateDateStr";

export const ItemsContainer = styled.div`
  display: flex;
  position: relative;
  flex-direction: row;

  & img + img {
    margin-left: 8px;
  }

  width: fit-content;
`;

const MatchResult = styled.div`
  font-size: 20px;
  &.green {
    color: #92a525;
  }

  &.red {
    color: #c23c2a;
  }
`;
const Team = styled.div`
  font-size: 24px;
  margin: 20px;

  &.green {
    color: #92a525;
  }

  &.red {
    color: #c23c2a;
  }
`;

const TeamShowcase = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
`;

const Showcase = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

export const formatDuration = (d: number) => {
  const mins = Math.floor(d / 60);
  const secs = `${d % 60}`.length === 1 ? `0${d % 60}` : `${d % 60}`;
  return `${mins}:${secs}`;
};
const ScoreTable = styled.div`
  display: flex;
  flex-direction: row;
`;

const Duration = styled.div`
  margin: 20px;
  color: #c2c2c2;
`;

const Winner = styled.div`
  &.green {
    color: #92a525;
  }

  &.red {
    color: #c23c2a;
  }

  font-size: 24px;
  text-align: center;
  text-transform: uppercase;
`;
export const Score = styled.div`
  margin: 20px;

  &.green {
    color: #92a525;
  }

  &.red {
    color: #c23c2a;
  }

  font-size: 24px;
`;

const sumKills = (players: PlayerInMatchDto[]) => {
  let sum = 0;
  players.forEach(it => (sum += it.kills));
  return sum;
};

interface InitialProps {
  match?: MatchDto;
}

const Page = (p: InitialProps) => {
  const { id } = useRouter().query;
  const mid = Number(id);
  const { data: match, error } = useApi().matchApi.useMatchControllerMatch(mid, {
    fallbackData: p.match
  });

  const liveMatch = useEventSource<LiveMatchDto>(
    useApi().liveApi.liveMatchControllerLiveMatchContext({ id: mid }),
    LiveMatchDtoFromJSON.bind(null)
  );

  if (match)
    return (
      <Layout>
        <Head>
          <title>Матч {id}</title>
        </Head>
        <AdBanner />
        <h2 style={{ color: colors.primaryText }}>
          <DateFormatter date={match.timestamp} />
          <br />
          <br />
          {formatGameMode(match.mode)}, Матч #{id}
        </h2>
        <MatchResult className={match?.winner === 2 ? "green" : "red"}>
          <Winner className={match?.winner === 2 ? "green" : "red"}>
            {match?.winner === 2 ? "Победа Radiant" : "Победа Dire"}
          </Winner>
          <ScoreTable>
            <Score className={"green"}>{sumKills(match.radiant)}</Score>
            <Duration>{formatDuration(match.duration)}</Duration>
            <Score className={"red"}>{sumKills(match.dire)}</Score>
          </ScoreTable>
        </MatchResult>
        <Showcase>
          <TeamShowcase>
            <Team className={"green"}>Radiant</Team>
            <TeamTable matchId={match.id} reportable={match.reportable} players={match.radiant} />
          </TeamShowcase>

          <TeamShowcase>
            <Team className={"red"}>Dire</Team>

            <TeamTable matchId={match.id} reportable={match.reportable} players={match.dire} />
          </TeamShowcase>
        </Showcase>
      </Layout>
    );

  if (liveMatch) {
    return (
      <Layout
        title={
          <h3>
            LIVE {formatGameMode(liveMatch.type)}, Матч #{id}
          </h3>
        }
      >
        <Head>
          <title>Матч {id}</title>
        </Head>
        <LiveMatch {...liveMatch} />
      </Layout>
    );
  }

  if ((error as any)?.status === 404) {
    return <Layout title={<h3>Матч не найден</h3>}></Layout>;
  }
  return null;
};

export async function getServerSideProps(ctx: NextPageContext): Promise<SsrProps<InitialProps>> {
  try {
    // @ts-ignore
    console.log(`NOTICE ME SEMAPI`, appApi.apiParams?.accessToken(), appApi.apiParams?.accessToken);
    const res = await appApi.matchApi.matchControllerMatch(Number(ctx.query.id));
    return {
      props: {
        match: JSON.parse(JSON.stringify(res))
      } // will be passed to the page component as props
    };
  } catch (e) {
    return {
      props: {}
    };
  }
}

export default Page;
