import React from "react";
import Layout from "../components/Layout";
import { CardBlock, CardRow, LeadButton, LeadButtons } from "./index";
import Head from "next/head";
import styled from "styled-components";
import Link from "next/link";

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

      <LeadButtons>
        <InfoText>
          Внимание: Поиск игры происходит через{" "}
          <Link passHref href={`/queue`}>
            <a style={{ color: `#d9d9d9` }}>сайт</a>
          </Link>{" "}
          или{" "}
          <a style={{ color: `#d9d9d9` }} href="https://discord.gg/VU5wjA8">
            Discord сервер
          </a>
        </InfoText>
        <InfoText>
          Нажимать на поиск игры в самом клиенте <span style={{ textDecoration: "underline" }}>НЕ НУЖНО</span>
        </InfoText>
        <CardBlock
          img={"https://sun9-43.userapi.com/c855620/v855620490/1f045d/97zKHlEnSyM.jpg"}
          text={"Нужно только распаковать архив с клиентом. Все просто!"}
        />
        <LeadButton target="__blank" href={"https://drive.google.com/open?id=1-pmNQZfgjN6b8YYTLgv7HidnB7zIYqAv"}>
          Скачать через Google Диск
        </LeadButton>

        <LeadButton target="__blank" href={"https://yadi.sk/d/7jOGNrUcpppedg"}>
          Скачать через Яндекс.Диск
        </LeadButton>

        <LeadButton download href={"https://dota2classic.ru/api/static/Dota_2_Classic_6.81b.torrent"}>
          Скачать Torrent
        </LeadButton>
      </LeadButtons>
      <br />
      <br />
      <br />
    </Layout>
  );
};
