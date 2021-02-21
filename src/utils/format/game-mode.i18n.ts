import { defineMessages } from "react-intl";
import { createI18n } from "utils/i18n";

const INTL_KEY = "dota2classic.game-mode";

const messages = defineMessages({
  // MatchmakingMode.TOURNAMENT
  [6]: {
    id: `${INTL_KEY}._matchmaking_mode_tournament_`,
    defaultMessage: "Турнир 5х5"
  },
  // MatchmakingMode.TOURNAMENT_SOLOMID
  [9]: {
    id: `${INTL_KEY}._matchmaking_mode_tournament_solomid_`,
    defaultMessage: "Турнир 1x1"
  },
  // MatchmakingMode.RANKED
  [0]: {
    id: `${INTL_KEY}._matchmaking_mode_ranked_`,
    defaultMessage: "Рейтинг"
  },
  // MatchmakingMode.UNRANKED
  [1]: {
    id: `${INTL_KEY}._matchmaking_mode_unranked`,
    defaultMessage: "Обычная"
  },
  // MatchmakingMode.SOLOMID
  [2]: {
    id: `${INTL_KEY}._matchmaking_mode_solomid`,
    defaultMessage: "1x1 мид"
  },
  // MatchmakingMode.ABILITY_DRAFT
  [5]: {
    id: `${INTL_KEY}._matchmaking_mode_ability_draft`,
    defaultMessage: "Ability draft"
  },
  // MatchmakingMode.DIRETIDE
  [3]: {
    id: `${INTL_KEY}._matchmaking_mode_diretide`,
    defaultMessage: "Diretide"
  },
  // MatchmakingMode.HIGHROOM
  [8]: {
    id: `${INTL_KEY}._matchmaking_mode_highroom`,
    defaultMessage: "High room"
  },
  // MatchmakingMode.BOTS
  [7]: {
    id: `${INTL_KEY}._matchmaking_mode_bots`,
    defaultMessage: "Обычная(новички)"
  },
  // MatchmakingMode.GREEVILING
  [4]: {
    id: `${INTL_KEY}._matchmaking_mode_greeviling`,
    defaultMessage: "Гряволы"
  }
});

export default createI18n(messages);
