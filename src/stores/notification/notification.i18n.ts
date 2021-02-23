import { defineMessages } from "react-intl";
import { createI18n } from "utils/i18n";

const INTL_KEY = "dota2classic.notification";

const messages = defineMessages({
  inviteSend: {
    id: `${INTL_KEY}.invite_send`,
    defaultMessage: "Приглашение в команду отправлено {name}"
  }
});

export default createI18n(messages);
