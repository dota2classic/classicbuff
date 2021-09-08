import Layout from "components/Layout";
import Head from "next/head";
import heroName from "utils/heroName";
import React from "react";
import { Table, Tr } from "components/UI/Table";
import { useRouter } from "next/router";
import { useApi } from "api/hooks";
import { useTab } from "utils/useTab";
import Pagination from "components/Pagination";
import PlayerMatch from "components/PlayerMatch";

export default () => {
  const { id } = useRouter().query;

  const [page, setPage] = useTab("page", 0);

  const tab4sure = page || 0;

  const { data } = useApi().matchApi.useMatchControllerHeroMatches(tab4sure, id as string);

  return (
    <Layout>
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
          {data?.data.map((it, index) => (
            <PlayerMatch
              player={[...it.radiant, ...it.dire].find(it => it.hero === id)!!.steamId}
              index={index}
              match={it}
            />
          ))}
        </tbody>
      </Table>

      {data && (
        <Pagination
          pages={data?.pages}
          page={page || 0}
          next={() => setPage(tab4sure + 1)}
          prev={() => setPage(Math.max(0, tab4sure - 1))}
        />
      )}
    </Layout>
  );
};
