import { gql, request } from "graphql-request";
import useSWR from "swr";
import { local } from "../config";
import { Player, Match, PlayerInMatch, PlayerStats, Page } from "../shared";
import { FullMatchFragment, MatchNoPlayersFragment, PlayerFragment } from "./fragments";

const API = local ? "http://localhost:5002/graphql" : "https://dota2classic.ru/prod-api/graphql";
const fetcher = (variables?: any) => (query: any) => request(API, query, variables);

const query = gql`
  ${PlayerFragment}
  ${FullMatchFragment}
  query getMatch($steam_id: String!, $page: Int!) {
    Player(steam_id: $steam_id) {
      ...PlayerFragment
    }
    PlayerHistory(steam_id: $steam_id, page: $page) {
      data {
        ...FullMatchFragment
      }
      page
      pages
    }
    PlayerStats(steam_id: $steam_id) {
      heroes {
        denies
        games
        gpm
        kda
        hero
        last_hits
        loss
        playerSteamId
        wins
        xpm
      }
      overall {
        wins
        loss
        games
      }
    }
  }
`;
export default (steam_id: number | string, page: number) => {
  return useSWR<{ PlayerHistory: Page<Match>; Player: Player; PlayerStats: PlayerStats }>(
    [query, steam_id, page],
    fetcher({ steam_id, page })
  );
};
