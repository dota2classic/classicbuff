import { action, observable, observe } from "mobx";
import io from "socket.io-client";
import * as path from "path";
import { GameFound, LauncherServerStarted, Messages, ReadyCheckUpdate, RoomState, UpdateQueue } from "./messages";

import { MatchmakingMode } from "../utils/format/formatGameMode";
import { AuthService } from "../service/AuthService";

const isDev = process.env.DEV === "true";

interface PendingGameInfo {
  mode: MatchmakingMode;
  accepted: number;
  total: number;
  roomID: string;
  iAccepted: boolean;
}

export class Game {
  @observable
  public searchingMode?: MatchmakingMode;

  @observable
  public activeMode: MatchmakingMode = MatchmakingMode.SOLOMID;

  @observable
  public pendingGame: PendingGameInfo | undefined = undefined;

  @observable
  public serverURL?: string;

  @observable inQueue: {
    [key in MatchmakingMode]: number;
  } = {
    [MatchmakingMode.ABILITY_DRAFT]: 0,
    [MatchmakingMode.RANKED]: 0,
    [MatchmakingMode.UNRANKED]: 0,
    [MatchmakingMode.SOLOMID]: 0,
    [MatchmakingMode.DIRETIDE]: 0,
    [MatchmakingMode.GREEVILING]: 0
  };

  private socket!: SocketIOClient.Socket;

  constructor(private readonly authService: AuthService) {}

  private matchState = (url?: string) => {
    this.serverURL = url;
  };
  private matchFinished = ({ roomId }: any) => {
    this.serverURL = undefined;
    this.pendingGame = undefined;
  };

  private queueState = (mode?: MatchmakingMode) => {
    this.searchingMode = mode === null ? undefined : mode;
  };

  private roomNotReady = ({ roomID }: any) => {
    // shit.
    if (roomID === this.pendingGame?.roomID) this.pendingGame = undefined;
  };

  private roomState = (data?: RoomState) => {
    if (!data) {
      this.pendingGame = undefined;
    } else {
      this.searchingMode = undefined;
      this.pendingGame = {
        mode: data.mode,
        accepted: data.accepted,
        total: data.total,
        roomID: data.roomId,
        iAccepted: data.iAccepted
      };
    }
  };

  private joinGame = (data: LauncherServerStarted) => {
    console.log("YEAH! time to join da game!", data.url);

    if (this.pendingGame) {
      this.serverURL = data.url;
    }
  };

  @action
  private gameFound = ({ mode, total, roomID, accepted }: GameFound) => {
    this.pendingGame = {
      mode,
      accepted,
      total,
      roomID,
      iAccepted: false
    };

    new Audio("/static/sound/match.mp3").play();
  };

  private updateReadyCheck = (data: ReadyCheckUpdate) => {
    if (this.pendingGame?.roomID === data.roomID) {
      this.pendingGame.accepted = data.accepted;
      this.pendingGame.total = data.total;
    }
  };

  private updateQueue = (data: UpdateQueue) => {
    this.inQueue[data.mode] = data.inQueue;
  };

  private authorize() {
    this.socket.emit(Messages.BROWSER_AUTH, this.authService.token);
  }

  cancelSearch() {
    this.socket.emit(Messages.LEAVE_ALL_QUEUES);
    this.searchingMode = undefined;
  }

  startSearch(activeMode: MatchmakingMode) {
    this.socket.emit(Messages.ENTER_QUEUE, {
      mode: activeMode
    });
    this.searchingMode = activeMode;
  }

  public acceptPendingGame = () => {
    this.socket.emit(Messages.SET_READY_CHECK, {
      roomID: this.pendingGame?.roomID,
      accept: true
    });
    if (this.pendingGame) this.pendingGame.iAccepted = true;
  };

  public declinePendingGame = () => {
    this.socket.emit(Messages.SET_READY_CHECK, {
      roomID: this.pendingGame?.roomID,
      accept: false
    });
    this.searchingMode = undefined;
    this.pendingGame = undefined;
  };

  connect() {
    if (typeof window === "undefined") return;

    this.socket = isDev
      ? io("ws://localhost:5010", { transports: ["websocket"] })
      : io("wss://dev.dota2classic.ru", {
          path: "/launcher",
          transports: ["websocket"]
        });

    observe(this.authService, "steamID", steamId => {
      if (steamId) {
        this.authorize();
      } else {
        console.log(`No steam id, no auth yet`);
      }
    });
    this.socket.on("connect", () => {
      this.authorize();
    });

    this.socket.on("disconnect", () => {
      this.pendingGame = undefined;
      this.searchingMode = undefined;
    });

    this.socket.on(Messages.QUEUE_UPDATE, this.updateQueue);
    this.socket.on(Messages.GAME_FOUND, this.gameFound);
    this.socket.on(Messages.READY_CHECK_UPDATE, this.updateReadyCheck);
    this.socket.on(Messages.SERVER_STARTED, this.joinGame);
    this.socket.on(Messages.ROOM_STATE, this.roomState);
    this.socket.on(Messages.ROOM_NOT_READY, this.roomNotReady);
    this.socket.on(Messages.QUEUE_STATE, this.queueState);
    this.socket.on(Messages.MATCH_FINISHED, this.matchFinished);
    this.socket.on(Messages.MATCH_STATE, this.matchState);
  }

  disconnect() {
    this.socket.disconnect();
  }
}