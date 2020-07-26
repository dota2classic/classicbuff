import { HeroSummary } from "../shared";
import React from "react";
import { Tr } from "./LadderRow";
import HeroIcon from "./HeroIcon";
import cx from "classnames";
import heroes from "../texts/heroes";
import Router from "next/router";
import heroName from "../utils/heroName";
import { HeroSummaryPresentation } from "../pages/heroes";

export default (p: HeroSummaryPresentation & { index: number }) => {
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
      <td>{p.winrate.toFixed(2)}%</td>
      <td>{p.kda.toFixed(2)}</td>
    </Tr>
  );
};
