import { defineMessages } from "react-intl";
import { createI18n } from "utils/i18n";

const INTL_KEY = "dota2classic.layout";

const messages = defineMessages({
  download: {
    id: `${INTL_KEY}.download`,
    defaultMessage: "Скачать"
  },
  play: {
    id: `${INTL_KEY}.play`,
    defaultMessage: "Играть"
  },
  donate: {
    id: `${INTL_KEY}.donate`,
    defaultMessage: "Пожертвовать"
  },
  leaderboard: {
    id: `${INTL_KEY}.leaderboard`,
    defaultMessage: "Таблица лидеров"
  },
  matches: {
    id: `${INTL_KEY}.matches`,
    defaultMessage: "Матчи"
  },
  live: {
    id: `${INTL_KEY}.live`,
    defaultMessage: "Live"
  },
  profile: {
    id: `${INTL_KEY}.profile`,
    defaultMessage: "Профиль"
  },
  tournaments: {
    id: `${INTL_KEY}.tournaments`,
    defaultMessage: "Турниры"
  },
  teams: {
    id: `${INTL_KEY}.teams`,
    defaultMessage: "Команды"
  },
  loginViaSteam: {
    id: `${INTL_KEY}.login_via_steam`,
    defaultMessage: "Войти через steam"
  },
  stats: {
    id: `${INTL_KEY}.stats`,
    defaultMessage: "Статистика"
  },
  meta: {
    id: `${INTL_KEY}.meta`,
    defaultMessage: "Meta"
  },
  news: {
    id: `${INTL_KEY}.blog`,
    defaultMessage: "News"
  }
});

export default createI18n(messages);
