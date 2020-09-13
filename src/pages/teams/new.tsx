import { TournamentLayout } from "../../components/Layout";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import Button from "../../components/Button";
import Form from "../../components/Form";
import Input from "../../components/Input";
import styled from "styled-components";
import image from "../../utils/image";
import ImageUploader from "../../components/ImageUploader";
import Router from "next/router";
import { ImageEntity, useCreateTeamMutation } from "../../generated/sdk";

const TeamImage = styled.img`
  border-radius: 50%;
  object-fit: cover;
  width: 80px;
  height: 80px;
  border: 1px solid rgba(255, 255, 255, 0.3);
  margin-bottom: 20px;
  align-self: center;
  padding: 4px;
  overflow: hidden;
  cursor: pointer;
  transition: 0.3s ease;

  &:hover {
    box-shadow: 0 20px 20px -5px rgba(255, 252, 252, 0.1), 0 0px 0px 0px rgba(255, 255, 255, 0.04);
  }
`;

const NewTeam = () => {
  const [img, setImage] = useState<ImageEntity | undefined>(undefined);
  const { register, handleSubmit, formState, getValues, watch, errors, setValue } = useForm();
  const [createTeam] = useCreateTeamMutation();
  const onSubmit = async (data: any) => {
    if (!img?.id) return;
    const team = await createTeam({
      variables: {
        image: img.id,
        name: data.name
      }
    });
    await Router.push(`/teams/${team.data?.createTeam.id}`);
  };

  return (
    <TournamentLayout>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <div style={{ alignItems: "center", display: "flex", justifyContent: "center" }}>
          <ImageUploader onChange={setImage}>
            <TeamImage
              src={
                (img && image(img)) || "https://i.pinimg.com/originals/c1/ec/da/c1ecda477bc92b6ecfc533b64d4a0337.png"
              }
            />
          </ImageUploader>
        </div>
        {/* register your input into the hook by invoking the "register" function */}
        <Input name="name" placeholder="Название команды" ref={register({ required: true })} />

        <Button>Создать команду</Button>
      </Form>
    </TournamentLayout>
  );
};

export default NewTeam;
