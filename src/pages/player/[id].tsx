import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Router, { useRouter } from "next/router";
import { LadderElement, Match, PlayerStatsDto } from "../../shared";
import api from "../../service/api";
import Layout from "../../components/Layout";
import { Table, Tr } from "../../components/LadderRow";
import PlayerMatch from "../../components/PlayerMatch";
import { Score } from "../match/[id]";
import { numToSteamId } from "../../utils/numSteamId";
import Head from "next/head";
import HeroIcon from "../../components/HeroIcon";
import { Tab, Tabs } from "../../components/Tabs";
import getHeroRating from "../../utils/getHeroRating";
import { NextPageContext } from "next";

export const HeroPreview = styled.img`
  width: 60px;
  height: auto;
  margin: 4px;
`;

interface PlayerInfo {
  matches: Match[];
  player: LadderElement;
}

const fetchPlayer = async (id: number): Promise<[Match[], LadderElement, PlayerStatsDto[]]> => {
  const formattedId = numToSteamId(Number(id));
  const res: any = await api.get<PlayerInfo>("/player", { steam_id: formattedId });
  const res2: any = await api.get<PlayerStatsDto[]>("/player/stats", { steam_id: formattedId });

  const s = res2.data;
  s.heroes.sort((a: PlayerStatsDto, b: PlayerStatsDto) => getHeroRating(b) - getHeroRating(a));

  return [res.data.matches, res.data.player, s.heroes];
};

interface Props {
  history: Match[];
  player: LadderElement;
  stats: PlayerStatsDto[];
}
const Page = (props: Partial<Props>) => {
  const { id } = useRouter().query;

  const [history, setHistory] = useState<Match[]>(props.history || []);
  const [player, setPlayer] = useState<LadderElement | undefined>(props.player);
  const [stats, setStats] = useState<PlayerStatsDto[]>(props.stats || []);

  useEffect(() => {
    const fetch = async () => {
      if (!id) return;
      const [history, player, stats] = await fetchPlayer(Number(id));
      setHistory(history);
      setStats(stats);
      setPlayer(player);
    };

    if (!player) fetch();
    const int = setInterval(fetch, 10000);

    return () => clearInterval(int);
  }, [id]);

  const [tab, setTab] = useState(0);
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

      <Tabs>
        <Tab className={(tab == 0 && "active") || undefined} onClick={() => setTab(0)}>
          История матчей
        </Tab>
        <Tab className={(tab == 1 && "active") || undefined} onClick={() => setTab(1)}>
          Общая статистика
        </Tab>
      </Tabs>

      {tab === 1 && (
        <Table className="compact">
          <thead>
            <Tr>
              <th style={{ width: 100 }}>Герой</th>
              <th style={{ width: 60 }}>Игр</th>
              <th style={{ width: 60 }}>Winrate</th>
              <th style={{ width: 60 }}>KDA</th>
              <th style={{ width: 60 }}>GPM</th>
              <th style={{ width: 60 }}>XPM</th>
              <th style={{ width: 60 }}>Last hits</th>
              <th style={{ width: 60 }}>Denies</th>
            </Tr>
          </thead>
          <tbody>
            {stats.map(it => (
              <Tr key={`${it.hero}${it.id}${it.gpm}${it.xpm}${it.kda}`}>
                <td>
                  <HeroIcon hero={it.hero} />
                </td>
                <td>{it.games}</td>
                <td>{((Number(it.wins) / it.games) * 100).toFixed(2)}%</td>
                <td>{it.kda.toFixed(2)}</td>
                <td>{it.gpm.toFixed(0)}</td>
                <td>{it.xpm.toFixed(0)}</td>
                <td>{Number(it.last_hits).toFixed(0)}</td>
                <td>{Number(it.denies).toFixed(0)}</td>
              </Tr>
            ))}
          </tbody>
        </Table>
      )}

      {tab === 0 && (
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
              <th style={{ width: 40 }}>L/D</th>
              <th style={{ width: 40 }}>GPM/XPM</th>
            </Tr>
          </thead>
          <tbody>
            {history.map((it, index) => (
              <PlayerMatch index={index} player={player} match={it} />
            ))}
          </tbody>
        </Table>
      )}
    </Layout>
  );
};

Page.getInitialProps = async (ctx: NextPageContext) => {
  const { id } = ctx.query;

  const [history, player, stats] = await fetchPlayer(Number(id));
  return {
    history,
    player,
    stats
  };
};

export default Page;
