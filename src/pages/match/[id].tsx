import styled from "styled-components";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { Match, Player } from "../../shared";
import Layout from "../../components/Layout";
import { Table, Tr } from "../../components/LadderRow";
import api from "../../service/api";
import Link from "next/link";
import { steamIdToNum } from "../../utils/numSteamId";
import HeroIcon from "../../components/HeroIcon";
import ItemIcon from "../../components/ItemIcon";
import Head from "next/head";
import PlayerRow from "../../components/PlayerRow";
import TeamTable from "../../components/TeamTable";
import { NextApiRequest, NextPageContext } from "next";
import useWillMount from "../../utils/useWillMount";
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

const fetchMatch = (id: number): Promise<Match> => {
  return api
    .get<Match>("/match", { id })
    .then(it => it.data as Match);
};

const sumKills = (players: Player[]) => {
  let sum = 0;
  players.forEach(it => (sum += it.kills));
  return sum;
};

const Page = (p: Partial<{ match: Match }>) => {
  const [match, setMatch] = useState<Match | undefined>(p.match);

  const { id } = useRouter().query;

  useEffect(() => {
    const fetch = () => {
      if (!Number.isNaN(Number(id))) {
        fetchMatch(Number(id)).then(setMatch);
      }
    };
    if (!p.match) fetch();
    const int = setInterval(fetch, 10000);

    return () => clearInterval(int);
  }, [id]);

  if (!match) return null;
  return (
    <Layout title={<h3>Матч #{id}</h3>}>
      <Head>
        <title>Матч {id}</title>
      </Head>
      <MatchResult className={match?.radiant_win ? "green" : "red"}>
        <Winner className={match?.radiant_win ? "green" : "red"}>
          {match?.radiant_win ? "Победа Radiant" : "Победа Dire"}
        </Winner>
        <ScoreTable>
          <Score className={"green"}>{sumKills(match!!.players.filter(it => it.team === 2))}</Score>
          <Duration>{formatDuration(match.duration)}</Duration>
          <Score className={"red"}>{sumKills(match!!.players.filter(it => it.team === 3))}</Score>
        </ScoreTable>
      </MatchResult>
      <Showcase>
        <TeamShowcase>
          <Team className={"green"}>Radiant</Team>
          <TeamTable players={match!!.players.filter(it => it.team === 2)} />
        </TeamShowcase>

        <TeamShowcase>
          <Team className={"red"}>Dire</Team>

          <TeamTable players={match!!.players.filter(it => it.team === 3)} />
        </TeamShowcase>
      </Showcase>
    </Layout>
  );
};

Page.getInitialProps = async (ctx: NextPageContext) => {
  const { id } = ctx.query;
  return {
    match: await fetchMatch(Number(id))
  };
};

export default Page;
