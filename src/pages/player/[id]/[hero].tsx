import React, { useState } from "react";
import { useRouter } from "next/router";
import { numToSteamId } from "../../../utils/numSteamId";
import Layout from "../../../components/Layout";
import Head from "next/head";
import { Role, Table, Tr } from "../../../components/LadderRow";
import PlayerMatch from "../../../components/PlayerMatch";
import Pagination from "../../../components/Pagination";
import { Tab, Tabs } from "../../../components/Tabs";
import Link from "next/link";
import { useApi } from "../../../api/hooks";
import { RoleNames, RoleValue } from "../../../utils/format/roles";

const Page = () => {
  const { id, hero } = useRouter().query;

  const [page, setPage] = useState(0);

  const steamId = numToSteamId(Number(id));
  const { data } = useApi().matchApi.useMatchControllerPlayerMatches(steamId, page, undefined, undefined, String(hero));

  const { data: player } = useApi().playerApi.usePlayerControllerPlayerSummary(numToSteamId(Number(id)));
  const highestRole = player?.roles.sort((a, b) => RoleValue[b] - RoleValue[a])[0] || "PLAYER";

  return (
    <Layout
      title={
        <>
          <h3 style={{ textAlign: "center", display: "flex", flexDirection: "row", alignItems: "center" }}>
            <Role className={highestRole}>
              <div>{RoleNames[highestRole]}</div>
            </Role>
            {player?.name}
          </h3>
          <h4 style={{ textAlign: "center" }}>
            {player?.rank} Ранг, {player?.mmr} MMR
          </h4>
        </>
      }
    >
      <Head>
        <title>Профиль игрока {player?.name}</title>
      </Head>

      <Tabs>
        <Tab>
          <Link href={`/player/${Number(id)}`} passHref>
            <a>Вернуться к игроку</a>
          </Link>
        </Tab>
      </Tabs>
      <Table className={"compact"}>
        <thead>
          <Tr>
            <th>ID</th>
            <th>Режим</th>
            <th style={{ width: 20, textOverflow: "ellipsis" }}>Длительность</th>
            <th>Герой</th>
            <th className={"omit"}>Предметы</th>
            <th>Результат</th>
            <th style={{ width: 40 }}>K</th>
            <th style={{ width: 40 }}>D</th>
            <th style={{ width: 40 }}>A</th>
            <th className={"omit"} style={{ width: 40 }}>
              L/D
            </th>
            <th className={"omit"} style={{ width: 40 }}>
              GPM/XPM
            </th>
          </Tr>
        </thead>
        <tbody>
          {data?.data.map((it, index) => (
            <PlayerMatch index={index} player={steamId} match={it} />
          ))}
        </tbody>
      </Table>
      {data && (
        <Pagination
          pages={data?.pages}
          page={page}
          next={() => setPage(page + 1)}
          prev={() => setPage(Math.max(0, page - 1))}
        />
      )}
    </Layout>
  );
};

export default Page;
