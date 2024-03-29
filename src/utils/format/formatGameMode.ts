import gmi18n from "./game-mode.i18n";

export enum MatchmakingMode {
  RANKED = 0,
  UNRANKED = 1,
  SOLOMID = 2,
  DIRETIDE = 3,
  GREEVILING = 4,
  ABILITY_DRAFT = 5,
  TOURNAMENT = 6,
  BOTS = 7,
  HIGHROOM = 8,
  TOURNAMENT_SOLOMID = 9,
  CAPTAINS_MODE = 10
}

export enum Dota2Version {
  Dota_681 = "Dota_681",
  Dota_678 = "Dota_678",
  Dota_684 = "Dota_684"
}

export default (mode: any) => {
  return gmi18n[mode as MatchmakingMode] as any;
};
