import Head from "next/head";
import Layout, { LinkWrapper } from "../components/Layout";
import React from "react";
import styled from "styled-components";
import Link from "next/link";
import LadderRow from "../components/LadderRow";
import { LadderElement } from "../shared";
import heroName from "../utils/heroName";
import usePlayer from "../utils/usePlayer";
import useMatch from "../utils/useMatch";
import { formatDuration } from "./match/[id]";

const CardImage = styled.div`
  width: auto;
  height: 300px;
  object-fit: cover;
  transition: 0.7s ease;
  position: relative;

  @media (max-width: 600px) {
    height: 100px;
  }
`;

const WelcomeText = styled.div`
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

const CardTitle = styled.div`
  font-size: 14px;
  z-index: 2;
`;

const CardValue = styled.div`
  color: #a9cf54;
  z-index: 2;
  font-size: 20px;
  font-weight: bold;
`;

const CardPlayer = styled.div`
  font-size: 14px;
  z-index: 2;
`;
const CardHero = styled.div`
  font-size: 14px;
  z-index: 2;
`;
const Card = styled.a<{ bg: string }>`
  display: flex;
  text-decoration: none;
  flex-direction: column;
  width: 300px;
  min-height: 171px;
  justify-content: space-evenly;
  flex: 1;

  &.item {
    background-size: cover;
    background-position-y: center;
  }
  color: white;
  @media (max-width: 600px) {
    height: unset;
  }
  position: relative;
  overflow: hidden;
  & + & {
    //margin-top: 60px;
  }

  align-items: center;

  background-image: ${props => `url("${props.bg}")`};
  background-size: 100% !important;
  background-repeat: no-repeat !important;
`;

const Backdrop = styled.div`
  position: absolute;
  top: 0px;
  right: 0px;
  bottom: 0px;
  left: 0px;
  background: rgba(10, 10, 10, 0.7);
`;

interface Props {
  title: string;
  player: string;
  hero: string;
  value: number;
  match: number;
}

interface MatchCardProps {
  title: string;
  value: string;
  match: number;
  img: string;
}

interface InfoCardProps {
  title: string;
  value: string | number;
  img: string;
}

export const InfoCard = ({ value, img, title }: InfoCardProps) => {
  return (
    <Card className="item" bg={img}>
      <Backdrop />
      <CardTitle>{title}</CardTitle>
      <CardValue>{value}</CardValue>
    </Card>
  );
};

export const MatchCard = ({ value, img, title, match }: MatchCardProps) => {
  return (
    <Link passHref href={`/match/${match}`}>
      <Card className="item" bg={img}>
        <Backdrop />
        <CardTitle>{title}</CardTitle>
        <CardValue>{value}</CardValue>
      </Card>
    </Link>
  );
};

export const CardBlock = ({ value, title, player, hero, match }: Props) => {
  const p = usePlayer(player);
  const m = useMatch(match);
  return (
    <Link passHref href={`/match/${match}`}>
      <Card bg={`/static/heroes/${hero}.jpg`}>
        <Backdrop />
        <CardTitle>{title}</CardTitle>
        <CardValue>{value}</CardValue>
        <CardHero>
          {heroName(hero)}, {(m?.duration && formatDuration(m?.duration)) || ``}
        </CardHero>
        <CardPlayer>{p?.name || ""}</CardPlayer>
      </Card>
    </Link>
  );
};

const Cards = styled.div`
    display: flex;
    flex-direction: row;
    margin-top: 40px;
    
    
    ${Card} + ${Card} {
      margin-left: 20px;
    }
`;

export default () => {
  return (
    <Layout landing>
      <Head>
        <title>Классическая Dota</title>
        <meta
          name="description"
          content="dota2classic.ru - discord сервер для игры в классическую доту 6.81 2014 года"
        />
      </Head>

      <WelcomeText>
        Рекорды 1 сезона <b>dota2classic</b>
      </WelcomeText>

      <Cards>
        <CardBlock hero={"npc_dota_hero_riki"} title={"Убийств"} value={41} player={"[U:1:1062901073]"} match={555} />
        <CardBlock
          hero={"npc_dota_hero_necrolyte"}
          title={"Смертей"}
          value={22}
          player={"[U:1:129236094]"}
          match={555}
        />
        <CardBlock hero={"npc_dota_hero_spectre"} title={"Помощи"} value={42} player={"[U:1:870950483]"} match={614} />
      </Cards>

      <Cards>
        <CardBlock
          hero={"npc_dota_hero_antimage"}
          title={"Золота в минуту"}
          value={889}
          player={"[U:1:116514945]"}
          match={202}
        />
        <CardBlock
          hero={"npc_dota_hero_antimage"}
          title={"Опыта в минуту"}
          value={1024}
          player={"[U:1:116514945]"}
          match={202}
        />
        <CardBlock
          hero={"npc_dota_hero_invoker"}
          title={"Добито крипов"}
          value={509}
          player={"[U:1:116514945]"}
          match={170}
        />
      </Cards>

      <Cards>
        <CardBlock
          hero={"npc_dota_hero_invoker"}
          title={"Добито союзных крипов"}
          value={59}
          player={"[U:1:129236094]"}
          match={170}
        />
        <MatchCard
          title={"Самый длинный матч"}
          img={`/static/items/hand_of_midas.jpg`}
          match={390}
          value={formatDuration(3721)}
        />
        <MatchCard
          title={"Самый быстрый матч"}
          img={`/static/items/bottle_haste.jpg`}
          match={542}
          value={formatDuration(1262)}
        />
      </Cards>

      <Cards>
        <InfoCard title={"Матчей сыграно"} img={`/static/items/aegis.jpg`} value={557} />

        <InfoCard title={"Уникальных игроков"} img={`/static/items/mask_of_madness.jpg`} value={341} />

        <InfoCard title={"Времени в игре"} img={`/static/items/ward_observer.jpg`} value={`231ч 26м`} />
      </Cards>
    </Layout>
  );
};

// 455,2020-08-08 15:25:59.771536,2,false,7028
