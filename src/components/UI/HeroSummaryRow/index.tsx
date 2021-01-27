import React from "react";
import cx from "classnames";
import Router from "next/router";
import heroName from "../../../utils/heroName";
import { HeroIcon } from "../HeroIcon";
import { Tr } from "../Table";

export interface HeroSummaryPresentation {
  hero: string;
  kda: number;
  winrate: number;
  games: number;
}

export default (p: HeroSummaryPresentation) => {
  return (
    <Tr onClick={() => Router.push("/meta/heroes/[id]", `/meta/heroes/${p.hero}`)} className={cx("link")}>
      <td>
        <HeroIcon hero={p.hero} />
      </td>
      <td style={{ textTransform: "capitalize" }}>{heroName(p.hero)}</td>
      <td>{p.games}</td>
      <td>{p.winrate.toFixed(2)}%</td>
      <td>{p.kda.toFixed(2)}</td>
    </Tr>
  );
};
