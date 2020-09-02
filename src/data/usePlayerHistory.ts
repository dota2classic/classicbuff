import { gql, request } from "graphql-request";
import useSWR from "swr";
import { local } from "../config";
import { Match, Page, Player } from "../shared";
import { MatchmakingMode } from "../utils/format/formatGameMode";
import { FullMatchFragment, MatchNoPlayersFragment, PlayerFragment } from "./fragments";

const API = local ? "http://localhost:5002/graphql" : "https://dota2classic.ru/prod-api/graphql";
const fetcher = (variables?: any) => (query: any) => request(API, query, variables);

const query = gql`
  ${FullMatchFragment}
  ${PlayerFragment}

  query getMatch($sid: String!, $hero: String!, $page: Int!) {
    PlayerHistory(steam_id: $sid, page: $page, hero: $hero) {
      data {
        ...FullMatchFragment
      }
      page
      pages
    }

    Player(steam_id: $sid) {
      ...PlayerFragment
    }
  }
`;
export default (sid: string, hero: string, page: number) => {
  return useSWR<{ PlayerHistory: Page<Match>; Player: Player }>([query, page, sid, hero], fetcher({ sid, hero, page }));
};
