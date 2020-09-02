import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Router, { useRouter } from "next/router";
import usePlayer, { prefetchPlayer } from "../../../data/usePlayer";
import { numToSteamId } from "../../../utils/numSteamId";
import Layout from "../../../components/Layout";
import Head from "next/head";
import PlayerPage from "../../../container/PlayerPage";
import { NextPageContext } from "next";
import { Match, Player } from "../../../shared";

interface InitialProps {
  data?: { Player: Player };
}
const Page = (p: InitialProps) => {
  const { id } = useRouter().query;

  console.log(id, Number(id), useRouter().query.id);
  const { data } = usePlayer(numToSteamId(Number(id)), p.data);

  const player = data?.Player;

  return (
    <Layout
      title={
        <h3>
          {player?.name}, {player?.mmr} MMR
        </h3>
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

  const data = await prefetchPlayer(numToSteamId(Number(id)));
  return { data };
};

export default Page;
