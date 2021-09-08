import { defineMessages } from "react-intl";
import { createI18n } from "utils/i18n";

const INTL_KEY = "dota2classic.search-game-button";

const messages = defineMessages({
  oldRequired: {
    id: `${INTL_KEY}.old_required`,
    defaultMessage:
      "Начать поиск рейтинговой игры в группе может только игрок с подпиской <old>Древний</old> или <human>Человек</human>"
  },
  searchGame: {
    id: `${INTL_KEY}.search_game`,
    defaultMessage: "Искать игру"
  },
  search: {
    id: `${INTL_KEY}.search`,
    defaultMessage: "{s} в поиске"
  },
  cancelSearch: {
    id: `${INTL_KEY}.cancel_search`,
    defaultMessage: "Отменить поиск"
  },
  connecting: {
    id: `${INTL_KEY}.connecting`,
    defaultMessage: "Подключение..."
  },
  steamLogin: {
    id: `${INTL_KEY}.steam_login`,
    defaultMessage: "Войти через Steam"
  }
});

export default createI18n(messages);
