import Head from "next/head";
import Layout from "../components/Layout";
import React, { ReactNode } from "react";
import styled, { keyframes } from "styled-components";
import { EmbedProps } from "../components/util/EmbedProps";
import { useStores } from "../stores";
import { colors } from "shared";
import Link from "next/link";
import i18n from "pages-i18n/index.i18n";
export const slideAnimation = keyframes`
  0% {
    transform: translateX(200);
  }

  100% {
    transform: translateX(0);
  }
`;

const CardPicture = styled.picture`
  cursor: pointer;
  &::after {
    content: "";
    transition: 0.3s ease;
    //@media (max-width: 600px) {
    //  background: rgba(0, 0, 0, 0.55);
    //}
    //background: rgba(0, 0, 0, 0.65);
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    z-index: 5;
  }
`;
const CardImage = styled.img`
  width: auto;
  height: 300px;
  object-fit: cover;
  transition: 0.7s ease;
  position: relative;
  @media (max-width: 600px) {
    height: 100px;
  }
`;

export const WelcomeText = styled.div`
  text-align: center;
  //text-transform: uppercase;
  font-weight: 400;
  font-size: 30px;
  color: #d9d9d9;

  @media (max-width: 600px) {
    width: 80%;
    font-size: 20px;
  }
`;
export const Card = styled.div`
  display: flex;
  height: 300px;
  flex: 1;
  flex-direction: row;

  @media (max-width: 600px) {
    height: unset;
  }
  position: relative;
  overflow: hidden;
  & + & {
    //margin-top: 60px;
  }

  &:hover {
    ${CardPicture}::after {
      background: rgba(0, 0, 0, 0.45);
    }
  }
`;

export const LeadButton = styled.a`
  outline: none;
  text-transform: uppercase;

  margin: 10px;
  border: none;
  font-size: 28px;
  @media (max-width: 600px) {
    font-size: 20px;
  }
  letter-spacing: 2.5px;
  padding: 10px 10px 10px 24px;
  color: #ed3b1c;
  text-decoration: underline;
  text-underline-position: under;
  transition: 0.2s ease;
  &:hover {
    color: #c21e00;
  }
  cursor: pointer;
  text-align: left;
`;

export const LeadButtons = styled.div`
  display: flex;
  margin-top: 40px;
  flex-direction: column;
`;

export const List = styled.ul`
  color: #d9d9d9;
  font-size: 22px;
  align-self: flex-start;
  font-weight: 300;
  margin-left: 120px;
  margin-top: 100px;
  @media (max-width: 600px) {
    margin-top: 20px;
    margin-left: 10px;

    font-size: 18px;
  }
  & > li + li {
    margin-top: 40px;
    @media (max-width: 600px) {
      margin-top: 10px;
    }
  }
`;
interface Props {
  img: string;
  text: ReactNode;
}

export const CardBlock = ({ img, text }: Props) => {
  return (
    <Card>
      <CardPicture>
        <CardImage src={img} />
      </CardPicture>
      {/*<CardText>{text}</CardText>*/}
    </Card>
  );
};

export const CardRow = styled.div`
    display: flex;
    flex-direction: row;
    ${Card} + ${Card} {
      margin-left: 20px;
    }
    @media (max-width: 600px) {
      margin-top: 20px;
    }
    margin-top: 100px;
    
    &.inline {
      margin-top: 20px;
    }
    
    & .wpdrop-ad {
      text-decoration: none;
      cursor: pointer;
    }
`;

const PromoVideoWrapper = styled.div`
  width: 100vw;
  position: relative;
  background: #000;
  bottom: -1px;
  top: -2px;

  &::before {
    content: "";
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.7);
    z-index: 3;
  }
`;
const PromoVideo = styled.video`
  width: 100vw;
  height: auto;
  background: #000;
`;

const LeadingText = styled.div`
  position: absolute;
  top: 20%;
  white-space: pre;
  left: 5%;
  color: ${colors.primaryText};

  font-size: 60px;
  font-weight: bold;
  z-index: 10;

  @media (max-width: 1200px) {
    font-size: 30px !important;
  }

  @media (max-width: 500px) {
    font-size: 16px !important;
  }

  &.secondary {
    @media (max-width: 1200px) {
      font-size: 24px !important;
      top: 30%;
    }
    @media (max-width: 500px) {
      font-size: 14px !important;
      top: 35%;
      white-space: normal;
    }

    top: 34%;
    font-size: 30px;
  }
`;

const CenterText = styled.a`
  text-decoration: none;
  position: absolute;
  text-align: center;
  top: 20%;
  white-space: pre;
  left: 0;
  right: 0;
  z-index: 10;

  width: fit-content;
  display: inline;
  margin: auto;

  font-size: 60px;
  font-weight: bold;
  color: ${colors.primaryText};

  @media (max-width: 1200px) {
    font-size: 40px !important;
  }

  @media (max-width: 500px) {
    font-size: 10px !important;
  }

  & span.secondary {
    color: ${colors.primaryTextTint};
  }

  & span.underline {
    text-decoration: underline;
    text-decoration-thickness: 2px;
    text-underline-offset: 15px;
  }
  & span.primary {
    margin-top: 4px;
  }
`;

