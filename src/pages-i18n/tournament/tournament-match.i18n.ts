import { defineMessages } from "react-intl";
import { createI18n } from "utils/i18n";

const INTL_KEY = "dota2classic.tournament-match";

const messages = defineMessages({
  info: {
    id: `${INTL_KEY}.info`,
    defaultMessage: "Информация о матче"
  },
  mode: {
    id: `${INTL_KEY}.mode`,
    defaultMessage: "Формат"
  },
  bestOf: {
    id: `${INTL_KEY}.best_of`,
    defaultMessage: "Best of {bestOf}"
  },
  timeStart: {
    id: `${INTL_KEY}.time_start`,
    defaultMessage: "Время начала матча"
  },
  gameNumber: {
    id: `${INTL_KEY}.game_number`,
    defaultMessage: "Игра {gn}"
  },
  details: {
    id: `${INTL_KEY}.details`,
    defaultMessage: "Детали игры"
  },
  gameNumberInSeries: {
    id: `${INTL_KEY}.game_number_in_series`,
    defaultMessage: "Номер игры в серии"
  },
  radiantPlayer: {
    id: `${INTL_KEY}.radiant_player`,
    defaultMessage: "Игрок за свет"
  },
  notDecided: {
    id: `${INTL_KEY}.not_decided`,
    defaultMessage: "Еще не определен"
  },
  match: {
    id: `${INTL_KEY}.match`,
    defaultMessage: "Матч"
  },
  matchNotFinished: {
    id: `${INTL_KEY}.match_not_finished`,
    defaultMessage: "Еще не прошел"
  },
  noMatchesPlayed: {
    id: `${INTL_KEY}.no_matches_played`,
    defaultMessage: "Еще не сыграно ни одного матча в серии"
  }
});

export default createI18n(messages);
