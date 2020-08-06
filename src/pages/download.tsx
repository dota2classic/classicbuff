import React from "react";
import Layout from "../components/Layout";
import { CardBlock, LeadButton, LeadButtons } from "./index";
import Head from "next/head";

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
        <CardBlock
          img={"https://sun9-21.userapi.com/c855620/v855620490/1f0449/Fb0lOsyZi6o.jpg"}
          text={"Нужно только распаковать архив с клиентом. Все просто!"}
        />
        <LeadButton target="__blank" href={"https://drive.google.com/open?id=1-pmNQZfgjN6b8YYTLgv7HidnB7zIYqAv"}>
          Скачать через Google.Drive
        </LeadButton>

        <CardBlock
          img={"https://sun9-43.userapi.com/c855620/v855620490/1f045d/97zKHlEnSyM.jpg"}
          text={"Нужно только распаковать архив с клиентом. Все просто!"}
        />
        <LeadButton target="__blank" href={"https://yadi.sk/d/7jOGNrUcpppedg"}>
          Скачать через Яндекс Диск
        </LeadButton>
      </LeadButtons>
      <br />
      <br />
      <br />
    </Layout>
  );
};