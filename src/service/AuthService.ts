import { action, computed, observable, toJS } from "mobx";
import cookies from "browser-cookies";
import { appApi } from "../api/hooks";
import { PlayerSummaryDto } from "../api/back/models";
import { Role } from "../components/LadderRow";

export class AuthService {
  @observable
  public token?: string;

  @observable
  public me?: PlayerSummaryDto;

  @computed
  public get authorized(): boolean {
    return !!this.token;
  }

  @computed
  public get name(): string | undefined {
    if (!this.me) return undefined;

    return this.me.name;
  }

  @computed
  public get steamID(): string | undefined {
    if (!this.token) return undefined;

    return this.parseJwt(this.token)?.sub;
  }

  @computed
  public get isAdmin(): boolean {
    return !!this.me?.roles.find(t => t === "ADMIN");
  }

  private parseJwt(token: string) {
    const base64Url = token.split(".")[1];
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split("")
        .map(function(c) {
          return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
        })
        .join("")
    );

    return JSON.parse(jsonPayload);
  }

  private static cookieToken(): string | undefined {
    if (typeof window !== "undefined") return cookies.get("dota2classic_auth_token") || undefined;
  }

  public constructor() {
    if (typeof window !== "undefined") {
      const t = localStorage.getItem("token");
      const cookieT = AuthService.cookieToken();

      if (t) this.setToken(t);
      if (cookieT) this.setToken(cookieT);
    }
  }

  @action.bound
  public async fetchMe() {
    this.me = await appApi.playerApi.playerControllerMe();
  }

  @action.bound
  public setToken(token: string) {
    this.token = token;
    appApi.apiParams.accessToken = token;
    localStorage.setItem("token", token);
  }

  @action.bound
  public logout() {
    this.token = undefined;
    appApi.apiParams.accessToken = undefined;
    localStorage.removeItem("token");
    cookies.erase("dota2classic_auth_token");
  }
}

export default new AuthService();
