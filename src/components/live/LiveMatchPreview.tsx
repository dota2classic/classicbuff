import { LiveMatchDto } from "../../api/back/models";
import styled from "styled-components";
import React, { useState } from "react";
import formatGameMode from "../../utils/format/formatGameMode";
import { formatDuration } from "../../pages/match/[id]";
import Link from "next/link";
import { MinimapHero } from "./MinimapHero";
import { OldRequiredModal } from "../modal/OldRequiredModal";
import AuthService from "../../service/AuthServiceService";
import { useStores } from "../../stores";
import i18n from "./live-match.i18n";
const Container = styled.div`
  display: flex;
  flex-direction: row;
  text-decoration: none;
  width: 100%;

  & + & {
    margin-top: 5px;
  }
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
const GameInfo = styled.div`
  display: flex;
  flex-direction: column;
  color: #c2c2c2;
  flex: 1;
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
  const [oldRequiredOpen, setOldRequiredOpen] = useState(false);

  const host = match.server.split(":")[0];
  const port = parseInt(match.server.split(":")[1]);
  const watchUrl = `steam://connect/${host}:${port + 5}`;

  const { auth } = useStores();

  return (
    <Container>
      <OldRequiredModal open={oldRequiredOpen} close={() => setOldRequiredOpen(false)} />
      <Link href={`/match/[id]`} as={`/match/${match.matchId}`} passHref>
        <Map>
          {match.heroes.map(hero => (
            <MinimapHero key={hero.hero} x={hero.posX} y={hero.posY} hero={hero.hero} team={hero.team} small />
          ))}
        </Map>
      </Link>
      <GameInfo>
        <InfoRow>
          <div>{i18n.mode}</div>
          <div>{formatGameMode(match.type)}</div>
        </InfoRow>
        <InfoRow>
          <div>{i18n.inGameTime}</div>
          <div>{formatDuration(match.duration)}</div>
        </InfoRow>
        <InfoRow>
          <div>{i18n.score}</div>
          <div>
            <span className={"green"}>{rScore}</span>
            {" : "}
            <span className={"red"}>{dScore}</span>
          </div>
        </InfoRow>

        <InfoRow>
          {auth.hasOld ? (
            <a target={"__blank"} href={watchUrl}>
              {i18n.watchGame}
            </a>
          ) : (
            <span onClick={() => setOldRequiredOpen(true)}>{i18n.watchGame}</span>
          )}
        </InfoRow>
      </GameInfo>
    </Container>
  );
};
