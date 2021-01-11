import Layout from "../components/Layout";
import React from "react";
import { LeadButton, LeadButtons, WelcomeText } from "./index";
import Link from "next/link";

export default () => {
  return (
    <Layout landing>
      <br />
      <br />
      <br />
      <WelcomeText>Страница не найдена :(</WelcomeText>

      <LeadButtons>
        <Link href={"/"}>
          <LeadButton>Главная</LeadButton>
        </Link>
        <Link href="/download">
          <LeadButton>Скачать</LeadButton>
        </Link>
        <Link href="/queue">
          <LeadButton>Играть</LeadButton>
        </Link>
      </LeadButtons>
    </Layout>
  );
};
