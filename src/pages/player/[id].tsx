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

  return (
    <Layout title={`Профиль игрока`}>
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
