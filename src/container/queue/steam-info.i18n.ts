import { defineMessages } from "react-intl";
import { createI18n } from "utils/i18n";

const INTL_KEY = "dota2classic.steam-info";

const messages = defineMessages({
  searchingGameCoordinator: {
    id: `${INTL_KEY}.searching_game_coordinator`,
    defaultMessage: "Идет подключение к игровому координатору..."
  },
  authorization: {
    id: `${INTL_KEY}.authorization`,
    defaultMessage: "Происходит авторизация..."
  },
  leaveGroup: {
    id: `${INTL_KEY}.leave_group`,
    defaultMessage: "Покинуть группу"
  },
  playersInQueue: {
    id: `${INTL_KEY}.players_in_queue`,
    defaultMessage: "игроков: {piq}"
  },
  online: {
    id: `${INTL_KEY}.online`,
    defaultMessage: "{online} онлайн"
  },
  freeServers: {
    id: `${INTL_KEY}.free_servers`,
    defaultMessage: "{free} свободных серверов"
  },
  search: {
    id: `${INTL_KEY}.search`,
    defaultMessage: "Поиск {s}"
  },
  currentGames: {
    id: `${INTL_KEY}.current_games`,
    defaultMessage: "Игр идет: {games}"
  }
});

export default createI18n(messages);
