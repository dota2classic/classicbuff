import { Game } from "./Game";
import AuthService from "../service/AuthServiceService";
import { appApi } from "../api/hooks";
import { QueueService } from "./queue/queue.service";
import { NotificationService } from "./notification/notification.service";
import { Lang } from "./lang";

const auth = AuthService;

const notify = new NotificationService();

const game = new Game(auth, appApi);
const queue = new QueueService(game, auth, notify);
export const stores = {
  auth,
  game,
  queue,
  notify,
  lang: new Lang()
};

export const useStores = () => stores;

if (typeof window !== "undefined") (window as any).stores = stores;
