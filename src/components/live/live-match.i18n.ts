import { defineMessages } from "react-intl";
import { createI18n } from "utils/i18n";

const INTL_KEY = "dota2classic.live_match";

const messages = defineMessages({
  mode: {
    id: `${INTL_KEY}.mode`,
    defaultMessage: "Режим"
  },
  inGameTime: {
    id: `${INTL_KEY}.in_game_time`,
    defaultMessage: "Время в игре"
  },
  score: {
    id: `${INTL_KEY}.score`,
    defaultMessage: "Счет"
  },
  watchGame: {
    id: `${INTL_KEY}.watch_game`,
    defaultMessage: "Смотреть игру в клиенте"
  }
});

export default createI18n(messages);
