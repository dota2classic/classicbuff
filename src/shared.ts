export interface LadderElement {
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
  steam_id?: string;
}

export interface Player {
  id: number;
  team: 2 | 3;
  kills: number;
  deaths: number;
  assists: number;
  player: LadderElement;
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
  type: number;
  players: Player[];
}
