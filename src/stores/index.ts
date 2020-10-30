import { Game } from "./Game";
import AuthService from "../service/AuthService";

export const stores = {
  auth: AuthService,
  game: new Game(AuthService)
};

export const useStores = () => stores;
