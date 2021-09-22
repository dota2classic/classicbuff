import Head from "next/head";
import Layout from "components/Layout";
import React, { PropsWithChildren } from "react";
import styled from "styled-components";
import { colors } from "shared";

const EmbeddedVideo = styled.iframe`
  margin-top: 20px;

  @media (max-width: 600px) {
    width: 100vw !important;
    height: 200px;
  }
`;

const VideoPostContainer = styled.div`
  & .post-text {
    font-size: 16px;
    color: ${colors.primaryText};
    padding: 20px;
  }

  & .accent {
    color: ${colors.position.foreground.gold};
  }

  & + & {
    border-top: 1px solid ${colors.darkBg2};
  }
`;

const VideoPost = ({ url, children }: PropsWithChildren<{ url: string }>) => {
  return (
    <VideoPostContainer>
      <EmbeddedVideo
        style={{ width: 940 }}
        height={450}
        src={url}
        frameBorder={0}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />

      <div className="post-text">{children}</div>
    </VideoPostContainer>
  );
};
export default () => {
  return (
    <Layout>
      <Head>
        <title>Новости и обновления Классической Dota 2</title>
        <meta
          name="description"
          content="dota2classic.ru - discord сервер для игры в классическую доту 6.84 2015 года"
        />
      </Head>

      <VideoPost url="https://www.youtube.com/embed/MkqRP6Ia1Pc">
        Видео о том, как создавался проект от <span className="accent">Человека Самовара</span>.
      </VideoPost>
      <VideoPost url="https://www.youtube.com/embed/beR4yyW3yw8">
        <span className="accent">Meeponegeroi</span> и компания покоряют классическую Dota 2.
      </VideoPost>
      <VideoPost url="https://www.youtube.com/embed/jYoBaEI6ZCw">
        Душевный видос от <span className="accent">yeljke</span>, где он рассказывает, как сильно поменялась Дота за
        последние лет 5-6.
      </VideoPost>

      <VideoPost url="https://www.youtube.com/embed/1erMLm-79A8">
        Активное использование дагона от <span className="accent">Ancient678</span>
      </VideoPost>
    </Layout>
  );
};
