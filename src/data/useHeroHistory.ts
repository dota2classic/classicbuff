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
  query getMatch($page: Int!, $hero: String!) {
    HeroMatches(hero: $hero, page: $page) {
      data {
        ...MatchNoPlayersFragment
      }
      page
      pages
    }
  }
`;
export default (page: number, hero: string) => {
  return useSWR<{ HeroMatches: Page<Match> }>([query, page, hero], fetcher({ page, hero }));
};
