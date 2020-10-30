import styled from "styled-components";
import { TeamEntity, useTeamQuery, useUpdateTeamMutation } from "../../../generated/sdk";
import ImageUploader from "../../../components/ImageUploader";
import image from "../../../utils/image";
import React, { useEffect, useState } from "react";
import Button, { LinkButton } from "../../../components/Button";
import { useModal } from "react-modal-hook";
import InviteMemberModal from "../../../components/InviteMemberModal";
import { useRouter } from "next/router";
import { BaseGQLConfig } from "../../../shared";
import AuthService from "../../../service/AuthService";
import Layout from "../../../components/Layout";
import Head from "next/head";
import Roster from "../../../components/Roster";
import Link from "next/link";

const TeamLayout = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
`;

const TeamName = styled.div`
  font-size: 24px;
  margin-top: 20px;
  margin-bottom: 40px;
  color: white;
`;

const TeamLogo = styled.img`
  border-radius: 50%;
  object-fit: cover;
  width: 200px;
  height: 200px;
  border: 1px solid rgba(255, 255, 255, 0.3);

  &.editable {
    transition: 0.3s ease;
    cursor: hand;
    &:hover {
      box-shadow: 0 20px 20px -5px rgba(255, 252, 252, 0.1), 0 0px 0px 0px rgba(255, 255, 255, 0.04);
    }
  }
`;

export const LogoContainer = ({
  team,
  isMember,
  revalidate
}: {
  revalidate: () => void;
  isMember: boolean;
  team?: TeamEntity;
}) => {
  const [updateTeam] = useUpdateTeamMutation();
  if (isMember) {
    return (
      <ImageUploader
        onChange={async e => {
          if (team) {
            await updateTeam({
              variables: {
                id: team.id,
                image: e.id
              }
            });
            revalidate();
          }
        }}
      >
        <TeamLogo className="editable" src={team?.image && image(team?.image)} />
      </ImageUploader>
    );
  }

  return <TeamLogo src={team?.image && image(team?.image)} />;
};

const InviteContainer = ({
  team,
  isMember,
  revalidate
}: {
  revalidate: () => void;
  isMember: boolean;
  team?: TeamEntity;
}) => {
  const [showModal, hideModal] = useModal(() => <InviteMemberModal team={team} hide={hideModal} />, [team]);

  if (!isMember) return null;

  return (
    <div>
      <Link href={`/teams/${team?.id}/edit`}>
        <LinkButton>Редактировать команду</LinkButton>
      </Link>
      <span style={{ marginLeft: 20 }} />
      <Button onClick={showModal}>Пригласить игрока</Button>
    </div>
  );
};

export default () => {
  const { id } = useRouter().query;

  const { data, refetch } = useTeamQuery({
    ...BaseGQLConfig,
    variables: {
      id: Number(id)
    }
  });

  const team: TeamEntity | undefined = data?.Team as any;

  // const isCreator: boolean = data?.Team.creator?.discord_id === AuthService.me?.discord_id;
  const isCreator: boolean = false;

  return (
    <Layout>
      <Head>
        <title>{data?.Team.name || "Загрузка..."}</title>
      </Head>
      <LogoContainer revalidate={refetch} isMember={isCreator} team={team} />
      <TeamName>{team?.name}</TeamName>;
      <InviteContainer revalidate={refetch} isMember={isCreator} team={team} />
      <TeamLayout>{team && <Roster refetch={refetch} {...team} />}</TeamLayout>
    </Layout>
  );
};
