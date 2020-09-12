import { gql, request } from "graphql-request";
import useSWR from "swr";
import { QueueDTO } from "../../utils/dto";
import { GQLClient } from "../client";

const fetcher = (variables?: any) => (query: any) => GQLClient.request(query, variables);

const query = gql`
  query getTeam {
    Queues {
      mode
      parties {
        leader {
          name
        }
        players {
          name
        }
      }
    }
  }
`;
export default () => {
  return useSWR<{ Queues: QueueDTO[] }>(query, fetcher());
};
