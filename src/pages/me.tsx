import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Router, { useRouter } from "next/router";
import { LadderElement, Match, PlayerStatsDto } from "../shared";
import api from "../service/api";
import Layout from "../components/Layout";
import { Table, Tr } from "../components/LadderRow";
import PlayerMatch from "../components/PlayerMatch";
import { numToSteamId } from "../utils/numSteamId";
import Head from "next/head";
import HeroIcon from "../components/HeroIcon";
import { Tab, Tabs } from "../components/Tabs";
import getHeroRating from "../utils/getHeroRating";
import { NextPageContext } from "next";
import useWillMount from "../utils/useWillMount";
import AuthService from "../service/AuthService";
import { observer } from "mobx-react";
import PlayerPage from "../container/PlayerPage";

export const HeroPreview = styled.img`
  width: 60px;
  height: auto;
  margin: 4px;
`;

interface PlayerInfo {
  matches: Match[];
  player: LadderElement;
}
const Hint = styled.a`
  font-size: 16px;
`;

const Page = observer(() => {
  useWillMount(() => {
    AuthService.fetchMe();
  });

  return (
    <Layout title={`Profile ${AuthService.me?.discord_id}`}>
      <Hint
        href="#"
        onClick={() => {
          AuthService.logout();
          return Router.push("/");
        }}
      >
        Выйти
      </Hint>
      {(AuthService.me?.steam_id && <PlayerPage steam_id={AuthService.me?.steam_id} />) || (
        <Hint href={`${api.getBaseURL()}/auth/steam`}>Подключи стим, чтобы увидеть свою статистику</Hint>
      )}
    </Layout>
  );
});

export default Page;
