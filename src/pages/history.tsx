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
import HeroIcon from "../components/HeroIcon";
import { NextPageContext } from "next";

const Heroes = styled.div`
  display: flex;
  flex-direction: row;
`;

const MatchIdCol = styled.div`
  display: flex;
  flex-direction: column;
`;

const NextButton = styled.button`
  border: none;
  color: #c2c2c2;
  font-size: 20px;
  padding: 8px;
  margin-top: 10px;
  border-radius: 4px;
  cursor: pointer;
  transition: 0.3s ease;
  &:hover {
    background: rgba(0, 0, 0, 0.3);
  }
  background: rgba(0, 0, 0, 0.1);
`;

const fetchHistoryPage = async (page: number): Promise<Match[]> => {
  const res = await api.get<Match[]>("/matches", { page });

  return res.data as Match[];
};

const Page = (p: Partial<{ history: Match[] }>) => {
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(false);
  const [history, setHistory] = useState<Match[]>(p.history || []);

  const fetch = async () => {
    const items = await fetchHistoryPage(page);
    const newH = [...history];

    items.forEach(it => {
      if (!newH.find(z => z.id === it.id)) {
        newH.push(it);
      }
    });
    setHasMore(items.length === 30);
    setHistory(newH);
  };

  useEffect(() => {
    const int = setInterval(fetch, 10000);

    return () => clearInterval(int);
  });

  useEffect(() => {
    fetch();
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
                      <HeroIcon key={it.hero} hero={it.hero} />
                    ))}
                </Heroes>
              </td>
              <td className={it.radiant_win ? "red" : "green"}>
                <Heroes>
                  {it.players
                    .filter(it => it.team === 3)
                    .map(it => (
                      <HeroIcon key={it.hero} hero={it.hero} />
                    ))}
                </Heroes>
              </td>
            </Tr>
          ))}
        </tbody>
      </Table>
      {hasMore && (
        <NextButton
          onClick={() => {
            setPage(page + 1);
          }}
        >
          More
        </NextButton>
      )}
    </Layout>
  );
};

Page.getInitialProps = async (ctx: NextPageContext) => {
  const history = await fetchHistoryPage(0);
  return {
    history
  };
};

export default Page;
