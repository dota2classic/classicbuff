import { gql, request } from "graphql-request";
import useSWR from "swr";
import { local } from "../config";
import { Match, Page } from "../shared";
import { MatchmakingMode } from "../utils/format/formatGameMode";
import { FullMatchFragment, MatchNoPlayersFragment } from "./fragments";
import { GQLClient } from "./client";

const fetcher = (variables?: any) => (query: any) => GQLClient.request(query, variables);

const query = gql`
  ${MatchNoPlayersFragment}
  query getMatch($page: Int!, $mode: Int) {
    History(mode: $mode, page: $page) {
      data {
        ...MatchNoPlayersFragment
      }
      page
      pages
    }
  }
`;
export default (page: number, mode?: MatchmakingMode) => {
  return useSWR<{ History: Page<Match> }>([query, page, mode], fetcher({ page, mode }));
};
