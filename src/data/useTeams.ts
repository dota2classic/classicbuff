import { gql, request } from "graphql-request";
import useSWR from "swr";
import { local } from "../config";
import { Match, Page, TeamEntity } from "../shared";
import { FullTeamFragment } from "./fragments";

const API = local ? "http://localhost:5002/graphql" : "https://dota2classic.ru/prod-api/graphql";
const fetcher = (variables?: any) => (query: any) => request(API, query, variables);

const query = gql`
  ${FullTeamFragment}
  query getTeam($page: Int!) {
    Teams(page: $page) {
      data {
        ...FullTeamFragment
      }
      page
      pages
    }
  }
`;
export default (page: number | string) => {
  return useSWR<{ Teams: Page<TeamEntity> }>([query, page], fetcher({ page }));
};
