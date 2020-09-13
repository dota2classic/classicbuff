import cx from "classnames";
import Router from "next/router";
import { formatDateStr } from "../utils/format/formateDateStr";
import formatGameMode, { MatchmakingMode } from "../utils/format/formatGameMode";
import { formatDuration } from "../pages/match/[id]";
import HeroIcon from "./HeroIcon";
import { Tr } from "./LadderRow";
import React from "react";
import { Heroes, MatchIdCol } from "../pages/history";
import { Match, MatchNoPlayersFragmentFragment } from "../generated/sdk";

export default (it: MatchNoPlayersFragmentFragment & { index: number }) => {
  const isMid = it.type === MatchmakingMode.SOLOMID;

  const radiant = it.players.filter(it => it.team === 2);

  const dire = it.players.filter(it => it.team === 3);

  return (
    <Tr
      className={cx("link", it.index % 2 === 0 ? "even" : "odd")}
      onClick={() => Router.push("/match/[id]", `/match/${it.id}`)}
    >
      <td className={"green tiny"}>
        <MatchIdCol>
          <span>{it.id}</span>
          <span style={{ fontSize: 14, marginTop: 2, color: "#c2c2c2" }}>{formatDateStr(it.timestamp)}</span>
        </MatchIdCol>
      </td>
      <td className={"tiny"}>{formatGameMode(it.type)}</td>
      <td className={it.radiant_win ? "green" : "red"}>{it.radiant_win ? "Radiant" : "Dire"}</td>
      <td>{formatDuration(it.duration)}</td>
      <td className={cx(it.radiant_win ? "green" : "red", "omit")}>
        <Heroes>
          {radiant.map(it => (
            <HeroIcon key={it.hero} hero={it.hero} />
          ))}{" "}
        </Heroes>
      </td>
      <td className={cx(it.radiant_win ? "red" : "green", "omit")}>
        <Heroes>
          {dire.map(it => (
            <HeroIcon key={it.hero} hero={it.hero} />
          ))}{" "}
        </Heroes>
      </td>
    </Tr>
  );
};
