import React from "react";
import { useRouter } from "next/router";
import { numToSteamId } from "../../../utils/numSteamId";
import Layout from "../../../components/Layout";
import Head from "next/head";
import PlayerPage from "../../../container/PlayerPage";
import { useApi } from "../../../api/hooks";

const Page = () => {
  const { id } = useRouter().query;

  const { data: player } = useApi().playerApi.usePlayerControllerPlayerSummary(numToSteamId(Number(id)));

  return (
    <Layout
      title={
        <>
          <h3 style={{ textAlign: "center" }}>{player?.name}</h3>
          <h4 style={{ textAlign: "center" }}>
            {player?.rank} Ранг, {player?.mmr} MMR
          </h4>
        </>
      }
    >
      <Head>
        <title>Профиль игрока {player?.name}</title>
      </Head>
      <PlayerPage steam_id={numToSteamId(Number(id))} />
    </Layout>
  );
};

export default Page;
