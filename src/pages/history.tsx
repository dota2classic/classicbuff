import LadderRow, { LadderHeader, Table, Tr } from "../components/LadderRow";
import Layout from "../components/Layout";
import React, { useEffect, useState } from "react";
import { LadderElement, Match } from "../shared";
import api from "../service/api";
import styled from "styled-components";
import Router from "next/router";

export const HeroPreview = styled.img`
  width: 60px;
  height: auto;
  margin: 4px;
`;

const TeamTd = styled.div`
  display: flex;
  flex-direction: column;

  & span {
    margin-bottom: 10px;
  }
`;

const Heroes = styled.div`
  display: flex;
  flex-direction: row;
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
      <Table>
        <thead>
          <Tr>
            <th>ID</th>
            <th>Режим</th>
            <th>Radiant team</th>
            <th>Dire team</th>
          </Tr>
        </thead>
        <tbody>
          {history.map(it => (
            <Tr onClick={() => Router.push("/match/[id]", `/match/${it.id}`)}>
              <td className={"green"}>{it.id}</td>
              <td>{it.type === 0 ? "Ranked" : "Unranked"}</td>
              <td className={it.radiant_win ? "green" : "red"}>
                <TeamTd>
                  <span>{!it.radiant_win ? "Поражение" : "Победа"}</span>
                  <Heroes>
                    {it.players
                      .filter(it => it.team === 2)
                      .map(it => (
                        <HeroPreview src={`/static/heroes/${it.hero}.png`} />
                      ))}
                  </Heroes>
                </TeamTd>
              </td>
              <td className={it.radiant_win ? "red" : "green"}>
                <TeamTd>
                  <span>{it.radiant_win ? "Поражение" : "Победа"}</span>
                  <Heroes>
                    {it.players
                      .filter(it => it.team === 3)
                      .map(it => (
                        <HeroPreview src={`/static/heroes/${it.hero}.png`} />
                      ))}
                  </Heroes>
                </TeamTd>
              </td>
            </Tr>
          ))}
        </tbody>
      </Table>
    </Layout>
  );
};
