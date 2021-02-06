import { numToSteamId } from "../../../utils/numSteamId";
import Link from "next/link";
import React from "react";
import styled from "styled-components";
import { colors } from "../../../shared";
import { PlayerPreviewDto } from "../../../api/back/models";

const PlayerPreview = styled.a`
  display: flex;
  flex-direction: row;
  color: ${colors.primaryText};
  text-decoration: none;
  & img {
    width: 40px;
    height: 40px;
    border-radius: 5px;
  }

  & span {
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
  profile: PlayerPreviewDto;
}

export const TeamMemberPreview = ({ profile }: Props) => {
  return (
    <Link href={`/player/${numToSteamId(profile.id)}`} passHref>
      <PlayerPreview>
        <img src={profile.avatar} alt="" />
        <span>{profile.name}</span>
      </PlayerPreview>
    </Link>
  );
};
