import { local } from "../../config";
import { gql, request } from "graphql-request";
import { FullTeamFragment } from "../fragments";
import useSWR from "swr";
import { Page, TeamEntity } from "../../shared";
import { QueueDTO, ServerOperatorDTO } from "../../utils/dto";
import { GQLClient } from "../client";

const fetcher = (variables?: any) => (query: any) => GQLClient.request(query, variables);

const query = gql`
  query getTeam {
    GameServers {
      gameServers {
        url
        running
        mode
      }
      url
    }
  }
`;
export default () => {
  return useSWR<{ GameServers: ServerOperatorDTO[] }>(query, fetcher());
};
