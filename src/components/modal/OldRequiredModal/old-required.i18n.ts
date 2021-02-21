import { defineMessages } from "react-intl";
import { createI18n } from "utils/i18n";

const INTL_KEY = "dota2classic.old-required-modal";

const messages = defineMessages({
  supportProject: {
    id: `${INTL_KEY}.support_project`,
    defaultMessage: "Поддержи проект и получи доступ к эксклюзивным возможностям!"
  },
  learnMore: {
    id: `${INTL_KEY}.learn_more`,
    defaultMessage: "Узнать больше"
  },
  close: {
    id: `${INTL_KEY}.close`,
    defaultMessage: "Закрыть"
  },
  oldRequired: {
    id: `${INTL_KEY}.old_required`,
    defaultMessage: "Эта функция доступна только игрокам с ролью <old>Древний</old> и выше!"
  }
});

export default createI18n(messages);
