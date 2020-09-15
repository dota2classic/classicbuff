import { Tab, Tabs } from "../components/Tabs";
import SmartTable from "../components/SmartTable";
import getHeroRating from "../utils/getHeroRating";
import React from "react";
import { usePlayerStatsQuery } from "generated/sdk";
import { BaseGQLConfig } from "../shared";
import { Tr } from "../components/LadderRow";
import Router from "next/router";
import { steamIdToNum } from "../utils/numSteamId";
import HeroIcon from "../components/HeroIcon";

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

export default (props: Props) => {
  const { data } = usePlayerStatsQuery({
    ...BaseGQLConfig,
    variables: {
      steam_id: props.steam_id
    }
  });

  const overall = data?.PlayerStats.overall;

  const heroesData = data?.PlayerStats.heroes || [];
  return (
    <>
      {overall && (
        <Tabs>
          <Tab>Игр сыграно: {overall.games}</Tab>
          <Tab>Winrate: {((overall.wins / Math.max(overall.games, 1)) * 100).toFixed(2)}%</Tab>
        </Tabs>
      )}

      <SmartTable
        data={heroesData.map(it => ({
          winrate: (Number(it.wins) / Math.max(it.games, 1)) * 100,
          hero: it.hero,
          games: it.games,
          kda: it.kda,
          gpm: it.gpm,
          xpm: it.xpm,
          last_hits: it.last_hits,
          denies: it.denies,
          steamId: props.steam_id,
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
          { games: "Сыграно матчей" },
          { winrate: "Winrate" },
          { kda: "KDA" },
          { xpm: "XPM" },
          { gpm: "GPM" },
          { last_hits: "LH" },
          { denies: "DN" }
        ]}
      />
    </>
  );
};
