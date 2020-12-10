import Head from "next/head";
import Layout from "../../components/Layout";
import React from "react";
// import api from "../../service/api";
import HeroSummaryRow from "../../components/HeroSummaryRow";
import SmartTable from "../../components/SmartTable";
// import { HeroSummary, useHeroesQuery } from "../../generated/sdk";
import { BaseGQLConfig } from "../../shared";

export interface HeroSummaryPresentation {
  hero: string;
  index: number;
  kda: number;
  winrate: number;
  games: number;
}

export default () => {
  // const { data } = useHeroesQuery({
  //   ...BaseGQLConfig
  // });

  return null;
  // const data: any = undefined;
  //
  // return (
  //   <Layout title="Герои">
  //     <Head>
  //       <title>Герои - dota2classic.ru</title>
  //       <meta name="description" content="dota2classic.ru - список героев и их успеваемость" />
  //     </Head>
  //
  //     <SmartTable
  //       data={(data?.Heroes || []).map((it, index) => ({
  //         index,
  //         hero: it.hero,
  //         winrate: (it.wins / Math.max(it.games, 1)) * 100,
  //         kda: (it.kills + it.assists) / Math.max(it.deaths, 1),
  //         games: it.games
  //       }))}
  //       renderRow={HeroSummaryRow}
  //       defaultSort="hero"
  //       reverse
  //       sort={{
  //         hero: it => it.hero,
  //         kda: it => it.kda,
  //         winrate: it => it.winrate,
  //         games: it => it.games
  //       }}
  //       head={[{ index: "" }, { hero: "Герой" }, { games: "Сыграно матчей" }, { winrate: "Winrate" }, { kda: "KDA" }]}
  //     />
  //   </Layout>
  // );
};
