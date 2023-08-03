import { MatchDto } from "../../api/back/models";
import { Tr } from "../UI/Table";
import cx from "classnames";
import { Heroes, MatchIdCol } from "pages/stats/history";
import { DateFormatter } from "../../utils/format/formateDateStr";
import formatGameMode from "../../utils/format/formatGameMode";
import { formatDuration } from "../../pages/stats/match/[id]";
import { HeroIcon } from "../UI/HeroIcon";
import React from "react";
import dotai18n from "shared-i18n/dota.i18n";
import { useStores } from "../../stores";
import { AppRouter } from "utils/route";
import Link from "next/link";
import { colors } from "shared";

export default (match: MatchDto) => {
  const radiant = match.radiant;

  const stores = useStores();

  const dire = match.dire;

  return (
    <Tr>
      <td className={"green tiny"}>
        <Link {...AppRouter.match(match.id).link}>
          <MatchIdCol>
            <span style={{ color: colors.dota.green }}>{match.id}</span>
            <span style={{ fontSize: 14, marginTop: 2, color: "#c2c2c2" }}>
              <DateFormatter date={match.timestamp} />
            </span>
          </MatchIdCol>
        </Link>
      </td>
      <td className={"tiny"}>{formatGameMode(match.mode)}</td>
      <td className={match.winner === 2 ? "green" : "red"}>{match.winner === 2 ? dotai18n.radiant : dotai18n.dire}</td>
      <td>{formatDuration(match.duration)}</td>
      <td className={cx(match.winner === 2 ? "green" : "red", "omit")}>
        <Heroes>
          {radiant.map(it => (
            <Link {...AppRouter.match(match.id).link} key={it.hero}>
              <HeroIcon key={it.hero} hero={it.hero} />
            </Link>
          ))}{" "}
        </Heroes>
      </td>
      <td className={cx(match.winner === 2 ? "green" : "red", "omit")}>
        <Heroes>
          {dire.map(it => (
            <Link {...AppRouter.match(match.id).link} key={it.hero}>
              <HeroIcon key={it.hero} hero={it.hero} />
            </Link>
          ))}{" "}
        </Heroes>
      </td>
    </Tr>
  );
};
