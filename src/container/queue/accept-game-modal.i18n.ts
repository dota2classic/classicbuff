import { defineMessages } from "react-intl";
import { createI18n } from "utils/i18n";

const INTL_KEY = "dota2classic.accept-game-modal";

const messages = defineMessages({
  gameReady: {
    id: `${INTL_KEY}.game_ready`,
    defaultMessage: "Игра готова!"
  },
  serverSearch: {
    id: `${INTL_KEY}.server_search`,
    defaultMessage: "Идет поиск игрового сервера..."
  },
  connectToGame: {
    id: `${INTL_KEY}.connect_to_game`,
    defaultMessage: "Подключиться к игре"
  },
  gameFound: {
    id: `${INTL_KEY}.game_found`,
    defaultMessage: "Игра найдена!"
  },
  acceptGame: {
    id: `${INTL_KEY}.accept_game`,
    defaultMessage: "Принять"
  },
  declineGame: {
    id: `${INTL_KEY}.decline_game`,
    defaultMessage: "Отклонить"
  },
  waitingForPlayers: {
    id: `${INTL_KEY}.waiting_for_players`,
    defaultMessage: "Ожидаем игроков"
  }
});

export default createI18n(messages);
