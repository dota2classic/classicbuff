import { TournamentLayout } from "../../components/Layout";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import Button from "../../components/Button";
import Form from "../../components/Form";
import Input from "../../components/Input";
import styled from "styled-components";
import image from "../../utils/image";
import ImageUploader from "../../components/ImageUploader";
import { ImageEntity } from "../../shared";
import Hint from "../../components/Hint";

const TeamImage = styled.img`
  border-radius: 50%;
  object-fit: cover;
  width: 80px;
  height: 80px;
  border: 1px solid rgba(255, 255, 255, 0.3);
  align-self: center;
  padding: 4px;
  overflow: hidden;
  cursor: pointer;
`;

export default () => {
  const [img, setImage] = useState<ImageEntity | undefined>(undefined);
  const { register, handleSubmit, getValues, watch, errors, setValue } = useForm();
  const onSubmit = (data: any) => console.log(data);

  return (
    <TournamentLayout>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <div style={{ alignItems: "center", display: "flex", justifyContent: "center" }}>
          <ImageUploader onChange={setImage}>
            <Hint>
              <TeamImage
                src={
                  (img && image(img)) || "https://i.pinimg.com/originals/c1/ec/da/c1ecda477bc92b6ecfc533b64d4a0337.png"
                }
              />
            </Hint>
          </ImageUploader>
        </div>
        {/* register your input into the hook by invoking the "register" function */}
        <Input name="name" defaultValue="Название моей команды" ref={register({ required: true })} />

        {/* include validation with required or other standard HTML validation rules */}
        <Input hidden name="image" ref={register({ required: true })} />

        <Button>Создать</Button>
      </Form>
    </TournamentLayout>
  );
};
