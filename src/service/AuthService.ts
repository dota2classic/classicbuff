import { action, computed, observable } from "mobx";
import api from "./api";
import { User } from "../generated/sdk";
import { Role } from "../shared";
import cookies from "browser-cookies";

class AuthService {
  @observable
  public token?: string;

  @observable
  public me?: User;

  @computed
  public get authorized(): boolean {
    return !!this.token;
  }

  @computed
  public get isAdmin(): boolean {
    return this.me?.role === Role.ADMIN;
  }

  private static cookieToken(): string | undefined {
    if (typeof window !== "undefined") return cookies.get("RevolverAuthorization") || undefined;
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
    const me = await api.get<User>("/public/me");
    if (me.ok && me.data) {
      this.me = me.data;
    }
  }

  @action.bound
  public setToken(token: string) {
    this.token = token;
    api.setHeader("Authorization", `JWT ${token}`);
    localStorage.setItem("token", token);
  }

  public logout() {
    this.token = undefined;
    api.deleteHeader("Authorization");
    localStorage.removeItem("token");
  }
}

export default new AuthService();
