import React from "react";
import { Tr } from "./LadderRow";
import HeroIcon from "./UI/HeroIcon";
import cx from "classnames";
import Router from "next/router";
import heroName from "../utils/heroName";
import { HeroSummaryPresentation } from "../pages/heroes";

export default (p: HeroSummaryPresentation) => {
  return (
    <Tr onClick={() => Router.push("/heroes/[id]", `/heroes/${p.hero}`)} className={cx("link")}>
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
