import Head from "next/head";
import Layout from "../../components/Layout";
import React, { useEffect, useState } from "react";
import { HeroSummary, Match } from "../../shared";
import api from "../../service/api";
import { Table, Tr } from "../../components/LadderRow";
import PlayerMatch from "../../components/PlayerMatch";
import HeroSummaryRow from "../../components/HeroSummaryRow";

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

export default () => {
  const [heroes, setHeroes] = useState<HeroSummary[]>([]);

  useEffect(() => {
    const fetch = () => {
      fetchHeroes().then(setHeroes);
    };

    fetch();
    const int = setInterval(fetch, 10000);
    return () => clearInterval(int);
  }, []);

  return (
    <Layout title={<h1>Герои</h1>}>
      <Head>
        <title>Герои - dota2classic.ru</title>
        <meta name="description" content="dota2classic.ru - список героев и их успеваемость" />
      </Head>
      <Table className={"compact"}>
        <thead>
          <Tr>
            <th />
            <th>Герой</th>
            <th>Игр</th>
            <th>Winrate</th>
            <th>KDA</th>
          </Tr>
        </thead>
        <tbody>
          {heroes.map((it, index) => (
            <HeroSummaryRow {...it} index={index} />
          ))}
        </tbody>
      </Table>
    </Layout>
  );
};
