import { defineMessages } from "react-intl";
import { createI18n } from "utils/i18n";

const INTL_KEY = "dota2classic.invite-player-modal";

const messages = defineMessages({
  inviteSent: {
    id: `${INTL_KEY}.invite_sent`,
    defaultMessage: "Приглашение в группу отправлено {name}"
  },

  title: {
    id: `${INTL_KEY}.title`,
    defaultMessage: "Искать"
  }
});

export default createI18n(messages);
