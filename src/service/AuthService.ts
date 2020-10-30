import { action, computed, observable } from "mobx";
import api from "./api";
import { Role } from "../shared";
import cookies from "browser-cookies";
import { appApi } from "../api/hooks";
import { PlayerSummaryDto } from "../api/back/models";

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
    // return this.me?.role === Role.ADMIN;
    return false;
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

      console.log(t, cookieT);
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
    api.setHeader("Authorization", `JWT ${token}`);
    appApi.apiParams.accessToken = token;
    localStorage.setItem("token", token);
  }

  public logout() {
    this.token = undefined;
    api.deleteHeader("Authorization");
    appApi.apiParams.accessToken = undefined;
    localStorage.removeItem("token");
  }
}

export default new AuthService();
