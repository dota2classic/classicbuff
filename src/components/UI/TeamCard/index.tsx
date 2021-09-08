import { CompactTeamDto, TeamDto, TournamentStandingDto } from "../../../api/back/models";
import styled from "styled-components";
import { colors } from "../../../shared";
import Link from "next/link";
import React from "react";
import cx from "classnames";
import { AppRouter } from "utils/route";

const Card = styled.a`
  display: flex;
  flex-direction: row;
  color: ${colors.primaryText};
  text-decoration: none;
  flex: 1;

  background: ${colors.evenDarkerBg};
  color: ${colors.primaryText};
  margin-top: 10px;

  transition: 0.3s ease;
  padding: 8px;
  align-items: center;
  border-radius: 4px;

  &:hover {
    background: ${colors.evenDarkerBg};
    box-shadow: 0px 0px 8px 1px rgba(255, 255, 255, 0.1);
  }
  
   & span.result {
    
    padding: 6px 10px;

    border-radius: 50%;
    width: 50px;
    max-width: 50px;
    
    align-self: center;
    font-weight: normal;
    font-size: 20px;
    height: 14px;
    max-height: 14px;

    text-align: center;
    display: flex;
    justify-content: center;
    align-items: center;
    
    margin-right: 5px;
    
    &.outsider {
     font-size: 12px;
     color: ${colors.primaryText};
    }

    color: ${colors.position.foreground.shit};
    //background-color: ${colors.position.background.shit};

    &.position_1 {
      //background-color: ${colors.position.background.gold};
      color: ${colors.position.foreground.gold};
    }

    &.position_2 {
      //background-color: ${colors.position.background.silver};
      color: ${colors.position.foreground.silver};
    }

    &.position_3 {
      //background-color: ${colors.position.background.bronze};
      color: ${colors.position.foreground.bronze};
    }
  }
`;

const TournamentName = styled.div`
  font-size: 20px;
  margin-left: 20px;
  &.tag {
    color: ${colors.roles.old};
  }
`;

const TournamentImage = styled.img`
  height: 30px;
  width: 30px;

  border-radius: 4px;
  object-fit: cover;
  &.compact {
    height: 50px;
  }
`;
interface Props {
  team: CompactTeamDto;
}

export default ({ team }: Props) => {
  return (
    <Link {...AppRouter.team.team(team.id).link}>
      <Card>
        <TournamentImage src={team.imageUrl} />
        <TournamentName>{team.name}</TournamentName>
      </Card>
    </Link>
  );
};

interface StandingProps {
  standing: TournamentStandingDto;
}
export const TeamLeaderboardCard = ({ standing }: StandingProps) => {
  return (
    <Link passHref href={`/team/${standing.team!!.id}`}>
      <Card>
        <span
          className={cx(
            "result",
            `position_${standing.position}`,
            Number.isNaN(Number(standing.position)) && "outsider"
          )}
        >
          {standing.position}
        </span>
        <TournamentImage src={standing.team!!.imageUrl} />
        <TournamentName>{standing.team!!.name}</TournamentName>
      </Card>
    </Link>
  );
};

interface CompactProps {
  team: CompactTeamDto;
}
