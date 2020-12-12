import { LiveMatchDto } from "../../api/back/models";
import styled from "styled-components";
import React from "react";
import formatGameMode from "../../utils/format/formatGameMode";
import { formatDuration } from "../../pages/match/[id]";
import Link from "next/link";

const Container = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  text-decoration: none;
`;

const Map = styled.a`
  margin-left: 20px;
  margin-right: 20px;
  width: 150px;
  height: 150px;
  overflow: hidden;
  position: relative;
  background-size: contain;
  background-image: url("https://cdn.discordapp.com/attachments/680541777454956552/680767904672907333/Minimap_pre6.png");
`;

const Hero = styled.img<{ x: number; y: number }>`
  width: 15px;
  height: 15px;
  object-fit: cover;
  position: absolute;
  transition: 0.3s ease;
  left: ${p => p.x * 100}%;
  bottom: ${p => p.y * 100}%;
  border-radius: 20%;
`;

const GameInfo = styled.div`
  display: flex;
  flex-direction: column;
  color: #c2c2c2;
`;

const InfoRow = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  & div + div {
    margin-left: 40px;
  }

  & a {
    text-decoration: none;
    color: white;
  }

  & .green {
    color: #92a525;
  }

  & .red {
    color: #c23c2a;
  }
`;
export const LiveMatchPreview = (match: LiveMatchDto) => {
  const rScore = match.heroes.filter(t => t.team === 2).reduce((a, b) => a + b.kills, 0);
  const dScore = match.heroes.filter(t => t.team === 3).reduce((a, b) => a + b.kills, 0);

  const host = match.server.split(":")[0];
  const port = parseInt(match.server.split(":")[1]);
  const watchUrl = `${host}:${port + 5}`;
  return (
    <Container>
      <Link href={`/match/[id]`} as={`/match/${match.matchId}`} passHref>
        <Map>
          {match.heroes.map(hero => (
            <Hero
              key={hero.hero}
              x={hero.posX}
              y={hero.posY}
              src={`https://dota2classic.ru/api/static/heroes/${hero.hero}.jpg`}
            />
          ))}
        </Map>
      </Link>
      <GameInfo>
        <InfoRow>
          <div>Режим</div>
          <div>{formatGameMode(match.type)}</div>
        </InfoRow>
        <InfoRow>
          <div>Время в игре</div>
          <div>{formatDuration(match.duration)}</div>
        </InfoRow>
        <InfoRow>
          <div>Счет</div>
          <div>
            <span className={"green"}>{rScore}</span>
            {" : "}
            <span className={"red"}>{dScore}</span>
          </div>
        </InfoRow>

        <InfoRow>
          <a target={"__blank"} href={watchUrl}>
            Смотреть игру в клиенте
          </a>
        </InfoRow>
      </GameInfo>
    </Container>
  );
};
