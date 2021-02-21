import { defineMessages } from "react-intl";
import { createI18n } from "utils/i18n";

const INTL_KEY = "dota2classic.queue-layout";

const messages = defineMessages({
  steamLoginRequired: {
    id: `${INTL_KEY}.steam_login_required`,
    defaultMessage: "Для поиска игры нужно войти в свой Steam аккаунт"
  }
});

export default createI18n(messages);
