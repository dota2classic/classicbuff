import { GraphQLClient } from "graphql-request";
import { local } from "../config";

const API = local ? "http://localhost:5002/graphql" : "https://dota2classic.ru/prod-api/graphql";
export const GQLClient = new GraphQLClient(API, {
  headers: {}
});
