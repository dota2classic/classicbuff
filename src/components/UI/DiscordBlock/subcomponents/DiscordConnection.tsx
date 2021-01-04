import React from "react";
import styled from "styled-components";
import { colors } from "../../../../shared";

const DiscordContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 10px;
  margin-bottom: 10px;
`;

const DiscordAvatar = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 4px;
`;

const DiscordName = styled.div`
  font-size: 20px;
  color: ${colors.primaryText};
  margin-left: 10px;
  margin-right: 10px;
`;

interface Props {
  image: string;
  name: string;
}
export const DiscordConnection = ({ image, name }: Props) => {
  return (
    <DiscordContainer>
      <DiscordAvatar src={image} />
      <DiscordName>{name}</DiscordName>
    </DiscordContainer>
  );
};
