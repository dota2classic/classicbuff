import { HeroSummary } from "../shared";
import React from "react";
import { Tr } from "./LadderRow";
import HeroIcon from "./HeroIcon";
import cx from "classnames";
import heroes from "../texts/heroes";
import Router from "next/router";
import heroName from "../utils/heroName";

export default (p: HeroSummary & { index: number }) => {
  return (
    <Tr
      onClick={() => Router.push("/heroes/[id]", `/heroes/${p.hero}`)}
      className={cx("link", p.index % 2 === 0 ? "even" : "odd")}
    >
      <td>
        <HeroIcon hero={p.hero} />
      </td>
      <td style={{ textTransform: "capitalize" }}>{heroName(p.hero)}</td>
      <td>{p.games}</td>
      <td>{((p.wins / Math.max(p.games, 1)) * 100).toFixed(2)}%</td>
      <td>{((p.kills + p.assists) / Math.max(p.deaths, 1)).toFixed(2)}</td>
    </Tr>
  );
};
