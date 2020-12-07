import { PlayerStatsDto } from "../generated/sdk";
import { HeroStatsDto } from "../api/back/models";

export default (it: HeroStatsDto) => {
  const wr = Number(it.wins) / Number(it.games);
  const gamesPlayed = Number(it.games);
  const avgKda = Number(it.kda);
  return gamesPlayed * avgKda + wr * 100;
};
