import Layout from "../../../components/Layout";
import Head from "next/head";
import React from "react";
import SmartTable from "../../../components/SmartTable";
import { useApi } from "../../../api/hooks";
import HeroSummaryRow from "components/UI/HeroSummaryRow";

export default () => {
  const { data } = useApi().metaApi.useMetaControllerHeroes();

  return (
    <Layout>
      <Head>
        <title>Герои - dota2classic.ru</title>
        <meta name="description" content="dota2classic.ru - список героев и их успеваемость" />
      </Head>

      <SmartTable
        data={(data || []).map((it, index) => ({
          index,
          hero: it.hero,
          winrate: (it.wins / Math.max(it.games, 1)) * 100,
          kda: (it.kills + it.assists) / Math.max(it.deaths, 1),
          games: it.games
        }))}
        defaultSort={"hero"}
        reverse
        renderRow={HeroSummaryRow}
        sort={{
          hero: it => it.hero,
          kda: it => it.kda,
          winrate: it => it.winrate,
          games: it => it.games
        }}
        head={[{ index: "" }, { hero: "Герой" }, { games: "Сыграно матчей" }, { winrate: "Winrate" }, { kda: "KDA" }]}
      />
    </Layout>
  );
};
