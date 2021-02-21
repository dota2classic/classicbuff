import React, { ReactNode } from "react";
import Layout from "../components/Layout";
import { CardBlock, CardRow, LeadButton, LeadButtons } from "./index";
import Head from "next/head";
import styled from "styled-components";
import Link from "next/link";
import i18n from "pages-i18n/download.i18n";
const InfoText = styled.div`
  font-size: 18px;
  color: #d9d9d9;
  margin-bottom: 20px;
`;
export default () => {
  return (
    <Layout landing>
      <Head>
        <title>Скачать старый клиент</title>
        <meta
          name="description"
          content="dota2classic.ru - discord сервер для игры в классическую доту 6.81 2014 года"
        />
      </Head>

      <LeadButtons>
        <InfoText>
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
        <InfoText>
          {i18n.withValues.dontQueueInGame({
            span: (...chunks: ReactNode[]) => {
              return <span style={{ textDecoration: "underline" }}>{chunks}</span>;
            }
          })}
        </InfoText>
        {/*<CardBlock*/}
        {/*  img={"https://sun9-43.userapi.com/c855620/v855620490/1f045d/97zKHlEnSyM.jpg"}*/}
        {/*  text={"Нужно только распаковать архив с клиентом. Все просто!"}*/}
        {/*/>*/}
        <LeadButton target="__blank" href={"https://drive.google.com/file/d/1JXpkBlcOkNXkVDIFM9RxZD1dZpEOuX3y/view"}>
          {i18n.googleDisk}
        </LeadButton>

        <LeadButton target="__blank" href={"https://yadi.sk/d/C1P5uvQvfhwUZA"}>
          {i18n.yandexDisk}
        </LeadButton>

        <LeadButton download href={"https://dota2classic.ru/api/static/Dota_2_Classic_6.81b.torrent"}>
          {i18n.torrent}
        </LeadButton>
      </LeadButtons>
      <br />
      <br />
      <br />
      <CardRow>
        <iframe
          style={{ width: 940 }}
          height={450}
          // width={1792}
          // height={840}
          src="https://www.youtube.com/embed/MkqRP6Ia1Pc"
          frameBorder={0}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </CardRow>
    </Layout>
  );
};
