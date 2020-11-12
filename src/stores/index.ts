import { Game } from "./Game";
import AuthService from "../service/AuthService";

export const stores = {
  auth: AuthService,
  game: new Game(AuthService)
};

export const useStores = () => stores;

if (typeof window !== "undefined") (window as any).stores = stores;
