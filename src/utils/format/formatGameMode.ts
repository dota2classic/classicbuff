export enum MatchmakingMode {
  RANKED = 0,
  UNRANKED = 1,
  SOLOMID = 2,
  DIRETIDE = 3,
  GREEVILING = 4,
  ABILITY_DRAFT = 5
}
export default (mode: MatchmakingMode) => {
  if (mode === MatchmakingMode.SOLOMID) {
    return "1x1 mid";
  } else if (mode === MatchmakingMode.DIRETIDE) {
    return "Diretide";
  } else if (mode === MatchmakingMode.RANKED) {
    return "Ranked";
  } else if (mode === MatchmakingMode.UNRANKED) {
    return "Unranked";
  } else if (mode === MatchmakingMode.GREEVILING) {
    return "Гряволы";
  } else if (mode === MatchmakingMode.ABILITY_DRAFT) {
    return "Ability Draft";
  }
};
