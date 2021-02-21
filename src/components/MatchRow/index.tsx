import { MatchDto } from "../../api/back/models";
import { Tr } from "../UI/Table";
import cx from "classnames";
import Router from "next/router";
import { Heroes, MatchIdCol } from "../../pages/history";
import { formatDateStr } from "../../utils/format/formateDateStr";
import formatGameMode from "../../utils/format/formatGameMode";
import { formatDuration } from "../../pages/match/[id]";
import { HeroIcon } from "../UI/HeroIcon";
import React from "react";
import dotai18n from "shared-i18n/dota.i18n";
import { stores } from "../../stores";
export default (it: MatchDto) => {
  const radiant = it.radiant;

  const dire = it.dire;

  return (
    <Tr className={cx("link")} onClick={() => Router.push("/match/[id]", `/match/${it.id}`)}>
      <td className={"green tiny"}>
        <MatchIdCol>
          <span>{it.id}</span>
          <span style={{ fontSize: 14, marginTop: 2, color: "#c2c2c2" }}>
            {formatDateStr(it.timestamp, stores.lang.locale)}
          </span>
        </MatchIdCol>
      </td>
      <td className={"tiny"}>{formatGameMode(it.mode)}</td>
      <td className={it.winner === 2 ? "green" : "red"}>{it.winner === 2 ? dotai18n.radiant : dotai18n.dire}</td>
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
