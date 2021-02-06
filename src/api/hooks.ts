import {
  AdminApi,
  AdminTournamentApi,
  LiveApi,
  MatchApi,
  MetaApi,
  PlayerApi,
  StatsApi,
  TeamApi,
  TournamentApi
} from "./back/apis";
import { Configuration, ConfigurationParameters } from "./back";
import { local } from "../config";
import AuthService from "../service/AuthServiceService";
import { create } from "apisauce";
import Qs from "qs";

export class AppApi {
  apiParams: ConfigurationParameters = {
    basePath: local ? "http://localhost:6001" : "https://dota2classic.ru/api",
    accessToken: () => AuthService.token!!,
    fetchApi: (input, init) => {
      return fetch(input, init).then(t => {
        // if (t.status === 401 && AuthService.authorized && typeof window !== "undefined") {
        //   AuthService.logout();
        //   window.location.reload();
        // }
        return t;
      });
    }
  };
  private readonly apiConfig = new Configuration(this.apiParams);

  readonly matchApi = new MatchApi(this.apiConfig);
  readonly liveApi = new LiveApi(this.apiConfig);
  readonly playerApi = new PlayerApi(this.apiConfig);
  readonly adminApi = new AdminApi(this.apiConfig);
  readonly statsApi = new StatsApi(this.apiConfig);
  readonly metaApi = new MetaApi(this.apiConfig);
  readonly tournament = new TournamentApi(this.apiConfig);
  readonly team = new TeamApi(this.apiConfig);
  readonly adminTournament = new AdminTournamentApi(this.apiConfig);
}

export const appApi = new AppApi();

export const useApi = () => appApi;

export const apiInner = create({
  baseURL: local ? "http://localhost:6001" : "https://dota2classic.ru/api",
  paramsSerializer: params => Qs.stringify(params, { arrayFormat: "repeat" })
});
