import { defineMessages } from "react-intl";
import { createI18n } from "utils/i18n";

const INTL_KEY = "dota2classic.leaderboard";

const messages = defineMessages({
  title: {
    id: `${INTL_KEY}.title`,
    defaultMessage: "Таблица лидеров"
  }
});

export default createI18n(messages);
