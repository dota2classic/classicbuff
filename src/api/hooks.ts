import { AdminApi, LiveApi, MatchApi, PlayerApi, StatsApi } from "./back/apis";
import { Configuration, ConfigurationParameters } from "./back";
import { local } from "../config";
import AuthService from "../service/AuthServiceService";

export class AppApi {
  apiParams: ConfigurationParameters = {
    basePath: local ? "http://localhost:6001" : "https://dota2classic.ru/api",
    accessToken: () => AuthService.token!!,
    fetchApi: (input, init) => {
      return fetch(input, init).then(t => {
        if (t.status === 401 && AuthService.authorized && typeof window !== "undefined") {
          AuthService.logout();
          window.location.reload();
        }
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
}

export const appApi = new AppApi();

export const useApi = () => appApi;
