import { defineMessages } from "react-intl";
import { createI18n } from "utils/i18n";

const INTL_KEY = "dota2classic.tournament-page";

const messages = defineMessages({
  beginning: {
    id: `${INTL_KEY}.beginning`,
    defaultMessage: "начало {beginning}"
  },
  info: {
    id: `${INTL_KEY}.info`,
    defaultMessage: "Информация"
  },
  players: {
    id: `${INTL_KEY}.players`,
    defaultMessage: "Игроки"
  },
  teams: {
    id: `${INTL_KEY}.teams`,
    defaultMessage: "Команды"
  },
  results: {
    id: `${INTL_KEY}.results`,
    defaultMessage: "Результаты"
  },
  leaveTournament: {
    id: `${INTL_KEY}.leave_tournament`,
    defaultMessage: "Покинуть турнир"
  },
  participate: {
    id: `${INTL_KEY}.participate`,
    defaultMessage: "Участвовать"
  },
  bracket: {
    id: `${INTL_KEY}.bracket`,
    defaultMessage: "Сетка"
  },
  tournament: {
    id: `${INTL_KEY}.tournament`,
    defaultMessage: "Турнир"
  },

  bracketTitle: {
    id: `${INTL_KEY}.bracket_title`,
    defaultMessage: "Сетка турнира {title}"
  }
});

export default createI18n(messages);
