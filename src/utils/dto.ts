import { MatchmakingMode } from "./format/formatGameMode";

export interface GameServersDTO {
  urls: string[];
}
export interface GameServerDTO {
  url: string;
  running: boolean;
  mode?: MatchmakingMode;
}

export interface ServerOperatorDTO {
  gameServers: GameServerDTO[];
  url: string;
}

export interface RoomDTO {
  id: number;
  mode: MatchmakingMode;
  parties: PartyDTO[];
}

export interface QueuePlayerDTO {
  name: string;
  realm: number;
  id: string;
}

export interface QueueDTO {
  parties: PartyDTO[];
  mode: MatchmakingMode;
}

export interface PartyDTO {
  id: number;
  players: QueuePlayerDTO[];
  leader: QueuePlayerDTO;
}
