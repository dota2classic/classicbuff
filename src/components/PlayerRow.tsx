import { steamIdToNum } from "../utils/numSteamId";
import Link from "next/link";
import { HeroIcon } from "./UI/HeroIcon";
import { ItemIcon } from "./UI/ItemIcon";
import React, { useState } from "react";
import { ItemsContainer } from "../pages/match/[id]";
import { PlayerInMatchDto } from "../api/back/models";
import { Tr } from "./UI/Table";
import { isBot } from "../utils/isBot";
import { PlayerHover } from "./UI/PlayerHover";
import styled from "styled-components";
import Button from "./UI/Button";
import { ReportModal } from "./modal/ReportModal/ReportModal";
import { useModal } from "react-modal-hook";

const UserName = styled.a`
  white-space: nowrap;
  flex: 1;
  overflow: hidden;
  text-overflow: ellipsis;
  text-decoration: none;
  color: #c2c2c2;
  transition: 0.3s ease;
`;
export default (p: PlayerInMatchDto & { reportable: boolean; matchId: number }) => {
  const items = p.items.map(it => it.substr(5));
  const playerUrl = `/player/${steamIdToNum(p.steamId)}`;

  const [open, setOpen] = useState(false);
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
      <td style={{ maxWidth: 250 }}>
        {isBot(p.steamId) ? (
          <span>Бот</span>
        ) : (
          <PlayerHover steam_id={p.steamId}>
            <Link passHref href={playerUrl}>
              <UserName className="player-name">{(p.name.length && p.name) || "(Пустой ник)"}</UserName>
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
      {p.reportable && (
        <th>
          <ReportModal reported={p} matchId={p.matchId} close={() => setOpen(false)} open={open} />
          <Button className="small" onClick={() => setOpen(true)}>
            Жалоба
          </Button>
        </th>
      )}
    </Tr>
  );
};
