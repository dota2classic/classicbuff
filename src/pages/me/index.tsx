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
import Button, { LinkButton } from "../../components/Button";

export const HeroPreview = styled.img`
  width: 60px;
  height: auto;
  margin: 4px;
`;

const Hint = styled.a`
  font-size: 16px;

  text-decoration: none;
  color: white;

  & .link {
    color: #9a5cd7;
    text-decoration: none;
  }
`;

const Connections = styled.div`
  display: flex;
  flex-direction: column;
`;
const DiscordContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 10px;
  margin-bottom: 10px;
`;

const DiscordAvatar = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 4px;
`;

const DiscordName = styled.div`
  font-size: 20px;
  color: white;
  margin-left: 10px;
  margin-right: 10px;
`;

const DiscordBlock = () => {
  const { data } = useApi().playerApi.usePlayerControllerConnections();
  console.log(data);

  if (data?.error)
    return (
      <DiscordContainer>
        <Hint>
          Бот не может найти Ваш аккаунт! А вы есть у нас в{" "}
          <a className={"link"} target={"__blank"} href="https://discord.gg/VU5wjA8">
            дискорде?
          </a>
        </Hint>
      </DiscordContainer>
    );
  if (!data?.discord)
    return (
      <DiscordContainer>
        <LinkButton href={`${appApi.apiParams.basePath}/v1/auth/discord`}>Подключить Discord</LinkButton>
      </DiscordContainer>
    );
  return (
    <Connections>
      <DiscordContainer>
        <DiscordAvatar src={data.discord.avatar} />
        <DiscordName>{data.discord.name}</DiscordName>
      </DiscordContainer>
      <LinkButton href={`${appApi.apiParams.basePath}/v1/auth/discord`}>Привязать другой аккаунт</LinkButton>
    </Connections>
  );
};
const Page = observer(() => {
  useWillMount(() => {
    AuthService.fetchMe();
  });

  return (
    <Layout>
      <Head>
        <title>Профиль - dota2classic.ru</title>
      </Head>

      {AuthService.me?.steamId && <DiscordBlock />}

      <br />
      <br />

      <Button>
        <Hint
          href="#"
          onClick={() => {
            AuthService.logout();
            return Router.push("/");
          }}
        >
          Выйти из аккаунта
        </Hint>
      </Button>
      <br />
      <br />
      {(AuthService.me?.steamId && <PlayerPage steam_id={AuthService.me?.steamId} />) || (
        <Hint href={`${appApi.apiParams.basePath}/v1/auth/steam`}>Подключи стим, чтобы увидеть свою статистику</Hint>
      )}
    </Layout>
  );
});

export default Page;
