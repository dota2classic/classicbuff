import { defineMessages } from "react-intl";
import { createI18n } from "utils/i18n";

const INTL_KEY = "dota2classic.donate-page";

const messages = defineMessages({
  welcomeText: {
    id: `${INTL_KEY}.welcome_text`,
    defaultMessage:
      "Вы можете поспособствовать развитию сервера и совершить добровольное пожертвование на его продвижение"
  },
  levels: {
    id: `${INTL_KEY}.levels`,
    defaultMessage: "Уровни подписки"
  },
  old: {
    id: `${INTL_KEY}.old`,
    defaultMessage: "Древний"
  },
  oldPrice: {
    id: `${INTL_KEY}.old_price`,
    defaultMessage: "81₽ / месяц"
  },
  nicknameDiscord: {
    id: `${INTL_KEY}.nickname_discord`,
    defaultMessage: "Возможность менять никнейм на нашем сервере в <a>Discord</a>"
  },
  watchGames: {
    id: `${INTL_KEY}.watch_games`,
    defaultMessage: "Возможность смотреть игры"
  },
  rankedPartyGames: {
    id: `${INTL_KEY}.ranked_party_games`,
    defaultMessage: "Возможность искать рейтинговые игры в группе"
  },
  createTeams: {
    id: `${INTL_KEY}.create_teams`,
    defaultMessage: "Возможность создавать команды"
  },
  human: {
    id: `${INTL_KEY}.human`,
    defaultMessage: "Человек"
  },
  humanPriceOld: {
    id: `${INTL_KEY}.human_price_old`,
    defaultMessage: "600₽"
  },
  humanPriceActual: {
    id: `${INTL_KEY}.human_price_actual`,
    defaultMessage: " 300₽ / месяц"
  },
  allOldFeatures: {
    id: `${INTL_KEY}.all_old_features`,
    defaultMessage: "Все бонусы роли <role>древний</role>"
  },
  additionalDiscordFeatures: {
    id: `${INTL_KEY}.additional_discord_features`,
    defaultMessage: "Дополнительные привилегии на нашем сервере в <a>Discord</a>"
  },
  realHelpThankYou: {
    id: `${INTL_KEY}.real_help_thank_you`,
    defaultMessage: "Участники с этой ролью попадают в список людей, оказавших значительную поддержку серверу."
  },
  dodgeList: {
    id: `${INTL_KEY}.dodge_list`,
    defaultMessage: "Доджлист до 3 игроков"
  },
  doubleDown: {
    id: `${INTL_KEY}.double_down`,
    defaultMessage: "Double-down рейтинга"
  },
  waysToSupport: {
    id: `${INTL_KEY}.ways_to_support`,
    defaultMessage: "Способы поддержки"
  },
  notToAddLink: {
    id: `${INTL_KEY}.not_to_add_link`,
    defaultMessage:
      "Внимание! В описаниях к платежу указывайте ссылку на свой профиль на нашем сайте. Пример ссылки на профиль: <a>https://dota2classic.ru/player/280443916</a>"
  },
  card: {
    id: `${INTL_KEY}.card`,
    defaultMessage: "Карта (Сбербанк): 4276 3801 5277 6873"
  },
  mir: {
    id: `${INTL_KEY}.mir`,
    defaultMessage: "МИР: 2202 2011 2865 1052"
  },
  yandexMoney: {
    id: `${INTL_KEY}.yandex_money`,
    defaultMessage: "Яндекс.Деньги: 410011001103695"
  }
});

export default createI18n(messages);
