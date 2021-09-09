import React, { ReactNode, useState } from "react";
import Layout from "../components/Layout";
import { BackgroundImage, BackgroundImagePicture, LeadButton, LeadButtons } from "./index";
import Head from "next/head";
import styled from "styled-components";
import Link from "next/link";
import i18n from "pages-i18n/download.i18n";
import { colors } from "shared";
import { appApi } from "api/hooks";
import { AppRouter } from "utils/route";
import { downloadEvent, ga, loginEvent } from "utils/ga";

const InfoText = styled.a`
  display: block;
  text-decoration: none;
  font-size: 24px;

  color: ${colors.primaryText};
  margin-bottom: 20px;

  :after {
    content: "";
    width: 0px;
    height: 1px;
    margin-top: 10px;
    display: block;
    background: ${colors.blueHighlight2};
    transition: 300ms;
  }

  &[href]:hover {
    color: ${colors.primaryTextHighlight};
  }

  &:hover {
    &::after {
      width: 100%;
    }
  }

  & .steam {
    color: ${colors.blueHighlight2};
  }
  &.warning {
    margin-bottom: 40px;
  }
`;

const Container = styled.div`
  padding-top: 50px;
  width: 100vw;
  position: relative;
  height: 100vh;

  &::before {
    background-image: url("https://dota2classic.ru/api/static/landing/download.jpeg");
    content: "";
    position: absolute;
    background-size: cover;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    z-index: -1;
    opacity: 0.05;
  }
`;

const ContentContainer = styled.div`
  width: 60%;
  min-width: 600px;
  display: flex;
  flex-direction: column;
  margin: auto;
  z-index: 1;
`;
const Version = styled.div`
  font-size: 20px;
  color: ${colors.position.foreground.gold};
  padding: 20px;
  cursor: pointer;
  user-select: none;
`;

const VersionWrapper = styled.div`
  margin-top: 40px;
  background-color: ${colors.evenDarkerBg};
  border-radius: 5px;
  height: 63px;
  overflow: hidden;
  transition: 0.3s ease;
  &.unfold {
    height: 360px;
  }
`;

export default () => {
  const [d681, setD681] = useState(false);
  const [d684, setD684] = useState(true);
  return (
    <Layout landing>
      <Head>
        <title>Скачать старый клиент</title>
        <meta
          name="description"
          content="dota2classic.ru - discord сервер для игры в классическую доту 6.84 2015 года"
        />
      </Head>
      <Container>
        <ContentContainer>
          <InfoText className="warning">
            {i18n.withValues.attentionQueue({
              a: (...chunks: ReactNode[]) => {
                return (
                  <Link passHref href={`/queue`}>
                    <a style={{ color: `#d9d9d9` }}>{chunks}</a>
                  </Link>
                );
              }
            })}
          </InfoText>
          <InfoText>1) {i18n.download}</InfoText>
          <InfoText>2) {i18n.steamAndLaunch}</InfoText>
          <InfoText onClick={loginEvent} href={`${appApi.apiParams.basePath}/v1/auth/steam`}>
            3) {i18n.loginViaSteam} <span className="steam">Steam</span>
          </InfoText>

          <Link {...AppRouter.queue.link}>
            <InfoText>4) {i18n.enterQueue}</InfoText>
          </Link>

          <VersionWrapper className={(d684 && "unfold") || undefined}>
            <Version onClick={() => setD684(!d684)}>Dota 6.84</Version>
            <LeadButtons>
              <LeadButton
                onClick={downloadEvent}
                target="__blank"
                href={"https://drive.google.com/file/d/1o0jzefVwg2WZw2dZs3bCIZIxlxWyiVDt"}
              >
                {i18n.googleDisk}
              </LeadButton>

              {/*<LeadButton onClick={downloadEvent} target="__blank" href={"https://disk.yandex.ru/d/iuEoQEvrhekqrw"}>*/}
              {/*  {i18n.yandexDisk}*/}
              {/*</LeadButton>*/}

              <LeadButton onClick={downloadEvent} download href={"https://dota2classic.ru/api/static/684.torrent"}>
                {i18n.torrent}
              </LeadButton>
            </LeadButtons>
          </VersionWrapper>

          {/*<VersionWrapper className={(d681 && "unfold") || undefined}>*/}
          {/*  <Version onClick={() => setD681(!d681)}>Dota 6.81</Version>*/}
          {/*  <LeadButtons>*/}
          {/*    <LeadButton*/}
          {/*      target="__blank"*/}
          {/*      href={"https://drive.google.com/file/d/1JXpkBlcOkNXkVDIFM9RxZD1dZpEOuX3y/view"}*/}
          {/*    >*/}
          {/*      {i18n.googleDisk}*/}
          {/*    </LeadButton>*/}

          {/*    <LeadButton target="__blank" href={"https://yadi.sk/d/C1P5uvQvfhwUZA"}>*/}
          {/*      {i18n.yandexDisk}*/}
          {/*    </LeadButton>*/}

          {/*    <LeadButton download href={"https://dota2classic.ru/api/static/Dota_2_Classic_6.81b.torrent"}>*/}
          {/*      {i18n.torrent}*/}
          {/*    </LeadButton>*/}
          {/*  </LeadButtons>*/}
          {/*</VersionWrapper>*/}
        </ContentContainer>
      </Container>
    </Layout>
  );
};
