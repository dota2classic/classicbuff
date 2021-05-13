import React, { ReactNode, useState } from "react";
import Layout from "../components/Layout";
import { CardBlock, CardRow, LeadButton, LeadButtons } from "./index";
import Head from "next/head";
import styled from "styled-components";
import Link from "next/link";
import i18n from "pages-i18n/download.i18n";
import { colors } from "shared";

const InfoText = styled.div`
  font-size: 18px;
  color: #d9d9d9;
  margin-bottom: 20px;
`;

const Container = styled.div`
  padding-top: 50px;
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
  const [d684, setD684] = useState(false);
  return (
    <Layout landing>
      <Head>
        <title>Скачать старый клиент</title>
        <meta
          name="description"
          content="dota2classic.ru - discord сервер для игры в классическую доту 6.81 2014 года"
        />
      </Head>
      <Container>
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

        <VersionWrapper className={(d681 && "unfold") || undefined}>
          <Version onClick={() => setD681(!d681)}>Dota 6.81</Version>
          <LeadButtons>
            <LeadButton
              target="__blank"
              href={"https://drive.google.com/file/d/1JXpkBlcOkNXkVDIFM9RxZD1dZpEOuX3y/view"}
            >
              {i18n.googleDisk}
            </LeadButton>

            <LeadButton target="__blank" href={"https://yadi.sk/d/C1P5uvQvfhwUZA"}>
              {i18n.yandexDisk}
            </LeadButton>

            <LeadButton download href={"https://dota2classic.ru/api/static/Dota_2_Classic_6.81b.torrent"}>
              {i18n.torrent}
            </LeadButton>
          </LeadButtons>
        </VersionWrapper>

        <VersionWrapper className={(d684 && "unfold") || undefined}>
          <Version onClick={() => setD684(!d684)}>Dota 6.84</Version>
          <LeadButtons>
            <LeadButton target="__blank" href={"https://drive.google.com/file/d/1o0jzefVwg2WZw2dZs3bCIZIxlxWyiVDt"}>
              {i18n.googleDisk}
            </LeadButton>

            <LeadButton target="__blank" href={"https://disk.yandex.ru/d/iuEoQEvrhekqrw"}>
              {i18n.yandexDisk}
            </LeadButton>

            <LeadButton download href={"https://dota2classic.ru/api/static/684.torrent"}>
              {i18n.torrent}
            </LeadButton>
          </LeadButtons>
        </VersionWrapper>
      </Container>
    </Layout>
  );
};
