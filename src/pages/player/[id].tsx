import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Router, { useRouter } from "next/router";
import { LadderElement, Match } from "../../shared";
import api from "../../service/api";
import Layout from "../../components/Layout";
import { Table, Tr } from "../../components/LadderRow";
import PlayerMatch from "../../components/PlayerMatch";
import { Score } from "../match/[id]";
import { numToSteamId } from "../../utils/numSteamId";
import Head from "next/head";

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

interface PlayerInfo {
  matches: Match[];
  player: LadderElement;
}

const PlayerName = styled.div`
  color: #c2c2c2;
  font-size: 24px;
  margin-bottom: 40px;
`;
export default () => {
  const { id } = useRouter().query;

  const [history, setHistory] = useState<Match[]>([]);
  const [player, setPlayer] = useState<LadderElement>();

  useEffect(() => {
    const fetch = async () => {
      if (!id) return;
      const formattedId = numToSteamId(Number(id));
      const res: any = await api.get<PlayerInfo>("/player", { steam_id: formattedId });
      setHistory(res.data.matches);
      setPlayer(res.data.player);
    };
    fetch();
    const int = setInterval(fetch, 10000);

    return () => clearInterval(int);
  }, [id]);

  if (!player) return null;

  return (
    <Layout
      title={
        <div>
          <div style={{ fontSize: 20 }}>{player.name}</div>
          <div style={{ fontSize: 14, marginTop: 20 }}>{player.mmr} MMR</div>
        </div>
      }
    >
      <Head>
        <title>Профиль игрока {player.name}</title>
      </Head>
      <Table className={"compact"}>
        <thead>
          <Tr>
            <th>ID</th>
            <th>Длительность</th>
            <th>Герой</th>
            <th>Предметы</th>
            <th>Результат</th>
            <th style={{ width: 40 }}>K</th>
            <th style={{ width: 40 }}>D</th>
            <th style={{ width: 40 }}>A</th>
          </Tr>
        </thead>
        <tbody>
          {history.map((it, index) => (
            <PlayerMatch index={index} player={player} match={it} />
          ))}
        </tbody>
      </Table>
    </Layout>
  );
};
