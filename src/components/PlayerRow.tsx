import { steamIdToNum } from "../utils/numSteamId";
import Link from "next/link";
import { HeroIcon } from "./UI/HeroIcon";
import { ItemIcon } from "./UI/ItemIcon";
import React from "react";
import { ItemsContainer } from "../pages/match/[id]";
import { PlayerInMatchDto } from "../api/back/models";
import { Tr } from "./UI/Table";
import { isBot } from "../utils/isBot";
import { PlayerHover } from "./UI/PlayerHover";

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
        {isBot(p.steamId) ? (
          <span>Бот</span>
        ) : (
          <PlayerHover steam_id={p.steamId}>
            <Link passHref href={playerUrl}>
              <a>{(p.name.length && p.name) || "(Пустой ник)"}</a>
            </Link>
          </PlayerHover>
        )}
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
