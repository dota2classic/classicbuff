import { action, observable } from "mobx";
import api from "service/api/api";

import authRepository, { Auth, AuthRepository } from "./authRepository";
import { ApiResponse } from "apisauce";
import Router from "next/router";

export class AuthService {
  @observable
  authorized = false;

  private authRepository: AuthRepository;

  constructor(authRepository: AuthRepository) {
    this.authRepository = authRepository;

    const auth = this.authRepository.getOne();
    if (auth) this.authorize(auth);

    api.inner.addMonitor(this.unauthorizedMonitor);
  }

  @action
  public login = async (data: { username: string; password: string }) => {
    const response = await api.auth.token(data);

    if (!response.ok) {
      // todo: catch login error

      console.error("Auth Error", response);
      return;
    }

    const auth = response.data as Auth;
    this.authRepository.save(auth);
    this.authorize(auth);

    await Router.push("/offer-request");
  };

  @action
  public logout = () => {
    api.inner.deleteHeader("authorization");
    this.authorized = false;
    Router.push("/login");
  };

  @action
  private authorize = (auth: Auth) => {
    api.inner.setHeader("authorization", `JWT ${auth.access}`);
    this.authorized = true;
  };

  @action
  private unauthorizedMonitor = (response: ApiResponse<any>) => {
    if (response.status == 401) {
      // todo: send refresh token?

      this.logout();
    }
  };
}

export default new AuthService(authRepository);
