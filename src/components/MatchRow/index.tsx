import { MatchDto } from "../../api/back/models";
import { Tr } from "../UI/Table";
import cx from "classnames";
import Router from "next/router";
import { Heroes, MatchIdCol } from "pages/stats/history";
import { DateFormatter, formatDateStr } from "../../utils/format/formateDateStr";
import formatGameMode from "../../utils/format/formatGameMode";
import { formatDuration } from "../../pages/stats/match/[id]";
import { HeroIcon } from "../UI/HeroIcon";
import React from "react";
import dotai18n from "shared-i18n/dota.i18n";
import { useStores } from "../../stores";
import { AppRouter } from "utils/route";
export default (it: MatchDto) => {
  const radiant = it.radiant;

  const stores = useStores();

  const dire = it.dire;

  return (
    <Tr className={cx("link")} onClick={() => AppRouter.match(it.id).open(false)}>
      <td className={"green tiny"}>
        <MatchIdCol>
          <span>{it.id}</span>
          <span style={{ fontSize: 14, marginTop: 2, color: "#c2c2c2" }}>
            <DateFormatter date={it.timestamp} />
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
