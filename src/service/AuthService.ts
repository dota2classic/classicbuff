import { action, computed, observable } from "mobx";
import { Role, User } from "../shared";
import api from "./api";

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

  public constructor() {
    if (typeof window !== "undefined") {
      const t = localStorage.getItem("token");
      if (t) this.setToken(t);
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
