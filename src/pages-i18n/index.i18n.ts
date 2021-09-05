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
  },
  magicWorld: {
    id: `${INTL_KEY}.magic_world`,
    defaultMessage: "Волшебный мир старой Доты"
  },
  cozyHome: {
    id: `${INTL_KEY}.cozy_home`,
    defaultMessage: "Уютный дом, в котором выросли миллионы"
  },
  playFree: {
    id: `${INTL_KEY}.play_free`,
    defaultMessage: "Играть бесплатно"
  },
  startPlaying: {
    id: `${INTL_KEY}.start_playing`,
    defaultMessage: "Начни играть в "
  },
  realDota: {
    id: `${INTL_KEY}.real_dota`,
    defaultMessage: "Настоящую Доту"
  },
  remember: {
    id: `${INTL_KEY}.remember`,
    defaultMessage:
      "Вспомни или попробуй истоки современной Доты, то, с чего все начиналось. Source 1, мрачная, но приятная атмосфера и совершенно другой геймплей."
  },
  oldAbilities: {
    id: `${INTL_KEY}.old_abilities`,
    defaultMessage: "Старые способности"
  },
  newFeelings: {
    id: `${INTL_KEY}.new_feelings`,
    defaultMessage: "Новые ощущения"
  },
  oldDota: {
    id: `${INTL_KEY}.old_dota`,
    defaultMessage: "Старая Дота ощущается совершенно иначе, чем современная."
  },
  firstGame: {
    id: `${INTL_KEY}.first_game`,
    defaultMessage: "В первой же своей игре ты это поймешь."
  },

  hard: {
    id: `${INTL_KEY}.hard`,
    defaultMessage: "Она сложная, жесткая, но в тоже время зачаровывающая."
  },
  itemsMissing: {
    id: `${INTL_KEY}.items_missing`,
    defaultMessage: "Некоторых героев еще нет, как и предметов,"
  },
  but: {
    id: `${INTL_KEY}.but`,
    defaultMessage: "но"
  },
  pudgeDeny: {
    id: `${INTL_KEY}.pudge_deny`,
    defaultMessage: "Пудж все еще денаится."
  },
  nostalgy: {
    id: `${INTL_KEY}.nostalgy`,
    defaultMessage: "Готов окунуться в ностальгию?"
  },
  onlyClient: {
    id: `${INTL_KEY}.only_client`,
    defaultMessage: "Нужен только клиент игры"
  }
});

export default createI18n(messages);
