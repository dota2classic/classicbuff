export interface LadderElement {
  name: string;
  mmr: number;
  steam_id: string;
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

export interface Match {
  id: number;
  duration: number;
  radiant_win: boolean;
  timestamp: string;
  type: number;
  players: Player[];
}