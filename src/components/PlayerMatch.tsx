import { LadderElement, Match } from "../shared";
import Router from "next/router";
import { Tr } from "./LadderRow";
import React from "react";
import { HeroPreview } from "../pages/player/[id]";
import { formatDuration } from "../pages/match/[id]";

export interface PlayerMatchInfo {
  player: LadderElement;
  match: Match;
}
export default ({ match, player }: PlayerMatchInfo) => {
  const pim = match.players.find(it => it.player.steam_id === player.steam_id)!!;
  const isWin = match.radiant_win ? pim.team === 2 : pim.team === 3;
  return (
    <Tr onClick={() => Router.push("/match/[id]", `/match/${match.id}`)}>
      <td className={"green"}>{match.id}</td>
      <td>{formatDuration(match.duration)}</td>

      <td>
        <HeroPreview src={`/static/heroes/${pim.hero}.png`} />
      </td>
      <td className={isWin ? "green" : "red"}>
        <span>{!isWin ? "Поражение" : "Победа"}</span>
      </td>
      <td>{pim.kills}</td>
      <td>{pim.deaths}</td>
      <td>{pim.assists}</td>
    </Tr>
  );
};
