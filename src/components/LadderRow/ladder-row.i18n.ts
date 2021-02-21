import { defineMessages } from "react-intl";
import { createI18n } from "utils/i18n";

const INTL_KEY = "dota2classic.ladder-row";

const messages = defineMessages({
  rank: {
    id: `${INTL_KEY}.rank`,
    defaultMessage: "Место"
  },
  player: {
    id: `${INTL_KEY}.player`,
    defaultMessage: "Игрок"
  },
  mmr: {
    id: `${INTL_KEY}.mmr`,
    defaultMessage: "MMR"
  }
});

export default createI18n(messages);
