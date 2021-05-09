import { defineMessages } from "react-intl";
import { createI18n } from "utils/i18n";
import { Dota2Version } from "utils/format/formatGameMode";

const INTL_KEY = "dota2classic.queue-selected-game-mode";

const messages = defineMessages({
  mostPopularMode: {
    id: `${INTL_KEY}.most_popular_mode`,
    defaultMessage:
      " Самый популярный режим на сервере. Первые 10 игр в сезоне - калибровочные, после калибровки рейтинг меняется на ±25 очков."
  },
  viewLeaderboard: {
    id: `${INTL_KEY}.view_leaderboard`,
    defaultMessage: "Посмотреть таблицу лидеров"
  },
  unranked: {
    id: `${INTL_KEY}.unranked`,
    defaultMessage: "Обычная игра 5х5 без рейтинга. Этот режим менее популярен, чем рейтинг"
  },
  bots: {
    id: `${INTL_KEY}.bots`,
    defaultMessage:
      "Пустые слоты заполняются ботами. Если есть хотя бы 2 игрока в поиске, то игра найдется. Проверка происходит каждые 10 минут."
  },
  solomid: {
    id: `${INTL_KEY}.solomid`,
    defaultMessage:
      "Отличный способ вспомнить способности героя или быстро сыграть с другом. Или потренироваться для турнира 1х1 ;)"
  },
  diretide: {
    id: `${INTL_KEY}.diretide`,
    defaultMessage: "Знаменитый Diretide, который все так давно просят."
  },
  abilityDraft: {
    id: `${INTL_KEY}.ability_draft`,
    defaultMessage: "Старый добрый Ability Draft. Создай своего героя сам из старых способностей и без талантов!"
  }
});

export default createI18n(messages);
