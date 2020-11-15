import { MatchApi, PlayerApi } from "./back/apis";
import { Configuration, ConfigurationParameters } from "./back";
import { local } from "../config";
import AuthService from "../service/AuthService";

export class AppApi {
  apiParams: ConfigurationParameters = {
    basePath: local ? "http://localhost:6001" : "https://dev.dota2classic.ru/api",
    accessToken: () => AuthService.token!!,
    fetchApi: (input, init) => {
      return window.fetch(input, init).then(t => {
        if (t.status === 401 && AuthService.authorized) {
          AuthService.logout();
          window.location.reload();
        }
        return t;
      });
    }
  };
  private readonly apiConfig = new Configuration(this.apiParams);

  readonly matchApi = new MatchApi(this.apiConfig);
  readonly playerApi = new PlayerApi(this.apiConfig);
}

export const appApi = new AppApi();

export const useApi = () => appApi;
