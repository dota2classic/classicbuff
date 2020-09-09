import { gql, request } from "graphql-request";
import useSWR from "swr";
import { local } from "../config";
import { Match, TeamEntity } from "../shared";
import { FullTeamFragment } from "./fragments";

const API = local ? "http://localhost:5002/graphql" : "https://dota2classic.ru/prod-api/graphql";
const fetcher = (variables?: any) => (query: any) => request(API, query, variables);

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
