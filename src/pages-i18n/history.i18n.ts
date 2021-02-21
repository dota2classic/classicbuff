import { defineMessages } from "react-intl";
import { createI18n } from "utils/i18n";

const INTL_KEY = "dota2classic.history-page";

const messages = defineMessages({
  title: {
    id: `${INTL_KEY}.title`,
    defaultMessage: "История матчей"
  },
  allModes: {
    id: `${INTL_KEY}.all_modes`,
    defaultMessage: "Все"
  },
  tableMatchId: {
    id: `${INTL_KEY}.table_match_id`,
    defaultMessage: "ID матча"
  },
  tableMode: {
    id: `${INTL_KEY}.table_mode`,
    defaultMessage: "Режим"
  },
  tableWinner: {
    id: `${INTL_KEY}.table_winner`,
    defaultMessage: "Победитель"
  },
  tableDuration: {
    id: `${INTL_KEY}.table_duration`,
    defaultMessage: "Длительность"
  },
  tableRadiant: {
    id: `${INTL_KEY}.table_radiant`,
    defaultMessage: "Силы Света"
  },
  tableDire: {
    id: `${INTL_KEY}.table_dire`,
    defaultMessage: "Силы Тьмы"
  }
});

export default createI18n(messages);
