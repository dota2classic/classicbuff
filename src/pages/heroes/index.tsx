import Head from "next/head";
import Layout from "../../components/Layout";
import React, { useEffect, useState } from "react";
import { HeroSummary, Match } from "../../shared";
import api from "../../service/api";
import { Table, Tr } from "../../components/LadderRow";
import PlayerMatch from "../../components/PlayerMatch";
import HeroSummaryRow from "../../components/HeroSummaryRow";
import SmartTable from "../../components/SmartTable";

const fetchHeroes = async (): Promise<HeroSummary[]> => {
  const res = await api.get<HeroSummary[]>("/heroes");

  return (res.data as HeroSummary[]).sort(function(a, b) {
    if (a.hero < b.hero) {
      return -1;
    }
    if (a.hero > b.hero) {
      return 1;
    }
    return 0;
  });
};

export interface HeroSummaryPresentation {
  hero: string;
  index: number;
  kda: number;
  winrate: number;
  games: number;
}

export default () => {
  const [heroes, setHeroes] = useState<HeroSummaryPresentation[]>([]);

  useEffect(() => {
    const fetch = () => {
      fetchHeroes().then(its =>
        setHeroes(
          its.map((it, index) => ({
            index,
            hero: it.hero,
            winrate: (it.wins / Math.max(it.games, 1)) * 100,
            kda: (it.kills + it.assists) / Math.max(it.deaths, 1),
            games: it.games
          }))
        )
      );
    };

    fetch();
    const int = setInterval(fetch, 1000);
    return () => clearInterval(int);
  }, []);

  return (
    <Layout title={<h1>Герои</h1>}>
      <Head>
        <title>Герои - dota2classic.ru</title>
        <meta name="description" content="dota2classic.ru - список героев и их успеваемость" />
      </Head>

      <SmartTable<HeroSummaryPresentation>
        data={heroes}
        renderRow={HeroSummaryRow}
        sort={{
          hero: it => it.hero,
          kda: it => it.kda,
          winrate: it => it.winrate,
          games: it => it.games
        }}
        head={[{ index: "" }, { hero: "Герой" }, { games: "Сыграно игр" }, { winrate: "Winrate" }, { kda: "KDA" }]}
      />
    </Layout>
  );
};
