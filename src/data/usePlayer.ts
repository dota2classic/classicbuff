import { gql, request } from "graphql-request";
import useSWR from "swr";
import { local } from "../config";
import { Player, Match } from "../shared";
import { FullMatchFragment, PlayerFragment } from "./fragments";
import LadderRow from "../components/LadderRow";
import { GQLClient } from "./client";

const fetcher = (variables?: any) => (query: any) => GQLClient.request(query, variables);

const query = gql`
  ${PlayerFragment}
  query getMatch($id: String!) {
    Player(steam_id: $id) {
      ...PlayerFragment
    }
  }
`;

export default (id: string, initialData?: { Player: Player }) => {
  return useSWR<{ Player: Player }>(query, fetcher({ id }), { initialData });
};

export const prefetchPlayer = (id: string) => {
  return fetcher({ id })(query);
};
