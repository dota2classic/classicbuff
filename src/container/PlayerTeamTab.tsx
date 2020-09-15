import styled from "styled-components";
import { useSubmitTeamInvitationMutation, useTeamInvitesQuery } from "../generated/sdk";
import { BaseGQLConfig } from "../shared";
import image from "../utils/image";
import Button from "../components/Button";
import Router from "next/router";
import React from "react";

const TeamInvitations = styled.div`
  display: flex;
  flex-direction: column;
`;

const TeamInvite = styled.div`
  display: flex;
  flex-direction: row;

  align-items: center;

  color: white;
  & img {
    border-radius: 50%;
    object-fit: cover;
    width: 60px;
    height: 60px;
    border: 1px solid rgba(255, 255, 255, 0.3);
    border-right: none;
  }

  & span {
    margin-left: 10px;
    margin-right: 10px;
    font-size: 20px;
  }
`;

export default () => {
  const { data, refetch } = useTeamInvitesQuery({
    ...BaseGQLConfig
  });

  const [submitInvite] = useSubmitTeamInvitationMutation();

  return (
    <>
      {data?.TeamInvitations?.length === 0 && <h3 style={{ color: "white" }}>Список приглашений в команду пуст.</h3>}
      {data?.TeamInvitations && data?.TeamInvitations.length > 0 && (
        <TeamInvitations>
          {data?.TeamInvitations.map(it => (
            <TeamInvite>
              <img src={image(it.team.image)} />
              <span>{it.team.name}</span>
              <Button
                onClick={async () => {
                  const data = await submitInvite({
                    variables: {
                      id: it.id,
                      accept: true
                    }
                  });
                  await Router.push(`/teams/[id]`, `/teams/${data?.data?.SubmitInvitation?.id}`);
                }}
              >
                Принять
              </Button>
              <Button
                onClick={async () => {
                  await submitInvite({
                    variables: {
                      id: it.id,
                      accept: false
                    }
                  });
                  await refetch();
                }}
              >
                Отклонить
              </Button>
            </TeamInvite>
          ))}
        </TeamInvitations>
      )}
    </>
  );
};
