import { GQLClient } from "../client";
import { gql } from "graphql-request";
import ServerOperator from "../../components/admin/ServerOperator";
import { ServerOperatorDTO } from "../../utils/dto";
import { MatchmakingMode } from "../../utils/format/formatGameMode";

export enum GQLMatchmakingMode {
  ABILITY_DRAFT = "ABILITY_DRAFT",
  DIRETIDE = "DIRETIDE",
  GREEVILING = "GREEVILING",
  RANKED = "RANKED",
  SOLOMID = "SOLOMID",
  UNRANKED = "UNRANKED"
}

const killServerMutation = gql`
  mutation($url: String!) {
    KillServer(url: $url) {
      url
      gameServers {
        url
        running
      }
    }
  }
`;

const startServerMutation = gql`
  mutation($url: String!, $mode: MatchmakingMode!) {
    StartServer(mode: $mode, url: $url) {
      url
      gameServers {
        url
        running
      }
    }
  }
`;

const restartServerMutation = gql`
  mutation($url: String!, $mode: MatchmakingMode!) {
    RestartServer(mode: $mode, url: $url) {
      url
      gameServers {
        url
        running
      }
    }
  }
`;

export const startServer = (url: string, mode: GQLMatchmakingMode): Promise<{ KillServer: ServerOperatorDTO[] }> =>
  GQLClient.request(startServerMutation, { mode, url });

export const killServer = (url: string): Promise<{ KillServer: ServerOperatorDTO[] }> =>
  GQLClient.request(killServerMutation, { url });

export const restartServer = (url: string, mode: GQLMatchmakingMode): Promise<{ KillServer: ServerOperatorDTO[] }> =>
  GQLClient.request(restartServerMutation, { mode, url });
