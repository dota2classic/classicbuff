import React from "react";
import styled from "styled-components";
import Router from "next/router";
import Layout from "../../components/Layout";
import useWillMount from "../../utils/useWillMount";
import AuthService from "../../service/AuthService";
import { observer } from "mobx-react";
import PlayerPage from "../../container/PlayerPage";
import Head from "next/head";
import { appApi, useApi } from "../../api/hooks";
import { Hint } from "../../components/Hint";

const Page = observer(() => {
  useWillMount(() => {
    AuthService.fetchMe();
  });

  return (
    <Layout>
      <Head>
        <title>Профиль - dota2classic.ru</title>
      </Head>
      {(AuthService.me?.steamId && <PlayerPage steam_id={AuthService.me?.steamId} />) || (
        <Hint href={`${appApi.apiParams.basePath}/v1/auth/steam`}>Подключи стим, чтобы увидеть свою статистику</Hint>
      )}
    </Layout>
  );
});

export default Page;
