import { gql, request } from "graphql-request";
import useSWR from "swr";
import { Player, Match, HeroSummary } from "../shared";
import { GQLClient } from "./client";

const fetcher = (variables?: any) => (query: any) => GQLClient.request(query, variables);

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
