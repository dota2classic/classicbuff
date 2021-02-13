import { steamIdToNum } from "../../../utils/numSteamId";
import Link from "next/link";
import React from "react";
import styled from "styled-components";
import { colors } from "../../../shared";
import { PlayerPreviewDto } from "../../../api/back/models";
import Button from "../Button";

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
  & span {
    display: flex;
    font-size: 16px;
    align-items: center;
    padding-left: 10px;
    flex: 1;
    text-align: left;

    & .team-tag {
      color: ${colors.primaryTextDark};
    }
  }
`;

interface Props {
  profile?: PlayerPreviewDto;
  onKick?: () => void;
}

export const TeamMemberPreview = ({ profile, onKick }: Props) => {
  if (profile)
    return (
      <Link href={`/player/${steamIdToNum(profile.id)}`} passHref>
        <PlayerPreview>
          <img src={profile.avatar} alt="" />
          <span>{profile.name}</span>
          {onKick && (
            <Button
              onClick={e => {
                e.preventDefault();
                onKick();
              }}
              className="small"
            >
              Кикнуть
            </Button>
          )}
        </PlayerPreview>
      </Link>
    );

  return (
    <PlayerPreview>
      <img
        src={
          "https://steamcdn-a.akamaihd.net/steamcommunity/public/images/avatars/b5/b5bd56c1aa4644a474a2e4972be27ef9e82e517e_full.jpg"
        }
        alt=""
      />
      <span>TBD</span>
    </PlayerPreview>
  );
};
