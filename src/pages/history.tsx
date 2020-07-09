import LadderRow, { LadderHeader, Table, Tr } from "../components/LadderRow";
import Layout from "../components/Layout";
import React, { useEffect, useState } from "react";
import { LadderElement, Match } from "../shared";
import api from "../service/api";
import styled from "styled-components";
import Router from "next/router";
import { formatDuration } from "./match/[id]";
import { formatDateStr } from "../utils/format/formateDateStr";
import Head from "next/head";
import cx from "classnames";
export const HeroPreview = styled.img`
  width: 60px;
  height: auto;
  margin: 4px;
`;

const Heroes = styled.div`
  display: flex;
  flex-direction: row;
`;

const MatchIdCol = styled.div`
  display: flex;
  flex-direction: column;
`;
export default () => {
  const [page, setPage] = useState(0);
  const [history, setHistory] = useState<Match[]>([]);

  useEffect(() => {
    const fetch = () => {
      api
        .get<Match[]>("/matches", { page })
        .then(it => {
          console.log(it);
          setHistory(it.data as Match[]);
        });
    };
    fetch();
    const int = setInterval(fetch, 10000);

    return () => clearInterval(int);
  }, [page]);

  return (
    <Layout title="dota2classic.ru 6.81b история матчей">
      <Head>
        <title>История матчей</title>
      </Head>
      <Table className="compact">
        <thead>
          <Tr>
            <th>ID матча</th>
            <th>Режим</th>
            <th>Победитель</th>
            <th>Длительность</th>
            <th className="green">Radiant team</th>
            <th className="red">Dire team</th>
          </Tr>
        </thead>
        <tbody>
          {history.map((it, index) => (
            <Tr
              className={cx("link", index % 2 === 0 ? "even" : "odd")}
              onClick={() => Router.push("/match/[id]", `/match/${it.id}`)}
            >
              <td className={"green tiny"}>
                <MatchIdCol>
                  <span>{it.id}</span>
                  <span style={{ fontSize: 14, marginTop: 2, color: "#c2c2c2" }}>{formatDateStr(it.timestamp)}</span>
                </MatchIdCol>
              </td>
              <td className={"tiny"}>{it.type === 0 ? "Ranked" : "Unranked"}</td>
              <td className={it.radiant_win ? "green" : "red"}>{it.radiant_win ? "Radiant" : "Dire"}</td>
              <td>{formatDuration(it.duration)}</td>
              <td className={it.radiant_win ? "green" : "red"}>
                <Heroes>
                  {it.players
                    .filter(it => it.team === 2)
                    .map(it => (
                      <HeroPreview src={`/static/heroes/${it.hero}.png`} />
                    ))}
                </Heroes>
              </td>
              <td className={it.radiant_win ? "red" : "green"}>
                <Heroes>
                  {it.players
                    .filter(it => it.team === 3)
                    .map(it => (
                      <HeroPreview src={`/static/heroes/${it.hero}.png`} />
                    ))}
                </Heroes>
              </td>
            </Tr>
          ))}
        </tbody>
      </Table>
    </Layout>
  );
};
