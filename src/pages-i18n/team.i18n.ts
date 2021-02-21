import { defineMessages } from "react-intl";
import { createI18n } from "utils/i18n";

const INTL_KEY = "dota2classic.teams";

const messages = defineMessages({
  teams: {
    id: `${INTL_KEY}.teams`,
    defaultMessage: "Команды"
  },
  noTeams: {
    id: `${INTL_KEY}.no_teams`,
    defaultMessage: "Еще нет ни одной команды!"
  },
  oldRequired: {
    id: `${INTL_KEY}.old_required`,
    defaultMessage: "Создать команду может только игрок с подпиской <old>Древний</old> или <human>Человек</human>"
  }
});

export default createI18n(messages);
