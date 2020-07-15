import { Player } from "../shared";
import { steamIdToNum } from "../utils/numSteamId";
import { Tr } from "./LadderRow";
import Link from "next/link";
import HeroIcon from "./HeroIcon";
import ItemIcon from "./ItemIcon";
import React from "react";
import { ItemsContainer } from "../pages/match/[id]";

export default (p: Player) => {
  const items = p.items.split(",").map(it => it.substr(5));
  const playerUrl = `/player/${steamIdToNum(p.player.steam_id)}`;
  return (
    <Tr>
      <td>{p.level}</td>
      <td>
        <Link href={playerUrl}>
          <HeroIcon hero={p.hero} />
        </Link>
      </td>
      <td>
        <Link href={playerUrl}>{(p.player.name.length && p.player.name) || "(Пустой ник)"}</Link>
      </td>
      <td>
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
        {p.last_hits}/{p.denies}
      </td>
      <td>
        {p.gpm}/{p.xpm}
      </td>
    </Tr>
  );
};
