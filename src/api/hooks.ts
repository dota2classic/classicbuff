import { MatchApi, PlayerApi } from "./back/apis";
import { Configuration, ConfigurationParameters } from "./back";
import { local } from "../config";
import AuthService from "../service/AuthService";

export class AppApi {
  apiParams: ConfigurationParameters = {
    basePath: local ? "http://localhost:6001" : "https://dev.dota2classic.ru/api",
    accessToken: () => AuthService.token!!
  };
  private readonly apiConfig = new Configuration(this.apiParams);

  readonly matchApi = new MatchApi(this.apiConfig);
  readonly playerApi = new PlayerApi(this.apiConfig);
}

export const appApi = new AppApi();

export const useApi = () => appApi;
