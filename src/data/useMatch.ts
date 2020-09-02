import { gql, request } from "graphql-request";
import useSWR from "swr";
import { local } from "../config";
import { Match } from "../shared";
import { FullMatchFragment } from "./fragments";

const API = local ? "http://localhost:5002/graphql" : "https://dota2classic.ru/prod-api/graphql";
const fetcher = (variables?: any) => (query: any) => request(API, query, variables);

const query = gql`
  ${FullMatchFragment}
  query getMatch($id: Int!) {
    Match(id: $id) {
      ...FullMatchFragment
    }
  }
`;
export default (id: number | string) => {
  return useSWR<{ Match: Match }>(query, fetcher({ id }));
};
