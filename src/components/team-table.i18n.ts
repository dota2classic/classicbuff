import { defineMessages } from "react-intl";
import { createI18n } from "utils/i18n";

const INTL_KEY = "dota2classic.team_table";

const messages = defineMessages({
  level: {
    id: `${INTL_KEY}.level`,
    defaultMessage: "Уровень"
  },
  hero: {
    id: `${INTL_KEY}.hero`,
    defaultMessage: "Герой"
  },
  player: {
    id: `${INTL_KEY}.player`,
    defaultMessage: "Игрок"
  },
  items: {
    id: `${INTL_KEY}.items`,
    defaultMessage: "Предметы"
  }
});

export default createI18n(messages);
