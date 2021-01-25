import { Game } from "./Game";
import AuthService from "../service/AuthServiceService";
import { appApi } from "../api/hooks";
import { QueueService } from "./queue/queue.service";
import { NotificationService } from "./notification/notification.service";

const auth = AuthService;
const game = new Game(auth, appApi);
const queue = new QueueService(game, auth);

const notify = new NotificationService();

export const stores = {
  auth,
  game,
  queue,
  notify
};

export const useStores = () => stores;

if (typeof window !== "undefined") (window as any).stores = stores;
