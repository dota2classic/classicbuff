import Layout from "../components/Layout";
import React, { ReactNode } from "react";
import styled from "styled-components";
import { CardBlock, CardRow } from "./index";
import Link from "next/link";
import Head from "next/head";
import i18n from "pages-i18n/donate.i18n";

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

      <WelcomeText>{i18n.welcomeText}</WelcomeText>

      <CardRow className={"inline"}>
        <CardBlock
          text={"Версия The International 2014"}
          img={"https://cdn.discordapp.com/attachments/708963137361018921/709323583544885258/donat2.png"}
        />
      </CardRow>

      <br />
      <br />

      <WelcomeText>{i18n.levels}</WelcomeText>
      <br />

      <Role className="old">{i18n.old}</Role>
      <Price>{i18n.oldPrice}</Price>
      <List>
        <li>
          {i18n.withValues.nicknameDiscord({
            a: (...chunks: ReactNode[]) => <a href="https://discord.gg/VU5wjA8">{chunks}</a>
          })}
        </li>
        <li>{i18n.watchGames}</li>
        <li>{i18n.rankedPartyGames}</li>
        <li>{i18n.createTeams}</li>
      </List>

      <br />

      <Role className="human">{i18n.human}</Role>
      <Price>
        <span style={{ textDecoration: "line-through", color: "#5b5b5b" }}>{i18n.humanPriceOld}</span>
        {i18n.humanPriceActual}
      </Price>
      <List>
        <li>
          {i18n.withValues.allOldFeatures({
            role: (...chunks: ReactNode[]) => (
              <Role className="old" style={{ display: "inline-block" }}>
                {chunks}
              </Role>
            )
          })}
        </li>
        <li>
          {i18n.withValues.additionalDiscordFeatures({
            a: (...chunks: ReactNode[]) => <a href="https://discord.gg/VU5wjA8">{chunks}</a>
          })}
        </li>
        <li>{i18n.realHelpThankYou}</li>
        {/*<li className="new">Возможность перекалибровки</li>*/}
        <li className="new">{i18n.dodgeList}</li>
        <li className="new">{i18n.doubleDown}</li>
      </List>

      <br />
      <br />

      <WelcomeText>{i18n.waysToSupport}</WelcomeText>
      <br />

      <NormalizedContainer>
        <Note>
          {i18n.withValues.notToAddLink({
            a: (...chunks: ReactNode[]) => (
              <Link passHref href={`https://dota2classic.ru/player/280443916/`}>
                <a style={{ color: "#d9d9d9", textDecoration: "none" }}>{chunks}</a>
              </Link>
            ),
            break: () => <br />
          })}
        </Note>

        <Way2Pay>
          <a href="https://boosty.to/dota2classic">Boosty</a>
        </Way2Pay>

        <Way2Pay>
          <a href="https://qiwi.com/n/ARKEE769">QIWI</a>
        </Way2Pay>

        <Way2Pay>{i18n.card}</Way2Pay>
        <Way2Pay>{i18n.mir}</Way2Pay>
        <Way2Pay>{i18n.yandexMoney}</Way2Pay>
        <Way2Pay>
          <a href="https://patreon.com/dota2classic">Patreon</a>
        </Way2Pay>

        <br />
        <br />
      </NormalizedContainer>
    </Layout>
  );
};
