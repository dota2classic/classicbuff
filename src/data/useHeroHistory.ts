import { gql, request } from "graphql-request";
import useSWR from "swr";
import { local } from "../config";
import { Match, Page } from "../shared";
import { MatchmakingMode } from "../utils/format/formatGameMode";
import { FullMatchFragment, MatchNoPlayersFragment } from "./fragments";

const API = local ? "http://localhost:5002/graphql" : "https://dota2classic.ru/prod-api/graphql";
const fetcher = (variables?: any) => (query: any) => request(API, query, variables);

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
