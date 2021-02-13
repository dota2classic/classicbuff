import styled from "styled-components";
import { colors } from "../../../shared";
import { TournamentStandingDto } from "../../../api/back/models";
import Link from "next/link";
import { steamIdToNum } from "../../../utils/numSteamId";
import React from "react";
import cx from "classnames";

const PlayerPreview = styled.a`
  display: flex;
  margin-top: 10px;
  flex-direction: row;
  background: ${colors.darkBg2};
  color: ${colors.primaryText};
  text-decoration: none;
  & img {
    width: 40px;
    height: 40px;
    border-radius: 5px;
  }
  transition: 0.3s ease;
  padding: 4px;
  border-radius: 4px;

  &:hover {
    background: ${colors.evenDarkerBg};
    box-shadow: 0px 0px 8px 1px rgba(255, 255, 255, 0.1);
  }

  & span.result {
    padding: 6px 10px;

    border-radius: 50%;
    width: 14px;
    max-width: 14px;
    
    align-self: center;
    font-weight: bold;
    font-size: 20px;
    height: 14px;
    max-height: 14px;

    text-align: center;
    display: flex;
    justify-content: center;
    align-items: center;
    
    margin-right: 5px;

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
  & span.text {
    display: flex;
    justify-content: center;
    font-size: 16px;
    align-items: center;
    padding-left: 10px;

    & .team-tag {
      color: ${colors.primaryTextDark};
    }
  }
`;

interface Props {
  standing: TournamentStandingDto;
}

export const PlayerLeaderboardPreview = ({ standing }: Props) => {
  return (
    <Link href={`/player/${steamIdToNum(standing.profile!!.id)}`} passHref>
      <PlayerPreview>
        <span className={cx("result", `position_${standing.position}`)}>{standing.position}</span>
        <img src={standing.profile!!.avatar} alt="" />
        <span className="text">{standing.profile!!.name}</span>
      </PlayerPreview>
    </Link>
  );
};
