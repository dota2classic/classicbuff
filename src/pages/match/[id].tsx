import styled from "styled-components";
import { useRouter } from "next/router";
import React from "react";
import Layout from "../../components/Layout";
import Head from "next/head";
import TeamTable from "../../components/TeamTable";
import { NextPageContext } from "next";
import formatGameMode from "../../utils/format/formatGameMode";
import { Match, PlayerInMatchFragmentFragment, useMatchQuery } from "../../generated/sdk";
import { BaseGQLConfig } from "../../shared";
import { useApi } from "../../api/hooks";
import { PlayerInMatchDto } from "../../api/back/models";
import { InlineHtml } from "../../components/ads/ads";

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

const Page = (p: Partial<{ match: Match }>) => {
  const { id } = useRouter().query;

  const { data: match } = useApi().matchApi.useMatchControllerMatch(Number(id));

  if (!match) return null;

  return (
    <Layout
      title={
        <h3>
          {formatGameMode(match.mode)}, Матч #{id}
        </h3>
      }
    >
      <Head>
        <title>Матч {id}</title>
      </Head>
      <InlineHtml
        html={`<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-2522763197238996"
     data-ad-slot="8833451645"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>
<script>
     (adsbygoogle = window.adsbygoogle || []).push({});
</script>`}
      />

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
          <TeamTable players={match.radiant} />
        </TeamShowcase>

        <TeamShowcase>
          <Team className={"red"}>Dire</Team>

          <TeamTable players={match.dire} />
        </TeamShowcase>
      </Showcase>
    </Layout>
  );
};

export default Page;
