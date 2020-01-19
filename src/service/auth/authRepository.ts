import { LocalStorage } from "../localStorage";

export type Auth = {
  access: string;
  refresh: string;
};

export class AuthRepository {
  getOne = (): Auth | null => {
    const access = LocalStorage.getItem("access");
    const refresh = LocalStorage.getItem("refresh");

    if (access && refresh) return { access, refresh };

    return null;
  };

  save = (auth: Auth) => {
    LocalStorage.setItem("access", auth.access);
    LocalStorage.setItem("refresh", auth.refresh);
  };
}

export default new AuthRepository();
