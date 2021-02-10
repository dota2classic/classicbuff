import { SeedItemDto } from "../../../api/back/models";
import React from "react";
import TeamCard from "../TeamCard";
import { TeamMemberPreview } from "../TeamMemberPreview";
import Link from "next/link";
import styled from "styled-components";
import { colors } from "../../../shared";
import { steamIdToNum } from "../../../utils/numSteamId";

const Card = styled.a`
  display: flex;
  flex-direction: column;
  align-items: center;

  color: ${colors.primaryText};
  text-decoration: none;
  flex: 1;
`;

const TournamentName = styled.div`
  font-size: 20px;
  &.tag {
    color: ${colors.roles.old};
  }

  &.win {
    color: ${colors.dota.green};
  }
  &.loss {
    color: ${colors.dota.red};
  }
`;

const TournamentType = styled.div``;

const TournamentImage = styled.img`
  height: 100px;
  border-radius: 4px;
  width: 100px;

  object-fit: cover;

  &.compact {
    height: 50px;
  }
`;

export interface Props {
  seed: SeedItemDto;
}
export const OpponentPreview = ({ seed }: Props) => {
  if (seed.isTeam) {
    return <TeamCard team={seed.team!!} />;
  } else {
    return <TeamMemberPreview profile={seed.profile!!} />;
  }
};

export const BigOpponentPreview = ({ seed }: Props) => {
  if (seed.isTeam) {
    return (
      <Link passHref href={`/team/${seed.team!!.id}`}>
        <Card>
          <TournamentImage src={seed.team!!.imageUrl} />
          <TournamentName>{seed.team!!.name}</TournamentName>
          {seed.result && <TournamentName className={seed.result}>{seed.result === "win" ? 1 : 0}</TournamentName>}
        </Card>
      </Link>
    );
  } else {
    return (
      <Link passHref href={`/player/${steamIdToNum(seed.profile!!.id)}`}>
        <Card>
          <TournamentImage src={seed.profile!!.avatar} />
          <TournamentName>{seed.profile!!.name}</TournamentName>
          {seed.result && <TournamentName className={seed.result}>{seed.result === "win" ? 1 : 0}</TournamentName>}
        </Card>
      </Link>
    );
  }
};
