import { defineMessages } from "react-intl";
import { createI18n } from "utils/i18n";

const INTL_KEY = "dota2classic.live";

const messages = defineMessages({
  noGames: {
    id: `${INTL_KEY}.no_games`,
    defaultMessage: "Сейчас не идет ни одной игры."
  },
  goodReasonToQueue: {
    id: `${INTL_KEY}.good_reason_to_queue`,
    defaultMessage: "Отличный повод запустить поиск!"
  }
});

export default createI18n(messages);
