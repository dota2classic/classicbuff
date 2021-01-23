import { observer } from "mobx-react";
import styled from "styled-components";
import React, { ReactNode } from "react";
import formatGameMode, { MatchmakingMode } from "../../../utils/format/formatGameMode";
import { colors } from "../../../shared";
import Link from "next/link";
import { useStores } from "../../../stores";
import { AdBanner } from "../../../components/ads/ads";
import { BanStatusInfo } from "../../../components/UI/BanStatusInfo";

const Container = styled.div`
  flex: 1;
  flex-direction: column;
  padding: 40px 20px 20px;
`;

const ShortInfo = styled.div`
  margin-left: 40px;
  margin-right: 40px;
  font-size: 16px;

  & .game-mode {
    font-size: 20px;
    font-weight: bold;
    margin-bottom: 20px;
  }
  & a {
    cursor: pointer;
    color: ${colors.primaryTextDark};
    transition: 0.3s ease;
    &:hover {
      color: ${colors.primaryText};
    }
  }
`;

const texts: { [key in MatchmakingMode]: ReactNode } = {
  [MatchmakingMode.RANKED]: (
    <span>
      Самый популярный режим на сервере. Первые 10 игр в сезоне - калибровочные, после калибровки рейтинг меняется на
      ±25 очков. <br />
      <br />
      <Link href={"/leaderboard"}>
        <a>Посмотреть таблицу лидеров</a>
      </Link>
    </span>
  ),
  [MatchmakingMode.UNRANKED]: (
    <span>
      Обычная игра 5х5 без рейтинга. Этот режим менее популярен, чем <b>{formatGameMode(MatchmakingMode.RANKED)}</b>
    </span>
  ),
  [MatchmakingMode.BOTS]: (
    <span>
      Пустые слоты заполняются ботами. Если есть хотя бы 2 игрока в поиске, то игра найдется. Проверка происходит каждые
      10 минут.
    </span>
  ),
  [MatchmakingMode.SOLOMID]: (
    <span>
      Отличный способ вспомнить карту, старые способности, привыкнуть к Source 1. Второй по популярности режим
    </span>
  ),
  [MatchmakingMode.DIRETIDE]: (
    <span>Знаменитый {formatGameMode(MatchmakingMode.DIRETIDE)}, который все так давно просят.</span>
  ),
  [MatchmakingMode.GREEVILING]: <span>Один из самых старых ивентов, проводимых Valve</span>,
  [MatchmakingMode.ABILITY_DRAFT]: (
    <span>Старый добрый Ability Draft. Создай своего героя сам из старых способностей и без талантов!</span>
  ),
  [MatchmakingMode.HIGHROOM]: <span>Режим для поиска игр с высоким рейтингом</span>
};

export const SelectedGameMode = observer(() => {
  const { game, auth } = useStores();

  return (
    <Container>
      <ShortInfo>
        <div className={"game-mode"}>{formatGameMode(game.activeMode)}</div>

        {(auth.me?.banStatus?.isBanned && <BanStatusInfo ban={auth.me.banStatus} />) || texts[game.activeMode]}

        <br />
        <br />
        <br />
        <AdBanner />
      </ShortInfo>
    </Container>
  );
});
