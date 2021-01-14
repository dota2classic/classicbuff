import React from "react";
import { useRouter } from "next/router";
import { numToSteamId } from "../../../utils/numSteamId";
import Layout from "../../../components/Layout";
import Head from "next/head";
import PlayerPage from "../../../container/PlayerPage";
import { useApi } from "../../../api/hooks";
import { RoleNames, RoleValue } from "../../../utils/format/roles";
import { Role } from "../../../components/LadderRow";
import AuthService from "../../../service/AuthServiceService";
import { LinkButton } from "../../../components/UI/Button";
import Link from "next/link";
import { observer } from "mobx-react";

const Page = () => {
  const { id } = useRouter().query;

  const { data: player } = useApi().playerApi.usePlayerControllerPlayerSummary(numToSteamId(Number(id)));

  const highestRole = player?.roles.sort((a, b) => RoleValue[b] - RoleValue[a])[0] || "PLAYER";

  return (
    <Layout>
      <Head>
        <title>Профиль игрока {player?.name}</title>
      </Head>
      <div style={{ color: "white" }}>
        <h3 style={{ textAlign: "center", display: "flex", flexDirection: "row", alignItems: "center" }}>
          <Role className={highestRole}>
            <div>{RoleNames[highestRole]}</div>
          </Role>
          {player?.name}
        </h3>
        <h4 style={{ textAlign: "center" }}>
          {player?.rank} Ранг, {player?.mmr} MMR
        </h4>
      </div>
      {AuthService.isAdmin && (
        <Link href={"/admin/player/[id]"} as={`/admin/player/${id}`}>
          <LinkButton>В админке</LinkButton>
        </Link>
      )}

      <PlayerPage steam_id={numToSteamId(Number(id))} />
    </Layout>
  );
};

export default observer(Page);
