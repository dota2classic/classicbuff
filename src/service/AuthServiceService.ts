import { action, computed, observable } from "mobx";
import cookies from "browser-cookies";
import { apiInner, appApi } from "../api/hooks";
import { MeDto, MeDtoRolesEnum, RoleSubscriptionEntryDtoRoleEnum } from "../api/back/models";
import { isBrowser } from "../utils/ssr";
import atob from "atob";

export class AuthServiceService {
  @observable
  public token?: string;

  @observable
  public me?: MeDto;

  public static cookieTokenKey: string = "dota2classic_auth_token";

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
  public get roles(): RoleSubscriptionEntryDtoRoleEnum[] | undefined {
    if (!this.token) return undefined;

    return this.parseJwt(this.token)?.roles;
  }

  @computed
  public get hasOldFromMe(): boolean {
    return this.me?.roles.includes(MeDtoRolesEnum.OLD) || this.hasHumanFromMe || false;
  }

  @computed
  public get hasHumanFromMe(): boolean {
    return this.me?.roles.includes(MeDtoRolesEnum.HUMAN) || false;
  }

  @computed
  public get hasOldToken(): boolean {
    return this.roles?.includes(RoleSubscriptionEntryDtoRoleEnum.OLD) || this.hasHumanToken || false;
  }

  @computed
  public get hasHumanToken(): boolean {
    return this.roles?.includes(RoleSubscriptionEntryDtoRoleEnum.HUMAN) || false;
  }

  @computed
  public get hasOld(): boolean {
    return this.hasOldFromMe || this.hasOldToken;
  }

  @computed
  public get hasHuman(): boolean {
    return this.hasHumanFromMe || this.hasHumanToken;
  }

  @computed
  public get isModerator(): boolean {
    return !!this.me?.roles.find(t => t === "MODERATOR") || this.isAdmin;
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
        .map(function(c: any) {
          return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
        })
        .join("")
    );

    return JSON.parse(jsonPayload);
  }

  private static cookieToken(): string | undefined {
    if (typeof window !== "undefined") return cookies.get(AuthServiceService.cookieTokenKey) || undefined;
  }

  public constructor() {
    if (typeof window !== "undefined") {
      const t = localStorage.getItem("token");
      const cookieT = AuthServiceService.cookieToken();

      if (t) this.setToken(t);
      if (cookieT) this.setToken(cookieT);

      setInterval(() => this.fetchMe(), 5000);
    }
  }

  @action.bound
  public async fetchMe() {
    try {
      this.me = await appApi.playerApi.playerControllerMe();
    } catch (e) {
      this.me = undefined;
    }
  }

  @action.bound
  public setToken(token: string) {
    this.token = token;
    appApi.apiParams.accessToken = token;
    apiInner.setHeader(`Authorization`, `Bearer ${token}`);
    if (isBrowser) {
      cookies.set(AuthServiceService.cookieTokenKey, token);
      localStorage.setItem("token", token);
    }
  }

  @action.bound
  public logout() {
    console.log("logout, bad auth!");
    this.token = undefined;
    apiInner.deleteHeader(`Authorization`);
    appApi.apiParams.accessToken = undefined;
    // localStorage.removeItem("token");
    // cookies.erase(AuthServiceService.cookieTokenKey);
  }
}

export default AuthServiceService;
