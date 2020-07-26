import React, { useEffect, useState } from "react";
import { LadderElement, Match, PlayerStatsDto } from "../shared";
import Layout from "../components/Layout";
import Head from "next/head";
import { Tab, Tabs } from "../components/Tabs";
import { Table, Tr } from "../components/LadderRow";
import HeroIcon from "../components/HeroIcon";
import PlayerMatch from "../components/PlayerMatch";
import { numToSteamId } from "../utils/numSteamId";
import api from "../service/api";
import getHeroRating from "../utils/getHeroRating";

interface PlayerInfo {
  matches: Match[];
  player: LadderElement;
}
interface Overall {
  games: number;
  wins: number;
  loss: number;
}
const fetchPlayer = async (steam_id: string): Promise<[Match[], LadderElement, PlayerStatsDto[], Overall]> => {
  const res: any = await api.get<PlayerInfo>("/player", { steam_id });
  const res2: any = await api.get<PlayerStatsDto[]>("/player/stats", { steam_id });

  const s = res2.data;
  s.heroes.sort((a: PlayerStatsDto, b: PlayerStatsDto) => getHeroRating(b) - getHeroRating(a));

  return [res.data.matches, res.data.player, s.heroes, s.overall];
};

interface Props {
  steam_id: string;
}

export default (p: Props) => {
  const [history, setHistory] = useState<Match[]>([]);
  const [player, setPlayer] = useState<LadderElement | undefined>();
  const [stats, setStats] = useState<PlayerStatsDto[]>([]);
  const [overall, setOverall] = useState<Overall>();

  useEffect(() => {
    const fetch = async () => {
      const [history, player, stats, overall] = await fetchPlayer(p.steam_id);
      setHistory(history);
      setStats(stats);
      setPlayer(player);
      setOverall(overall);
    };

    if (!player) fetch();
    const int = setInterval(fetch, 10000);

    return () => clearInterval(int);
  }, [p.steam_id]);

  const [tab, setTab] = useState(0);
  if (!player) return null;

  return (
    <>
      <Tabs>
        <Tab className={(tab == 0 && "active") || undefined} onClick={() => setTab(0)}>
          История матчей
        </Tab>
        <Tab className={(tab == 1 && "active") || undefined} onClick={() => setTab(1)}>
          Общая статистика
        </Tab>
      </Tabs>

      {tab === 1 && (
        <>
          {overall && (
            <Tabs>
              <Tab>Игр сыграно: {overall.games}</Tab>
              <Tab>Winrate: {((overall.wins / overall.games) * 100).toFixed(2)}%</Tab>
            </Tabs>
          )}
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
        </>
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
    </>
  );
};
