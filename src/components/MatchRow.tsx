import cx from "classnames";
import Router from "next/router";
import { formatDateStr } from "../utils/format/formateDateStr";
import formatGameMode from "../utils/format/formatGameMode";
import { formatDuration } from "../pages/match/[id]";
import HeroIcon from "./HeroIcon";
import { Tr } from "./LadderRow";
import React from "react";
import { Heroes, MatchIdCol } from "../pages/history";
import { MatchDto, MatchDtoModeEnum } from "../api/back/models";

export default (it: MatchDto) => {
  const radiant = it.radiant;

  const dire = it.dire;

  return (
    <Tr className={cx("link")} onClick={() => Router.push("/match/[id]", `/match/${it.id}`)}>
      <td className={"green tiny"}>
        <MatchIdCol>
          <span>{it.id}</span>
          <span style={{ fontSize: 14, marginTop: 2, color: "#c2c2c2" }}>{formatDateStr(it.timestamp)}</span>
        </MatchIdCol>
      </td>
      <td className={"tiny"}>{formatGameMode(it.mode)}</td>
      <td className={it.winner === 2 ? "green" : "red"}>{it.winner === 2 ? "Свет" : "Тьма"}</td>
      <td>{formatDuration(it.duration)}</td>
      <td className={cx(it.winner === 2 ? "green" : "red", "omit")}>
        <Heroes>
          {radiant.map(it => (
            <HeroIcon key={it.hero} hero={it.hero} />
          ))}{" "}
        </Heroes>
      </td>
      <td className={cx(it.winner === 2 ? "green" : "red", "omit")}>
        <Heroes>
          {dire.map(it => (
            <HeroIcon key={it.hero} hero={it.hero} />
          ))}{" "}
        </Heroes>
      </td>
    </Tr>
  );
};
