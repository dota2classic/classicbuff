import { gql, request } from "graphql-request";
import useSWR from "swr";
import { local } from "../config";
import { Match, TeamEntity } from "../shared";
import { FullTeamFragment } from "./fragments";
import { GQLClient } from "./client";

const fetcher = (variables?: any) => (query: any) => GQLClient.request(query, variables);

const query = gql`
  ${FullTeamFragment}
  query getTeam($id: Int!) {
    Team(id: $id) {
      ...FullTeamFragment
    }
  }
`;
export default (id: number | string) => {
  return useSWR<{ Team: TeamEntity }>([query, id], fetcher({ id }));
};
