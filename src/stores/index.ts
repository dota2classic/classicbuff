import { Game } from "./Game";
import AuthService from "../service/AuthServiceService";
import { appApi } from "../api/hooks";
import { QueueService } from "./queue/queue.service";
import { NotificationService } from "./notification/notification.service";
import { Lang } from "./lang";
import { useStaticRendering } from "mobx-react-lite";
import { MobXProviderContext } from "mobx-react";
import { useContext } from "react";
useStaticRendering(typeof window === "undefined");

// here we want to circularally hydrate stuff

function hydrateCircular<T>(source: Partial<T>, into: T) {
  if (!into) return;
  if (!source) return;
  Object.entries(source).forEach(([key, value]) => {
    if (!value) {
      // @ts-ignore
      into[key] = undefined;
    } else if (typeof value === "object") {
      // @ts-ignore
      hydrateCircular(value!!, into[key]);
    } else {
      // @ts-ignore
      into[key] = value;
    }
  });
}

function hydrateStores(hydrateState: Partial<RootStore>, stores: RootStore) {
  hydrateCircular(hydrateState, stores);
}

export interface RootStore {
  auth: AuthService;
  game: Game;
  queue: QueueService;
  notify: NotificationService;
  lang: Lang;
}

let stores: any = null;

const createStores = (): RootStore => {
  console.log(`Create store called()`);
  const auth = new AuthService();

  const notify = new NotificationService();

  const game = new Game(auth, appApi);
  const queue = new QueueService(game, auth, notify);
  return {
    auth,
    game,
    queue,
    notify,
    lang: new Lang()
  };
};

export function initializeStore(initialData?: Partial<RootStore>): RootStore {
  const _store = stores ?? createStores();

  if (initialData) {
    hydrateStores(initialData, _store);
  }

  // For server side rendering always create a new stores
  if (typeof window === "undefined") return _store;

  // Create the stores once in the client
  if (!stores) stores = _store;

  return _store;
}
// todo
export const useStores = () => useContext(MobXProviderContext);

if (typeof window !== "undefined") (window as any).stores = initializeStore();
