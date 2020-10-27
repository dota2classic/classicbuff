import { MatchApi } from "./back/apis";
import { Configuration, ConfigurationParameters } from "./back";
import { local } from "../config";

export class AppApi {
  private readonly apiParams: ConfigurationParameters = {
    basePath: local ? "http://localhost:6001" : "https://dev.dota2classic.ru/api"
  };
  private readonly apiConfig = new Configuration(this.apiParams);

  readonly matchApi = new MatchApi(this.apiConfig);
}

const api = new AppApi();

export const useApi = () => api;
