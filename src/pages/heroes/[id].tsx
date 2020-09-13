import Router, { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout";
import Head from "next/head";
import { Table, Tr } from "../../components/LadderRow";
import { BaseGQLConfig } from "../../shared";
import api from "../../service/api";
import heroName from "../../utils/heroName";
import PlayerMatch from "../../components/PlayerMatch";
import Pagination from "../../components/Pagination";
import { Match, useHeroHistoryQuery } from "../../generated/sdk";

export default () => {
  const { id } = useRouter().query;

  const [page, setPage] = useState(0);

  const { data } = useHeroHistoryQuery({
    ...BaseGQLConfig,
    variables: {
      page,
      hero: id as string
    }
  });

  return (
    <Layout title={<h3>{heroName(id as string)}</h3>}>
      <Head>
        <title>{heroName(id as string)}</title>
      </Head>
      <Table className="compact">
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
          {data?.HeroMatches.data?.map((it, index) => (
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
