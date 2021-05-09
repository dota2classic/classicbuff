import React from "react";
import styled from "styled-components";
import { colors } from "shared";

const AdBlock = styled.a`
  height: 80px;
  width: 100%;
  display: flex;
  position: relative;
  text-decoration: none;
  overflow: hidden;

  &:hover {
    &::before {
      opacity: 0.5;
      transform: scale(1.05);
    }
  }

  & ::before {
    content: "";
    transition: 0.3s ease-in-out;
    position: absolute;
    z-index: -1;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    background: url("https://i.imgur.com/2jCoN9A.jpg");
    background-position-y: 300px;
    background-size: cover;
    opacity: 0.25;
    transform: scale(1.1);
  }
`;

const Itachi = styled.div`
  width: 22px;
  height: 22px;
  position: relative;
  margin-left: 10px;
  overflow: visible;

  &:hover {
    &::before {
      transform: rotateZ(120deg) scale(1.2);
      opacity: 1;
    }
  }
  &::before {
    transition: 0.2s ease-in-out;
    content: "";
    opacity: 0.7;
    background-image: url("https://upload.wikimedia.org/wikipedia/commons/thumb/1/17/Mangekyou_Sharingan_Itachi.svg/768px-Mangekyou_Sharingan_Itachi.svg.png");
    background-size: cover;
    position: absolute;
    z-index: 2;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
  }
`;

const Title = styled.div`
  color: ${colors.position.foreground.gold};
  align-self: center;
  font-size: 20px;
  margin-left: 20px;
`;

const KillerPhrase = styled.div`
  display: flex;
  align-items: center;
  font-size: 30px;

  flex: 1;
  text-align: center;
  justify-content: center;

  color: ${colors.primaryText};
  text-decoration: none;
`;

const Pros = styled.div`
  display: flex;
  flex-direction: column;
  margin-right: 5px;
  & span {
    color: ${colors.primaryText};
    margin: 4px;
    display: flex;
    flex-direction: row;
    align-items: center;
  }
`;

export const AdBanner = () => {
  return (
    <AdBlock href="https://discord.gg/w5rDPcCq57" target="__blank">
      <Title>Kingdom RP</Title>
      <KillerPhrase>Присоединяйся!</KillerPhrase>
      <Pros>
        <span>RPG minecraft сервер</span>
        <span>Свобода и ролеплей</span>
        <span>
          От создателя dota2classic.ru
          <Itachi />
        </span>
      </Pros>
    </AdBlock>
  );
};
