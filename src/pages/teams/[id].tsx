import Layout from "../../components/Layout";
import Head from "next/head";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import styled from "styled-components";
import Roster from "../../components/Roster";
import image from "../../utils/image";
import AuthService from "../../service/AuthService";
import ImageUploader from "../../components/ImageUploader";
import Input from "../../components/Input";
import Button from "../../components/Button";

import ReactModal from "react-modal";
import { useModal } from "react-modal-hook";
import InviteMemberModal from "../../components/InviteMemberModal";
import { TeamEntity, useTeamQuery, useUpdateTeamMutation } from "../../generated/sdk";
import { BaseGQLConfig } from "../../shared";

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

const LogoContainer = ({
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

const NameContainer = ({
  team,
  isMember,
  revalidate
}: {
  revalidate: () => void;
  isMember: boolean;
  team?: TeamEntity;
}) => {
  const [updateTeam] = useUpdateTeamMutation();

  const [edit, setEdit] = useState(false);
  const [newName, setNewName] = useState(team?.name);
  useEffect(() => {
    if (team) {
      setNewName(team.name);
    }
  }, [team]);
  if (isMember) {
    if (edit) {
      return (
        <div>
          <Input onChange={e => setNewName(e.target.value)} value={newName} />
          <Button
            onClick={async () => {
              if (!team) return;
              await updateTeam({
                variables: {
                  id: team.id,
                  name: newName
                }
              });
              setEdit(false);
              revalidate();
            }}
          >
            Сохранить
          </Button>
        </div>
      );
    }
    return <TeamName onClick={() => setEdit(true)}>{team?.name}</TeamName>;
  }

  return <TeamName>{team?.name}</TeamName>;
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
  const [showModal, hideModal] = useModal(() => <InviteMemberModal hide={hideModal} />);

  useEffect(showModal, []);

  if (!isMember) return null;

  return <Button onClick={showModal}>Пригласить игрока</Button>;
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

  const isMember: boolean = !!data?.Team.members?.some(it => it.user.discord_id === AuthService.me?.discord_id);

  return (
    <Layout>
      <Head>
        <title>{data?.Team.name || ""}</title>
      </Head>

      <LogoContainer revalidate={refetch} isMember={isMember} team={team} />
      <NameContainer revalidate={refetch} isMember={isMember} team={team} />
      <InviteContainer revalidate={refetch} isMember={isMember} team={team} />

      <TeamLayout>{team && <Roster {...team} />}</TeamLayout>
    </Layout>
  );
};
