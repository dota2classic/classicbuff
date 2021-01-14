import { Game } from "./Game";
import AuthService from "../service/AuthServiceService";
import { appApi } from "../api/hooks";

export const stores = {
  auth: AuthService,
  game: new Game(AuthService, appApi)
};

export const useStores = () => stores;

if (typeof window !== "undefined") (window as any).stores = stores;
