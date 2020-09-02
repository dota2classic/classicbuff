import Router, { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout";
import Head from "next/head";
import { Table, Tr } from "../../components/LadderRow";
import cx from "classnames";
import { formatDateStr } from "../../utils/format/formateDateStr";
import { formatDuration } from "../match/[id]";
import HeroIcon from "../../components/HeroIcon";
import { Match } from "../../shared";
import api from "../../service/api";
import { Heroes, MatchIdCol } from "../history";
import heroName from "../../utils/heroName";
import MatchRow from "../../components/MatchRow";
import PlayerMatch from "../../components/PlayerMatch";
import useHeroHistory from "../../data/useHeroHistory";
import Pagination from "../../components/Pagination";

const fetchHistoryPage = async (hero: string): Promise<Match[]> => {
  const res = await api.get<Match[]>("/public/matches_hero", { hero });

  return res.data as Match[];
};

export default () => {
  const { id } = useRouter().query;

  const [page, setPage] = useState(0);

  const { data } = useHeroHistory(page, id as string);

  return (
    <Layout title={<h3>{heroName(id as string)}</h3>}>
      <Head>
        <title>{heroName(id as string)}</title>
      </Head>
      <Table className="compact">
        <thead>
          <Tr>
            <th>ID матча</th>
            <th>Режим</th>
            <th>Победитель</th>
            <th>Длительность</th>
            <th className="green omit">Radiant team</th>
            <th className="red omit">Dire team</th>
          </Tr>
        </thead>
        <tbody>
          {data?.HeroMatches.data.map((it, index) => (
            <PlayerMatch player={it.players.find(it => it.hero === id)!!} index={index} match={it} />
          ))}
        </tbody>
      </Table>
      {data?.HeroMatches && (
        <Pagination
          pages={data?.HeroMatches.pages}
          page={page}
          next={() => setPage(page + 1)}
          prev={() => setPage(Math.max(0, page - 1))}
        />
      )}
    </Layout>
  );
};
