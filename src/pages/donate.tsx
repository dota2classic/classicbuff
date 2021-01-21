import Layout from "../components/Layout";
import React from "react";
import styled from "styled-components";
import { CardBlock, CardRow } from "./index";
import Link from "next/link";
import Head from "next/head";

const WelcomeText = styled.div`
  text-align: center;
  //text-transform: uppercase;
  font-weight: 400;
  font-size: 24px;
  color: #d9d9d9;

  @media (max-width: 600px) {
    width: 80%;
    font-size: 20px;
  }
`;

const Way2Pay = styled.div`
  font-size: 20px;
  color: white !important;

  & a {
    color: white !important;
  }
  margin-top: 10px;
`;

const NormalizedContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 80%;
`;

const Role = styled.div`
  font-size: 20px;

  &.old {
    color: purple;
  }

  &.human {
    color: #cda71b;
  }
`;

const List = styled.ul`
  color: #d9d9d9;
  font-size: 18px;
  align-self: flex-start;
  font-weight: 300;
  margin-left: 120px;
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

  & li.new {
    color: #5b5b5b;
  }

  & a {
    color: #d9d9d9 !important;
    text-decoration: none;
  }
`;

const Price = styled.div`
  font-size: 18px;
  color: #d9d9d9;
`;

const Note = styled.div`
  color: #ca3d3d;
  font-size: 16px;
`;
export default () => {
  return (
    <Layout landing>
      <Head>
        <title>Классическая Dota 2</title>
        <meta
          name="description"
          content="dota2classic.ru - discord сервер для игры в классическую доту 6.81 2014 года"
        />
      </Head>

      <WelcomeText>
        Вы можете поспособствовать развитию сервера и совершить добровольное пожертвование на его продвижение
      </WelcomeText>

      <CardRow className={"inline"}>
        <CardBlock
          text={"Версия The International 2014"}
          img={"https://cdn.discordapp.com/attachments/708963137361018921/709323583544885258/donat2.png"}
        />
      </CardRow>

      <br />
      <br />

      <WelcomeText>Уровни подписки</WelcomeText>
      <br />

      <Role className="old">Древний</Role>
      <Price>81₽ / месяц</Price>
      <List>
        <li>
          Возможность менять никнейм на нашем сервере в <a href="https://discord.gg/VU5wjA8">Discord</a>
        </li>
        <li>Возможность смотреть игры</li>
        <li>Возможность искать игры в группе</li>
      </List>

      <br />

      <Role className="human">Человек</Role>
      <Price>
        <span style={{ textDecoration: "line-through", color: "#5b5b5b" }}>600₽</span> 300₽ / месяц
      </Price>
      <List>
        <li>
          Все бонусы роли{" "}
          <Role className="old" style={{ display: "inline-block" }}>
            древний
          </Role>
        </li>
        <li>
          Дополнительные привилегии на нашем сервере в <a href="https://discord.gg/VU5wjA8">Discord</a>
        </li>
        <li>Участники с этой ролью попадают в список людей, оказавших значительную поддержку серверу.</li>
        {/*<li className="new">Возможность перекалибровки</li>*/}
        <li className="new">Доджлист до 3 игроков</li>
        <li className="new">Double-down рейтинга</li>
      </List>

      <br />
      <br />

      <WelcomeText>Способы поддержки</WelcomeText>
      <br />

      <NormalizedContainer>
        <Note>
          Внимание! В описаниях к платежу указывайте ссылку на свой профиль на нашем сайте. <br />
          Пример ссылки на профиль:{" "}
          <Link passHref href={`https://dota2classic.ru/player/280443916/`}>
            <a style={{ color: "#d9d9d9", textDecoration: "none" }}>https://dota2classic.ru/player/280443916</a>
          </Link>
        </Note>

        <Way2Pay>
          <a href="https://boosty.to/dota2classic">Boosty</a>
        </Way2Pay>

        <Way2Pay>
          <a href="https://qiwi.com/n/ARKEE769">QIWI</a>
        </Way2Pay>

        <Way2Pay>Карта (Сбербанк): 4276 3801 5277 6873</Way2Pay>
        <Way2Pay>МИР: 2202 2011 2865 1052</Way2Pay>
        <Way2Pay>Яндекс.Деньги: 410011001103695</Way2Pay>

        <br />
        <br />
      </NormalizedContainer>
    </Layout>
  );
};
