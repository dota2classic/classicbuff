import React from "react";
import { useRouter } from "next/router";
import { numToSteamId } from "../../../utils/numSteamId";
import Layout from "../../../components/Layout";
import Head from "next/head";
import PlayerPage from "../../../container/PlayerPage";
import { usePlayerQuery } from "generated/sdk";
import { BaseGQLConfig } from "../../../shared";

const Page = () => {
  const { id } = useRouter().query;

  const { data } = usePlayerQuery({
    ...BaseGQLConfig,
    variables: {
      id: numToSteamId(Number(id))
    }
  });

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

export default Page;
