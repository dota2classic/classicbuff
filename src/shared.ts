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

export const colors = {
  darkBg: "rgb(16, 18, 19)",
  evenDarkerBg: "rgb(13,13,14)",
  primaryText: "rgb(217, 217, 217)",
  primaryTextDark: "rgb(131,130,130)",
  primaryTextDark2: "rgb(83,82,82)",
  error: "rgb(198,38,38)"
};
