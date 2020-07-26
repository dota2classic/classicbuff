import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Router, { useRouter } from "next/router";
import { LadderElement, Match, PlayerStatsDto } from "../../shared";
import api from "../../service/api";
import Layout from "../../components/Layout";
import { Table, Tr } from "../../components/LadderRow";
import PlayerMatch from "../../components/PlayerMatch";
import { Score } from "../match/[id]";
import { numToSteamId } from "../../utils/numSteamId";
import Head from "next/head";
import HeroIcon from "../../components/HeroIcon";
import { Tab, Tabs } from "../../components/Tabs";
import getHeroRating from "../../utils/getHeroRating";
import { NextPageContext } from "next";
import PlayerPage from "../../container/PlayerPage";

export const HeroPreview = styled.img`
  width: 60px;
  height: auto;
  margin: 4px;
`;

interface PlayerInfo {
  matches: Match[];
  player: LadderElement;
}

const fetchPlayer = async (id: number): Promise<[Match[], LadderElement, PlayerStatsDto[]]> => {
  const formattedId = numToSteamId(Number(id));
  const res: any = await api.get<PlayerInfo>("/player", { steam_id: formattedId });
  const res2: any = await api.get<PlayerStatsDto[]>("/player/stats", { steam_id: formattedId });

  const s = res2.data;
  s.heroes.sort((a: PlayerStatsDto, b: PlayerStatsDto) => getHeroRating(b) - getHeroRating(a));

  return [res.data.matches, res.data.player, s.heroes];
};

const Page = () => {
  const { id } = useRouter().query;
  const [player, setPlayer] = useState<LadderElement | undefined>();

  useEffect(() => {
    const fetch = async () => {
      const res: any = await api.get<PlayerInfo>("/player", { steam_id: numToSteamId(Number(id)) });
      console.log(res.data);
      setPlayer(res.data.player);
    };
    fetch();
  }, [id]);

  return (
    <Layout
      title={
        <div>
          <div style={{ fontSize: 20 }}>{player?.name}</div>
          <div style={{ fontSize: 14, marginTop: 20 }}>{player?.mmr} MMR</div>
        </div>
      }
    >
      <Head>
        <title>Профиль игрока {player?.name}</title>
      </Head>
      <PlayerPage steam_id={numToSteamId(Number(id))} />
    </Layout>
  );
};

Page.getInitialProps = async (ctx: NextPageContext) => {
  const { id } = ctx.query;

  const [history, player, stats] = await fetchPlayer(Number(id));
  return {
    history,
    player,
    stats
  };
};

export default Page;