const SecondaryText = styled.div`
  position: absolute;
  text-align: center;
  line-height: 40px;
  top: 45%;
  left: 0;
  right: 0;
  z-index: 10;

  width: 85%;

  display: inline;
  margin: auto;

  font-size: 26px;
  font-weight: bold;
  color: ${colors.primaryTextTint};

  @media (max-width: 1200px) {
    font-size: 18px !important;
    line-height: 30px;
    //top: 30%;
  }

  @media (max-width: 500px) {
    font-size: 10px !important;
    line-height: 12px;
  }
  & .rofl {
    color: ${colors.position.foreground.gold};
  }
`;

export const PlayButton = styled.a`
  &.inline {
    font-size: 18px;
    border: 1px solid ${colors.primaryTextDark};

    position: relative;
    display: block;
    text-decoration: none;
    padding: 10px 15px;
    top: 0;
    left: 0;
    color: ${colors.position.foreground.silver};

    &:hover {
      color: ${colors.position.foreground.gold};
    }

    @media (max-width: 1200px) {
      padding: 10px;
      font-size: 16px !important;
    }
  }

  @media (max-width: 1200px) {
    font-size: 20px !important;
    padding: 10px;
    border-width: 1px;
    text-decoration: none;
  }

  @media (max-width: 600px) {
    font-size: 20px;
    top: 60%;
  }

  outline: none;
  text-transform: uppercase;

  z-index: 10;
  position: absolute;
  top: 40%;
  white-space: pre;
  left: 5%;

  border: 2px solid ${colors.primaryText};
  border-radius: 6px;

  font-size: 28px;
  letter-spacing: 2.5px;

  text-decoration: underline;

  font-weight: bold;

  padding: 20px 20px 20px 20px;
  color: #ed3b1c;
  //text-decoration: underline;
  //text-underline-position: under;
  transition: 0.2s ease;
  &:hover {
    color: #ee2c0a;
    border-color: ${colors.primaryTextHighlight};
  }
  cursor: pointer;
  text-align: left;
`;

export const BackgroundImagePicture = styled.picture`
  position: relative;
  width: 100vw;
  background: #000;
  &.overflow {
    margin-top: -6px;
    z-index: 4;
  }

  &::before {
    content: "";
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.8);
    z-index: 3;
  }
`;
export const BackgroundImage = styled.img`
  width: 100vw;
  opacity: 1;
`;
export default () => {
  const stores = useStores();

  return (
    <Layout landing>
      <EmbedProps
        title="Классическая Dota 2"
        description="dota2classic.ru - сайт для игры в классическую Dota 2 6.84 2015 года"
        image="https://dota2classic.ru/api/static/landing/2.png"
      />
      <Head>
        <title>Классическая Dota 2</title>
        <meta name="description" content="dota2classic.ru - сайт для игры в классическую Dota 2 6.84 2015 года" />
      </Head>

      <PromoVideoWrapper>
        <PromoVideo muted loop autoPlay controls={false} src="https://dota2classic.ru/api/static/video/d2video.mp4" />
        <LeadingText>{i18n.magicWorld}</LeadingText>
        <LeadingText className="secondary">{i18n.cozyHome}</LeadingText>
        <Link href={"/download"}>
          <PlayButton>{i18n.playFree}</PlayButton>
        </Link>
      </PromoVideoWrapper>

      <BackgroundImagePicture className="overflow">
        <BackgroundImage src="https://dota2classic.ru/api/static/landing/landing_2.jpeg" />
        <Link href="/download" passHref>
          <CenterText>
            <span className="secondary">{i18n.startPlaying} </span>
            <br />
            <span className="primary underline">{i18n.realDota}</span>
          </CenterText>
        </Link>
        <SecondaryText>{i18n.remember}</SecondaryText>
      </BackgroundImagePicture>

      <BackgroundImagePicture>
        <BackgroundImage src="https://dota2classic.ru/api/static/landing/landing_1.jpeg" />
        <CenterText>
          <span className="secondary">{i18n.oldAbilities}</span>
          <br />
          <span className="primary">{i18n.newFeelings}</span>
        </CenterText>

        <SecondaryText>
          {i18n.oldDota} <br />
          {i18n.firstGame}
          <br />
          {i18n.hard}
          <br />
          {i18n.itemsMissing} <br />
          {i18n.but} <span className="rofl">{i18n.pudgeDeny}</span>
        </SecondaryText>
      </BackgroundImagePicture>

      <BackgroundImagePicture className="overflow">
        <BackgroundImage src="https://dota2classic.ru/api/static/landing/landing_3.webp" />
        <LeadingText>{i18n.nostalgy}</LeadingText>
        <LeadingText className="secondary">{i18n.onlyClient}</LeadingText>
        <Link href={"/download"}>
          <PlayButton>{i18n.playFree}</PlayButton>
        </Link>
      </BackgroundImagePicture>
    </Layout>
  );
};
