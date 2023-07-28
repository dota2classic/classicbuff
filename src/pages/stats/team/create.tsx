import Layout from "components/Layout";
import React, { useState } from "react";
import styled from "styled-components";
import ImageUploader from "components/UI/ImageUploader";
import { resolveImage } from "utils/resolveImage";
import Input from "components/UI/Input";
import { appApi } from "api/hooks";
import { useRouter } from "next/router";
import Button from "components/UI/Button";
import { PROD_URL } from "config";

const TeamImage = styled.img`
  width: 128px;
  height: 128px;
  object-fit: cover;

  transition: 0.3s ease;
  cursor: pointer;

  & :hover {
    box-shadow: 0px 0px 5px 1px rgba(255, 255, 255, 0.2);
  }
`;

const CreateTeamForm = styled.div`
  display: flex;
  flex-direction: column;
`;

export default () => {
  const [image, setImage] = useState(`${PROD_URL}/api/static/icons/jugger.png`);
  const [name, setName] = useState("");
  const [tag, setTag] = useState("");
  const router = useRouter();

  const createTeam = async () => {
    const res = await appApi.team.teamControllerCreateTeam({
      name,
      tag,
      imageUrl: image
    });

    await router.push(`/team/${res.id}`);
  };

  return (
    <Layout title="Создать команду">
      <CreateTeamForm>
        <ImageUploader onChange={e => setImage(resolveImage(e))}>
          <TeamImage src={image} />
        </ImageUploader>
        <Input
          value={name}
          onChange={e => {
            const tag = e.target.value;
            if (tag.length <= 20) setName(tag);
          }}
          placeholder="Название команды"
        />
        <Input
          value={tag}
          onChange={e => {
            const tag = e.target.value;
            if (tag.length <= 7) setTag(tag);
          }}
          placeholder="Тег команды"
        />

        <Button onClick={() => createTeam()}>Создать</Button>
      </CreateTeamForm>
    </Layout>
  );
};