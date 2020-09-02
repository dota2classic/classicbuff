import { MatchmakingMode } from "./utils/format/formatGameMode";

export enum Role {
  USER,
  ADMIN
}

export interface PlayerStats {
  heroes: PlayerStatsDto[];
  overall: Overall;
}
export interface Overall {
  games: number;
  wins: number;
  loss: number;
}

export interface Player {
  name: string;
  mmr: number;
  steam_id: string;
}

export interface PlayerStatsDto {
  playerSteamId: string;
  id: number;
  gpm: number;
  xpm: number;
  kda: number;
  games: number;
  wins: number;
  loss: number;
  last_hits: number;
  denies: number;
  hero: string;
}

export interface User {
  discord_id: string;
  role: Role;
  steam_id?: string;
}

export interface PlayerInMatch {
  id: number;
  team: 2 | 3;
  kills: number;
  deaths: number;
  assists: number;
  player: Player;
  items: string;
  level: number;
  gpm: number;
  xpm: number;
  last_hits: number;
  denies: number;
  hero: string;
}

export interface HeroSummary {
  games: number;
  wins: number;
  losses: number;
  kills: number;
  deaths: number;
  assists: number;
  hero: string;
}

export interface Match {
  id: number;
  duration: number;
  radiant_win: boolean;
  timestamp: string;
  type: MatchmakingMode;
  players: PlayerInMatch[];
}

export interface Page<T> {
  data: T[];
  page: number;
  pages: number;
}
