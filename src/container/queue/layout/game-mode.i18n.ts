import { defineMessages } from "react-intl";
import { createI18n } from "utils/i18n";

const INTL_KEY = "dota2classic.queue-game-modes";

const messages = defineMessages({
  gameSearch: {
    id: `${INTL_KEY}.game_search`,
    defaultMessage: "Поиск игры"
  }
});

export default createI18n(messages);
