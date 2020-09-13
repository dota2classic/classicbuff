import { MatchmakingMode } from "./utils/format/formatGameMode";

export enum Role {
  USER,
  ADMIN
}

export interface Page<T> {
  data: T[];
  page: number;
  pages: number;
}

export const BaseGQLConfig = {
  pollInterval: 5000
};
