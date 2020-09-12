import { gql, request } from "graphql-request";
import useSWR from "swr";
import { local } from "../config";
import { Match, Page, TeamEntity } from "../shared";
import { FullTeamFragment } from "./fragments";
import { GQLClient } from "./client";

const fetcher = (variables?: any) => (query: any) => GQLClient.request(query, variables);

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
