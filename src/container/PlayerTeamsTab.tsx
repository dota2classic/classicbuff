import { appApi, useApi } from "../api/hooks";
import { TeamInvitationDto } from "../api/back/models";
import React from "react";
import styled from "styled-components";
import { colors } from "../shared";
import Button from "../components/UI/Button";

interface Props {
  inv: TeamInvitationDto;
  revalidate: () => void;
}

const Card = styled.a`
  display: flex;
  flex-direction: row;
  color: ${colors.primaryText};
  text-decoration: none;
  flex: 1;

  background: ${colors.darkBg2};
  color: ${colors.primaryText};
  margin-top: 10px;

  transition: 0.3s ease;
  padding: 8px;
  align-items: center;
  border-radius: 4px;
  
  
  & ${Button}{
    margin-left: 10px;
    margin-right: 10px;
  }

  &:hover {
    background: ${colors.transparentTint3};
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

const TeamInvitePreview = ({ inv, revalidate }: Props) => {
  const submitResult = (accept: boolean) =>
    appApi.team.teamControllerSubmitInvite(inv.inviteId, { accept }).then(revalidate);

  return (
    <Card>
      <TournamentImage src={inv.team.imageUrl} />
      <TournamentName>{inv.team.name}</TournamentName>

      <Button className="small" onClick={() => submitResult(true)}>
        Принять
      </Button>
      <Button className="small" onClick={() => submitResult(false)}>
        Отклонить
      </Button>
    </Card>
  );
};

export const PlayerTeamsTab = () => {
  const { data, revalidate } = useApi().team.useTeamControllerGetInvites();

  return (
    <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
      {data?.map(inv => (
        <TeamInvitePreview revalidate={revalidate} inv={inv} />
      ))}
    </div>
  );
};