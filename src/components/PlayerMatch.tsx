import React from "react";
import { formatDuration, ItemsContainer } from "pages/stats/match/[id]";
import { ItemIcon } from "./UI/ItemIcon";
import { DateFormatter } from "utils/format/formateDateStr";
import cx from "classnames";
import { HeroIcon } from "./UI/HeroIcon";
import formatGameMode from "../utils/format/formatGameMode";
import { MatchDto } from "api/back/models";
import { Tr } from "./UI/Table";
import i18n from "pages-i18n/profile/profile.i18n";
import { AppRouter } from "utils/route";
import Link from "next/link";
import { MatchIdCol } from "pages/stats/history";
import { colors } from "shared";

export interface PlayerMatchInfo {
  player: string;
  match: MatchDto;
  index: number;
}

const PlayerMatch = ({ match, player, index }: PlayerMatchInfo) => {
  const pim = [...match.radiant].concat(match.dire).find(it => it.steamId === player)!!;

  const isWin = match.winner === pim.team;
  const items = pim.items.map(it => it.substr(5));
  return (
    <Tr className={cx(index % 2 === 0 ? "even" : "odd")} onClick={() => AppRouter.match(match.id).open()}>
      <td className={"green"}>
        <Link {...AppRouter.match(match.id).link}>
          <MatchIdCol href={AppRouter.match(match.id).link.href}>
            <span style={{ color: colors.dota.green }}>{match.id}</span>
            <span style={{ fontSize: 12, marginTop: 2, color: "#c2c2c2" }}>
              <DateFormatter date={match.timestamp} />
            </span>
          </MatchIdCol>
        </Link>
      </td>
      <td>{formatGameMode(match.mode)}</td>
      <td>{formatDuration(match.duration)}</td>
      <td>
        <Link {...AppRouter.match(match.id).link}>
          <a href={AppRouter.match(match.id).link.href}>
            <HeroIcon hero={pim.hero} />
          </a>
        </Link>
      </td>
      <td className={"omit"}>
        <ItemsContainer>
          {items.map((it, index) => (
            <ItemIcon key={index} item={it} />
          ))}
        </ItemsContainer>
      </td>
      <td className={isWin ? "green" : "red"}>
        <span>{!isWin ? i18n.loss : i18n.win}</span>
      </td>
      <td>{pim.kills}</td>
      <td>{pim.deaths}</td>
      <td>{pim.assists}</td>
      <td className={"omit"}>
        {pim.lastHits}/{pim.denies}
      </td>
      <td className={"omit"}>
        {pim.gpm}/{pim.xpm}
      </td>
    </Tr>
  );
};

export default PlayerMatch;
