import React, { useEffect, useState } from "react";
import Router, { useRouter } from "next/router";
import { numToSteamId, steamIdToNum } from "../../../utils/numSteamId";
import Layout from "../../../components/Layout";
import Head from "next/head";
import { NextPageContext } from "next";
import { Table, Tr } from "../../../components/LadderRow";
import PlayerMatch from "../../../components/PlayerMatch";
import Pagination from "../../../components/Pagination";
import { Tab, Tabs } from "../../../components/Tabs";
import Link from "next/link";
import { usePlayerHistoryQuery } from "../../../generated/sdk";
import { BaseGQLConfig } from "../../../shared";

const Page = () => {
  return null;
  // const { id, hero } = useRouter().query;
  //
  // const [page, setPage] = useState(0);
  //
  // const { data } = usePlayerHistoryQuery({
  //   ...BaseGQLConfig,
  //   variables: {
  //     sid: numToSteamId(Number(id)),
  //     hero: String(hero),
  //     page
  //   }
  // });
  // const player = data?.Player;
  //
  // return (
  //   <Layout
  //     title={
  //       <h3>
  //         {player?.name}, {player?.mmr} MMR
  //       </h3>
  //     }
  //   >
  //     <Head>
  //       <title>Профиль игрока {player?.name}</title>
  //     </Head>
  //
  //     <Tabs>
  //       <Tab>
  //         <Link href={`/player/${Number(id)}`} passHref>
  //           <a>Вернуться к игроку</a>
  //         </Link>
  //       </Tab>
  //     </Tabs>
  //     <Table className={"compact"}>
  //       <thead>
  //         <Tr>
  //           <th>ID</th>
  //           <th>Режим</th>
  //           <th style={{ width: 20, textOverflow: "ellipsis" }}>Длительность</th>
  //           <th>Герой</th>
  //           <th className={"omit"}>Предметы</th>
  //           <th>Результат</th>
  //           <th style={{ width: 40 }}>K</th>
  //           <th style={{ width: 40 }}>D</th>
  //           <th style={{ width: 40 }}>A</th>
  //           <th className={"omit"} style={{ width: 40 }}>
  //             L/D
  //           </th>
  //           <th className={"omit"} style={{ width: 40 }}>
  //             GPM/XPM
  //           </th>
  //         </Tr>
  //       </thead>
  //       <tbody>
  //         {data?.PlayerHistory.data?.map((it, index) => (
  //           <PlayerMatch index={index} player={data?.Player} match={it} />
  //         ))}
  //       </tbody>
  //     </Table>
  //     {data?.PlayerHistory && (
  //       <Pagination
  //         pages={data?.PlayerHistory.pages}
  //         page={page}
  //         next={() => setPage(page + 1)}
  //         prev={() => setPage(Math.max(0, page - 1))}
  //       />
  //     )}
  //   </Layout>
  // );
};

export default Page;
