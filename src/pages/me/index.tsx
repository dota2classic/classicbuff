import React from "react";
import Layout from "../../components/Layout";
import useWillMount from "../../utils/useWillMount";
import AuthService from "../../service/AuthServiceService";
import { observer } from "mobx-react";
import PlayerPage from "../../container/PlayerPage";
import Head from "next/head";
import { appApi } from "../../api/hooks";
import { Hint } from "../../components/UI/Hint";
import { useStores } from "../../stores";
import { loginEvent } from "utils/ga";

const Page = observer(() => {
  const { auth } = useStores();

  useWillMount(() => {
    auth.fetchMe();
  });

  return (
    <Layout>
      <Head>
        <title>Профиль - dota2classic.ru</title>
      </Head>
      {(auth.me?.steamId && <PlayerPage steam_id={auth.me?.steamId} />) || (
        <Hint onClick={loginEvent} href={`${appApi.apiParams.basePath}/v1/auth/steam`}>
          Подключи стим, чтобы увидеть свою статистику
        </Hint>
      )}
    </Layout>
  );
});

export default Page;
