import { gql, request } from "graphql-request";
import useSWR from "swr";
import { local } from "../config";
import { Match } from "../shared";
import { FullMatchFragment } from "./fragments";
import { GQLClient } from "./client";

const fetcher = (variables?: any) => (query: any) => GQLClient.request(query, variables);

const query = gql`
  ${FullMatchFragment}
  query getMatch($id: Int!) {
    Match(id: $id) {
      ...FullMatchFragment
    }
  }
`;
export default (id: number | string) => {
  return useSWR<{ Match: Match }>([query, id], fetcher({ id }));
};
