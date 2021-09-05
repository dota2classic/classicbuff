import React from "react";
import { useRouter } from "next/router";
import { numToSteamId } from "utils/numSteamId";
import Layout from "../../../components/Layout";
import Head from "next/head";
import PlayerPage from "../../../container/PlayerPage";
import { useApi } from "api/hooks";
import { RoleNames, RoleValue } from "utils/format/roles";
import { Role } from "components/LadderRow";
import { LinkButton } from "components/UI/Button";
import Link from "next/link";
import { observer } from "mobx-react";
import i18n from "pages-i18n/profile/profile.i18n";
import { useStores } from "stores";
const Page = () => {
  const { id } = useRouter().query;
  const { auth } = useStores();
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
        <h4 style={{ textAlign: "center" }}>{i18n.withValues.infoRow({ mmr: player?.mmr, rank: player?.rank })}</h4>
      </div>
      {auth.isModerator && (
        <Link href={"/admin/player/[id]"} as={`/admin/player/${id}`}>
          <LinkButton>В админке</LinkButton>
        </Link>
      )}

      <PlayerPage steam_id={numToSteamId(Number(id))} />
    </Layout>
  );
};

export default observer(Page);
