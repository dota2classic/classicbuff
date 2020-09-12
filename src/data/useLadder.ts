import { gql, request } from "graphql-request";
import useSWR from "swr";
import { local } from "../config";
import { Player, Match } from "../shared";
import { MatchmakingMode } from "../utils/format/formatGameMode";
import { FullMatchFragment, MatchNoPlayersFragment, PlayerFragment } from "./fragments";
import { GQLClient } from "./client";

const fetcher = (variables?: any) => (query: any) => GQLClient.request(query, variables);

const query = gql`
  ${PlayerFragment}
  query getMatch {
    Ladder {
      ...PlayerFragment
    }
  }
`;
export default () => {
  return useSWR<{ Ladder: Player[] }>(query, fetcher());
};
