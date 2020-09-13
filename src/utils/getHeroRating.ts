import { PlayerStatsDto } from "../generated/sdk";

export default (it: PlayerStatsDto) => {
  const wr = Number(it.wins) / Number(it.games);
  const gamesPlayed = Number(it.games);
  const avgKda = Number(it.kda);
  return gamesPlayed * avgKda + wr * 100;
};
