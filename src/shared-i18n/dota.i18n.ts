import { defineMessages } from "react-intl";
import { createI18n } from "utils/i18n";

const INTL_KEY = "dota2classic.shared-dota";

const messages = defineMessages({
  dire: {
    id: `${INTL_KEY}.dire`,
    defaultMessage: "Тьма"
  },
  radiant: {
    id: `${INTL_KEY}.radiant`,
    defaultMessage: "Свет"
  }
});

export default createI18n(messages);
