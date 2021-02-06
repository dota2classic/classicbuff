import { CompactTeamDto, TeamDto } from "../../../api/back/models";
import styled from "styled-components";
import { colors } from "../../../shared";
import Link from "next/link";
import React from "react";

const Card = styled.a`
  display: flex;
  flex-direction: row;
  color: ${colors.primaryText};
  text-decoration: none;
  flex: 1;
`;

const TournamentName = styled.div`
  font-size: 20px;
  &.tag {
    color: ${colors.roles.old};
  }
`;

const TournamentType = styled.div``;

const TournamentImage = styled.img`
  height: 100px;

  &.compact {
    height: 50px;
  }
`;

const InfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  padding-left: 10px;
`;

interface Props {
  team: TeamDto;
}

export default ({ team }: Props) => {
  return (
    <Link passHref href={`/team/${team.id}`}>
      <Card>
        <TournamentImage src={team.imageUrl} />
        <InfoContainer>
          <TournamentName>{team.name}</TournamentName>
          <TournamentName className="tag">{team.tag}</TournamentName>
          <TournamentType>{team.members.length} игроков</TournamentType>
        </InfoContainer>
      </Card>
    </Link>
  );
};

interface CompactProps {
  team: CompactTeamDto;
}

export const CompactTeamCard = ({ team }: CompactProps) => {
  return (
    <Link passHref href={`/team/${team.id}`}>
      <Card>
        <TournamentImage className="compact" src={team.imageUrl} />
        <InfoContainer>
          <TournamentName>{team.name}</TournamentName>
        </InfoContainer>
      </Card>
    </Link>
  );
};
