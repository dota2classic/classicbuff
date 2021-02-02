import { action, observable, observe } from "mobx";
import io from "socket.io-client";
import {
  GameFound,
  LauncherServerStarted,
  Messages,
  PartyInviteReceivedMessage,
  ReadyCheckUpdate,
  RoomState,
  UpdateQueue
} from "./messages";
import { AuthServiceService } from "../service/AuthServiceService";
import { AppApi } from "../api/hooks";
import { MatchmakingMode } from "../utils/format/formatGameMode";
import { GameCoordinatorListener } from "./queue/game-coordinator.listener";

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
  public activeMode: MatchmakingMode = MatchmakingMode.BOTS;

  @observable
  public pendingPartyInvite?: PartyInviteReceivedMessage = undefined;

  private listeners: GameCoordinatorListener[] = [];

  // public pendingPartyInvite?: PartyInviteReceivedMessage = {
  //   partyId: "c3a2a638-6f66-42b0-997e-fe7e29fee0a3",
  //   leader: "$$ КОТ БАЗИЛИО $$",
  //   inviteId: "1e570d96-f47e-4de3-9c14-edad81701637"
  // };

  public registerListener(listener: GameCoordinatorListener) {
    this.listeners.push(listener);
  }

  @observable
  public connected: boolean = false;

  @observable
  public authorized: boolean = false;

  private socket!: SocketIOClient.Socket;

  constructor(private readonly authService: AuthServiceService, private readonly api: AppApi) {}

  private matchState = (url?: string) => {
    this.listeners.forEach(t => t.onMatchState(url));
  };

  private matchFinished = () => {
    this.listeners.forEach(t => t.onMatchFinished());
  };

  private onAuthResponse = ({ success }: any) => {
    if (success) {
      this.listeners.forEach(t => t.onAuthorized());
    }
  };

  @action
  private queueState = (mode?: MatchmakingMode) => {
    this.listeners.forEach(t => t.onQueueState(mode));
  };

  private roomNotReady = () => {
    this.listeners.forEach(t => t.onRoomNotReady());
  };

  private roomState = (data?: RoomState) => {
    this.listeners.forEach(t => t.onRoomState(data));
  };

  private onServerReady = (data: LauncherServerStarted) => {
    this.listeners.forEach(t => t.onServerReady(data));
  };

  private matchResults = (data: { url: string }) => {
    this.listeners.forEach(t => t.onMatchFinished());
  };

  @action
  private gameFound = (gf: GameFound) => {
    this.listeners.forEach(t => t.onGameFound(gf));
  };

  private updateReadyCheck = (data: ReadyCheckUpdate) => {
    this.listeners.forEach(t => t.onReadyCheckUpdate(data));
  };

  private onQueueUpdate = (data: UpdateQueue) => {
    this.listeners.forEach(t => t.onQueueUpdate(data.mode, data.inQueue));
  };

  private authorize() {
    this.socket.emit(Messages.BROWSER_AUTH, {
      token: this.authService.token,
      recaptchaToken: ""
    });
  }

  public cancelSearch() {
    this.socket.emit(Messages.LEAVE_ALL_QUEUES);
  }

  public startSearch(mode: MatchmakingMode) {
    this.socket.emit(Messages.ENTER_QUEUE, {
      mode
    });
  }

  public acceptPendingGame = (roomId: string) => {
    this.socket.emit(Messages.SET_READY_CHECK, {
      roomID: roomId,
      accept: true
    });
  };

  public declinePendingGame = (roomId: string) => {
    this.socket.emit(Messages.SET_READY_CHECK, {
      roomID: roomId,
      accept: false
    });
  };

  public inviteToParty = (id: string) => {
    this.socket.emit(Messages.INVITE_TO_PARTY, {
      id
    });
  };

  private partyInviteReceived = (z: PartyInviteReceivedMessage) => {
    this.listeners.forEach(t => t.onPartyInviteReceived(z));
  };

  private partyInviteExpired = async (id: string) => {
    this.listeners.forEach(t => t.onPartyInviteExpired(id));
  };

  public submitPartyInvite = (id: string, accept: boolean) => {
    this.socket.emit(Messages.ACCEPT_PARTY_INVITE, {
      accept,
      id
    });
  };

  public leaveParty = () => {
    this.socket.emit(Messages.LEAVE_PARTY);
  };

  private partyUpdated = () => {
    this.listeners.forEach(t => t.onPartyUpdated());
  };

  public connect() {
    if (typeof window === "undefined") return;

    if (this.socket && this.socket.connected) return;

    this.socket = isDev
      ? io("ws://localhost:5010", { transports: ["websocket"] })
      : io("wss://dota2classic.ru", {
          path: "/launcher",
          transports: ["websocket"]
        });

    observe(this.authService, "steamID", async steamId => {
      if (steamId) {
        await this.authorize();
      } else {
        // console.log(`No steam id, no auth yet`);
      }
    });

    this.socket.on("connect", () => {
      this.authorize();
      this.listeners.forEach(t => t.onConnected());
    });

    this.socket.on("disconnect", () => {
      this.listeners.forEach(t => t.onDisconnected());
      this.connected = false;
      this.authorized = false;
    });

    this.socket.on(Messages.QUEUE_UPDATE, this.onQueueUpdate);
    this.socket.on(Messages.AUTH, this.onAuthResponse);
    this.socket.on(Messages.GAME_FOUND, this.gameFound);
    this.socket.on(Messages.READY_CHECK_UPDATE, this.updateReadyCheck);
    this.socket.on(Messages.SERVER_STARTED, this.onServerReady);
    this.socket.on(Messages.ROOM_STATE, this.roomState);
    this.socket.on(Messages.ROOM_NOT_READY, this.roomNotReady);
    this.socket.on(Messages.QUEUE_STATE, this.queueState);
    this.socket.on(Messages.MATCH_FINISHED, this.matchFinished);
    this.socket.on(Messages.MATCH_STATE, this.matchState);
    this.socket.on(Messages.MATCH_RESULTS_READY, this.matchResults);
    this.socket.on(Messages.PARTY_INVITE_RECEIVED, this.partyInviteReceived);
    this.socket.on(Messages.PARTY_INVITE_EXPIRED, this.partyInviteExpired);
    this.socket.on(Messages.PARTY_UPDATED, this.partyUpdated);
  }

  disconnect() {
    this.socket.disconnect();
  }
}
