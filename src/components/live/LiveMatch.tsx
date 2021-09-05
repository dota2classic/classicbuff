import styled from "styled-components";
import React, { useState } from "react";
import { ItemIcon } from "../UI/ItemIcon";
import formatGameMode from "../../utils/format/formatGameMode";
import { LiveMatchDto, PlayerInfo } from "../../api/back/models";
import { formatDuration } from "../../pages/match/[id]";
import { LinkButton } from "../UI/Button";
import Link from "next/link";
import { steamIdToNum } from "../../utils/numSteamId";
import { AdBanner } from "../ads/ads";
import { MinimapHero } from "./MinimapHero";
import { PlayerHover } from "../UI/PlayerHover";
import { useStores } from "../../stores";
import i18n from "./live-match.i18n";
const Map = styled.div`
  margin-left: 20px;
  margin-right: 20px;
  width: 450px;
  overflow: hidden;
  height: 450px;
  position: relative;
  background-size: contain;
  background-image: url("https://cdn.discordapp.com/attachments/680541777454956552/680767904672907333/Minimap_pre6.png");
`;

const TeamInfo = styled.div`
  display: flex;
  flex-direction: column;
  width: 300px;
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
`;

const PlayerRow = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;

  & + & {
    margin-top: 20px;
  }
`;

const PlayerHeroRow = styled.div`
  display: flex;
  flex-direction: row;

  & .player-wrap {
    flex: 1;
    max-width: 175px;
  }

  & .player-name {
    white-space: nowrap;
    flex: 1;
    overflow: hidden;
    text-overflow: ellipsis;
    text-decoration: none;
    color: #c2c2c2;
    transition: 0.3s ease;

    &:hover {
      color: white;
    }
  }

  & img {
    width: auto;
    height: 30px;
    margin-right: 10px;
  }

  align-items: center;

  color: white;
`;

const KDA = styled.div`
  & span {
    margin-right: 5px;
  }
`;
const ItemRow = styled.div`
  display: flex;
  flex-direction: row;
  margin-top: 2px;
`;

const KDAItems = styled.div`
  display: flex;
  flex-direction: row;
  margin-left: 20px;
`;

const TeamScore = styled.div`
  display: flex;
  color: white;
  font-size: 20px;
  padding: 8px;
  align-items: center;
  justify-content: center;
  &.green {
    color: #92a525;
  }

  &.red {
    color: #c23c2a;
  }
`;
interface Props {
  heroes: PlayerInfo[];
  team: number;
}
const TeamInfoBlock = ({ heroes, team }: Props) => {
  return (
    <TeamInfo>
      <TeamScore className={team === 2 ? "green" : "red"}>{heroes.reduce((a, b) => a + b.kills, 0)}</TeamScore>
      {heroes.map(hero => (
        <PlayerRow key="hero">
          <PlayerHeroRow>
            <img src={`https://dota2classic.ru/api/static/heroes/${hero.hero}.jpg.webp`} alt="" />
            {hero.bot ? (
              <span className="player-name">{"Бот"}</span>
            ) : (
              <PlayerHover className="player-wrap" steam_id={hero.steamId}>
                <Link href={`/player/${steamIdToNum(hero.steamId)}`}>
                  <a className="player-name">{hero.name}</a>
                </Link>
              </PlayerHover>
            )}
            <KDAItems>
              <KDA>{hero.kills}/</KDA>
              <KDA>{hero.deaths}/</KDA>
              <KDA>{hero.assists}</KDA>
            </KDAItems>
          </PlayerHeroRow>
          <ItemRow>
            {hero.items.map(item => (
              <ItemIcon small item={item.replace("item_", "")} />
            ))}
          </ItemRow>
        </PlayerRow>
      ))}
    </TeamInfo>
  );
};

const MatchInfo = styled.div`
  padding-top: 20px;
  display: flex;
  flex-direction: column;
  width: fit-content;

  & + & {
    margin-top: 20px;
    border-top: 1px solid #515151;
  }
`;

const MatchOverview = styled.div`
  display: flex;
  flex-direction: column;
  color: #c2c2c2;
  font-size: 20px;
  align-items: center;
  justify-content: center;
  margin-bottom: 20px;

  & a {
    margin-top: 20px;
    color: #c2c2c2;

    text-decoration: none;
  }
`;
export const LiveMatch = (liveMatch: LiveMatchDto) => {
  const r = liveMatch.heroes.filter(t => t.team === 2);
  const d = liveMatch.heroes.filter(t => t.team === 3);

  const host = liveMatch.server.split(":")[0];
  const port = parseInt(liveMatch.server.split(":")[1]);
  const watchUrl = `steam://connect/${host}:${port + 5}`;

  const { auth } = useStores();

  return (
    <MatchInfo>
      <AdBanner />
      <MatchOverview>
        <div>{formatGameMode(liveMatch.type)}</div>
        <div>{formatDuration(liveMatch.duration)}</div>
      </MatchOverview>
      <Wrapper>
        <TeamInfoBlock team={2} heroes={r} />
        <Map>
          {liveMatch.heroes.map(hero => (
            <MinimapHero key={hero.hero} x={hero.posX} y={hero.posY} hero={hero.hero} team={hero.team} />
          ))}
        </Map>
        <TeamInfoBlock team={3} heroes={d} />
      </Wrapper>
      <MatchOverview>
        <LinkButton target={"__blank"} href={watchUrl}>
          {i18n.watchGame}
        </LinkButton>
      </MatchOverview>
    </MatchInfo>
  );
};
