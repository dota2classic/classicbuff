import { defineMessages } from "react-intl";
import { createI18n } from "utils/i18n";

const INTL_KEY = "dota2classic.index_page";

const messages = defineMessages({
  welcomeText: {
    id: `${INTL_KEY}.welcome_text`,
    defaultMessage:
      " Добро пожаловать на сайт проекта <b>Dota 2 Classic</b> - русскоязычного сообщества, где вместе с другими людьми\n" +
      "        можно поиграть в старую версию легендарной игры."
  },
  ti4version: {
    id: `${INTL_KEY}.ti_4_version`,
    defaultMessage: "Версия The International 2014"
  },
  beforeReborn: {
    id: `${INTL_KEY}.before_reborn`,
    defaultMessage: "Клиент игры до обновления Reborn"
  },
  worksWithSteam: {
    id: `${INTL_KEY}.works_with_steam`,
    defaultMessage: "Работает через Steam"
  },
  source1: {
    id: `${INTL_KEY}.source_1`,
    defaultMessage: "Движок Source 1"
  },
  classicBalance: {
    id: `${INTL_KEY}.classic_balance`,
    defaultMessage: "Классический баланс"
  },
  originalLandscape: {
    id: `${INTL_KEY}.original_landscape`,
    defaultMessage: "Оригинальный ландшафт"
  },
  oldItems: {
    id: `${INTL_KEY}.old_items`,
    defaultMessage: "Старые способности героев и удалённые предметы"
  },
  diretide: {
    id: `${INTL_KEY}.diretide`,
    defaultMessage: "Diretide 2012 года"
  },
  noTechies: {
    id: `${INTL_KEY}.no_techies`,
    defaultMessage: "Отсутствует Techies"
  },
  download: {
    id: `${INTL_KEY}.download`,
    defaultMessage: "СКАЧАТЬ"
  },
  joinDiscord: {
    id: `${INTL_KEY}.join_discord`,
    defaultMessage: "DISCORD СООБЩЕСТВО"
  }
});

export default createI18n(messages);
