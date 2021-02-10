import Head from "next/head";
import Layout from "../components/Layout";
import React from "react";
import styled from "styled-components";
import Link from "next/link";
import { EmbedProps } from "../components/util/EmbedProps";

const CardPicture = styled.picture`
  cursor: pointer;
  &::after {
    content: "";
    transition: 0.3s ease;
    //@media (max-width: 600px) {
    //  background: rgba(0, 0, 0, 0.55);
    //}
    //background: rgba(0, 0, 0, 0.65);
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    z-index: 5;
  }
`;
const CardImage = styled.img`
  width: auto;
  height: 300px;
  object-fit: cover;
  transition: 0.7s ease;
  position: relative;
  @media (max-width: 600px) {
    height: 100px;
  }
`;

export const WelcomeText = styled.div`
  text-align: center;
  //text-transform: uppercase;
  font-weight: 400;
  font-size: 30px;
  color: #d9d9d9;

  @media (max-width: 600px) {
    width: 80%;
    font-size: 20px;
  }
`;
export const Card = styled.div`
  display: flex;
  height: 300px;
  flex: 1;
  flex-direction: row;

  @media (max-width: 600px) {
    height: unset;
  }
  position: relative;
  overflow: hidden;
  & + & {
    //margin-top: 60px;
  }

  &:hover {
    ${CardPicture}::after {
      background: rgba(0, 0, 0, 0.45);
    }
  }
`;

export const LeadButton = styled.a`
  outline: none;
  text-transform: uppercase;

  margin: 10px;
  border: none;
  font-size: 28px;
  @media (max-width: 600px) {
    font-size: 20px;
  }
  letter-spacing: 2.5px;
  padding: 10px 10px 10px 24px;
  color: #ed3b1c;
  text-decoration: underline;
  text-underline-position: under;
  transition: 0.2s ease;
  &:hover {
    color: #c21e00;
  }
  cursor: pointer;
  text-align: left;
`;

export const LeadButtons = styled.div`
  display: flex;
  margin-top: 40px;
  flex-direction: column;
`;

export const List = styled.ul`
  color: #d9d9d9;
  font-size: 22px;
  align-self: flex-start;
  font-weight: 300;
  margin-left: 120px;
  margin-top: 100px;
  @media (max-width: 600px) {
    margin-top: 20px;
    margin-left: 10px;

    font-size: 18px;
  }
  & > li + li {
    margin-top: 40px;
    @media (max-width: 600px) {
      margin-top: 10px;
    }
  }
`;
interface Props {
  img: string;
  text: string;
}

export const CardBlock = ({ img, text }: Props) => {
  return (
    <Card>
      <CardPicture>
        <CardImage src={img} />
      </CardPicture>
      {/*<CardText>{text}</CardText>*/}
    </Card>
  );
};

export const CardRow = styled.div`
    display: flex;
    flex-direction: row;
    ${Card} + ${Card} {
      margin-left: 20px;
    }
    @media (max-width: 600px) {
      margin-top: 20px;
    }
    margin-top: 100px;
    
    &.inline {
      margin-top: 20px;
    }
`;

export default () => {
  return (
    <Layout landing>
      <EmbedProps
        title="Классическая Dota 2"
        description="dota2classic.ru - сайт для игры в классическую Dota 2 6.81 2014 года"
        image="https://dota2classic.ru/api/static/landing/2.png.webp"
      />
      <Head>
        <title>Классическая Dota 2</title>
        <meta
          name="description"
          content="dota2classic.ru - discord сервер для игры в классическую доту 6.81 2014 года"
        />
      </Head>

      <WelcomeText>
        Добро пожаловать на сайт проекта <b>Dota 2 Classic</b> - русскоязычного сообщества, где вместе с другими людьми
        можно поиграть в старую версию легендарной игры.
      </WelcomeText>

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

      <CardRow>
        <CardBlock
          text={"Версия The International 2014"}
          img={"https://dota2classic.ru/api/static/landing/1.png.webp"}
        />

        <CardBlock
          text={"Клиент игры до обновления Reborn"}
          img={"https://dota2classic.ru/api/static/landing/2.png.webp"}
        />

        <CardBlock text={"Работает через Steam"} img={"https://dota2classic.ru/api/static/landing/3.png.webp"} />
      </CardRow>

      <List>
        <li>Версия The International 2014</li>
        <li>Клиент игры до обновления Reborn (Новая жизнь)</li>
        <li>Работает через Steam</li>
      </List>

      <CardRow>
        <CardBlock text={"Движок Source 1"} img={"https://dota2classic.ru/api/static/landing/4.png.webp"} />
        <CardBlock text={"Классический баланс"} img={"https://dota2classic.ru/api/static/landing/5.png.webp"} />
        <CardBlock text={"Оригинальный ландшафт"} img={"https://dota2classic.ru/api/static/landing/6.png.webp"} />
      </CardRow>

      <List>
        <li>Движок Source 1</li>
        <li>Классический баланс</li>
        <li>Оригинальный ландшафт</li>
      </List>
      <CardRow>
        <CardBlock text={"Удаленные предметы"} img={"https://dota2classic.ru/api/static/landing/7.png.webp"} />

        <CardBlock img={"https://dota2classic.ru/api/static/landing/8.png.webp"} text={"Diretide 2012 года"} />
        <CardBlock img={"https://dota2classic.ru/api/static/landing/9.png.webp"} text={"Techies еще не добавили!"} />
      </CardRow>
      <List>
        <li>Старые способности героев и удалённые предметы</li>
        <li>Diretide 2012 года</li>
        <li>Отсутствует Techies</li>
      </List>
      <LeadButtons>
        <Link href={"/download"}>
          <LeadButton>СКАЧАТЬ</LeadButton>
        </Link>
        <LeadButton href={"https://discord.gg/VU5wjA8"} target={"__blank"}>
          ИГРАТЬ ЧЕРЕЗ DISCORD
        </LeadButton>
      </LeadButtons>
    </Layout>
  );
};
