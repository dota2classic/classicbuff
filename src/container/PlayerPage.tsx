import React, { useEffect, useState } from "react";
import { Tab, Tabs } from "../components/Tabs";
import { Table, Tr } from "../components/LadderRow";
import HeroIcon from "../components/HeroIcon";
import PlayerMatch from "../components/PlayerMatch";
import usePlayerPage from "../data/usePlayerPage";
import Pagination from "../components/Pagination";
import SmartTable from "../components/SmartTable";
import Router from "next/router";
import { steamIdToNum } from "../utils/numSteamId";
import getHeroRating from "../utils/getHeroRating";

interface Props {
  steam_id: string;
}

interface HeroSummaryInfo {
  hero: string;
  games: number;
  winrate: number;
  kda: number;
  gpm: number;
  xpm: number;
  last_hits: number;
  denies: number;
  rating: number;
  steamId: string;
}

const HeroSummaryRow = (it: HeroSummaryInfo) => (
  <Tr key={`${it.hero}`} className="link" onClick={() => Router.push(`/player/${steamIdToNum(it.steamId)}/${it.hero}`)}>
    <td>
      <HeroIcon hero={it.hero} />
    </td>
    <td>{it.games}</td>
    <td>{it.winrate.toFixed(2)}%</td>
    <td>{it.kda.toFixed(2)}</td>
    <td>{it.gpm.toFixed(0)}</td>
    <td>{it.xpm.toFixed(0)}</td>
    <td className={"omit"}>{Number(it.last_hits).toFixed(0)}</td>
    <td className={"omit"}> {Number(it.denies).toFixed(0)}</td>
  </Tr>
);

export default (p: Props) => {
  const [page, setPage] = useState(0);

  const { data } = usePlayerPage(p.steam_id, page);

  const [tab, setTab] = useState(0);

  const overall = data?.PlayerStats.overall;

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
              <Tab>Winrate: {((overall.wins / Math.max(overall.games, 1)) * 100).toFixed(2)}%</Tab>
            </Tabs>
          )}

          <SmartTable
            data={(data?.PlayerStats.heroes || []).map(it => ({
              winrate: (Number(it.wins) / Math.max(it.games, 1)) * 100,
              hero: it.hero,
              games: it.games,
              kda: it.kda,
              gpm: it.gpm,
              xpm: it.xpm,
              last_hits: it.last_hits,
              denies: it.denies,
              steamId: p.steam_id,
              rating: getHeroRating(it)
            }))}
            defaultSort="rating"
            renderRow={HeroSummaryRow}
            sort={{
              hero: it => it.hero,
              kda: it => it.kda,
              winrate: it => it.winrate,
              games: it => it.games,
              denies: it => it.denies,
              last_hits: it => it.last_hits,
              gpm: it => it.gpm,
              xpm: it => it.xpm,
              rating: it => it.rating
            }}
            head={[
              { hero: "Герой" },
              { games: "Сыграно игр" },
              { winrate: "Winrate" },
              { kda: "KDA" },
              { xpm: "XPM" },
              { gpm: "GPM" },
              { last_hits: "LH" },
              { denies: "DN" }
            ]}
          />
        </>
      )}

      {tab === 0 && (
        <>
          <Table className={"compact"}>
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
              {data?.PlayerHistory.data.map((it, index) => (
                <PlayerMatch index={index} player={data?.Player} match={it} />
              ))}
            </tbody>
          </Table>
          {data?.PlayerHistory && (
            <Pagination
              pages={data?.PlayerHistory.pages}
              page={page}
              next={() => setPage(page + 1)}
              prev={() => setPage(Math.max(0, page - 1))}
            />
          )}
        </>
      )}
    </>
  );
};
