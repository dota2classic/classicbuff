import { steamIdToNum } from "../utils/numSteamId";
import { Tr } from "./LadderRow";
import Link from "next/link";
import HeroIcon from "./HeroIcon";
import ItemIcon from "./ItemIcon";
import React from "react";
import { ItemsContainer } from "../pages/match/[id]";
import { PlayerInMatchDto } from "../api/back/models";

export default (p: PlayerInMatchDto) => {
  const items = p.items.map(it => it.substr(5));
  const playerUrl = `/player/${steamIdToNum(p.steamId)}`;
  return (
    <Tr>
      <td>{p.level}</td>
      <td>
        <Link href={playerUrl}>
          <a>
            <HeroIcon hero={p.hero} />
          </a>
        </Link>
      </td>
      <td>
        <Link href={playerUrl}>{(p.name.length && p.name) || "(Пустой ник)"}</Link>
      </td>
      <td className={"omit"}>
        <ItemsContainer>
          {items.map((it, index) => (
            <ItemIcon key={index} item={it} />
          ))}
        </ItemsContainer>
      </td>
      <td>{p.kills}</td>
      <td>{p.deaths}</td>
      <td>{p.assists}</td>
      <td>
        {p.lastHits}/{p.denies}
      </td>
      <td>
        {p.gpm}/{p.xpm}
      </td>
    </Tr>
  );
};
