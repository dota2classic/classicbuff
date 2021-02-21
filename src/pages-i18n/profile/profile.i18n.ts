import { defineMessages } from "react-intl";
import { createI18n } from "utils/i18n";

const INTL_KEY = "dota2classic.profile";

const messages = defineMessages({
  infoRow: {
    id: `${INTL_KEY}.info_row`,
    defaultMessage: "{rank} Ранг, {mmr} MMR"
  },
  history: {
    id: `${INTL_KEY}.history`,
    defaultMessage: "История матчей"
  },
  generalStats: {
    id: `${INTL_KEY}.general_stats`,
    defaultMessage: "Общая статистика"
  },
  teamInvites: {
    id: `${INTL_KEY}.team_invites`,
    defaultMessage: "Приглашения в команду"
  },
  logout: {
    id: `${INTL_KEY}.logout`,
    defaultMessage: "Выйти"
  },
  id: {
    id: `${INTL_KEY}.id`,
    defaultMessage: "ID"
  },
  mode: {
    id: `${INTL_KEY}.mode`,
    defaultMessage: "Режим"
  },
  duration: {
    id: `${INTL_KEY}.duration`,
    defaultMessage: "Длительность"
  },
  hero: {
    id: `${INTL_KEY}.hero`,
    defaultMessage: "Герой"
  },
  items: {
    id: `${INTL_KEY}.items`,
    defaultMessage: "Предметы"
  },
  result: {
    id: `${INTL_KEY}.result`,
    defaultMessage: "Результат"
  },
  win: {
    id: `${INTL_KEY}.win`,
    defaultMessage: "Победа"
  },
  loss: {
    id: `${INTL_KEY}.loss`,
    defaultMessage: "Поражение"
  }
});

export default createI18n(messages);
