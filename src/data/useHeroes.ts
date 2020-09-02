import { gql, request } from "graphql-request";
import useSWR from "swr";
import { local } from "../config";
import { Player, Match, HeroSummary } from "../shared";
import { MatchmakingMode } from "../utils/format/formatGameMode";
import { FullMatchFragment, MatchNoPlayersFragment, PlayerFragment } from "./fragments";

const API = local ? "http://localhost:5002/graphql" : "https://dota2classic.ru/prod-api/graphql";
const fetcher = (variables?: any) => (query: any) => request(API, query, variables);

const query = gql`
  query getMatch {
    Heroes {
      assists
      deaths
      games
      hero
      kills
      losses
      wins
    }
  }
`;
export default () => {
  return useSWR<{ Heroes: HeroSummary[] }>(query, fetcher());
};
