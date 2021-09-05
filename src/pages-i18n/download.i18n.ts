import { defineMessages } from "react-intl";
import { createI18n } from "utils/i18n";

const INTL_KEY = "dota2classic.download-page";

const messages = defineMessages({
  attentionQueue: {
    id: `${INTL_KEY}.attention_queue`,
    defaultMessage: "Внимание: Поиск игры происходит через <a>сайт</a>"
  },
  dontQueueInGame: {
    id: `${INTL_KEY}.dont_queue_in_game`,
    defaultMessage: "Нажимать на поиск игры в самом клиенте <span>НЕ НУЖНО</span>"
  },

  googleDisk: {
    id: `${INTL_KEY}.google_disk`,
    defaultMessage: "Скачать через Google Диск"
  },
  yandexDisk: {
    id: `${INTL_KEY}.yandex_disk`,
    defaultMessage: "Скачать через Яндекс.Диск"
  },
  torrent: {
    id: `${INTL_KEY}.torrent`,
    defaultMessage: "Скачать Torrent"
  },
  loginViaSteam: {
    id: `${INTL_KEY}.login_via_steam`,
    defaultMessage: "Войди через"
  },
  enterQueue: {
    id: `${INTL_KEY}.enter_queue`,
    defaultMessage: "Начни поиск игры на сайте"
  },
  download: {
    id: `${INTL_KEY}.download`,
    defaultMessage: "Скачай клиент"
  }
});

export default createI18n(messages);
