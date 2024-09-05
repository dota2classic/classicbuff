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
import { Dota2Version, MatchmakingMode } from "../utils/format/formatGameMode";
import { GameCoordinatorListener } from "./queue/game-coordinator.listener";
import { QueueState } from "stores/queue/queue.service";
import { WSS_PROD_URL } from "config";

// export const isDev = process.env.DEV === "true";
export const isDev = false;

interface PendingGameInfo {
  mode: MatchmakingMode;
  accepted: number;
  total: number;
  roomID: string;
  iAccepted: boolean;
}

export class Game {
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
  private queueState = (state: { mode?: MatchmakingMode; version?: Dota2Version }) => {
    this.listeners.forEach(t => t.onQueueState(state));
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
    this.listeners.forEach(t => t.onQueueUpdate(data.mode, data.version, data.inQueue));
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

  public startSearch({ mode, version }: QueueState) {
    this.socket.emit(Messages.ENTER_QUEUE, {
      mode,
      version
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

  private badAuth = () => {
    this.authService.logout();
  };

  public connect() {
    if (typeof window === "undefined") return;

    if (this.socket && this.socket.connected) return;

    console.log(isDev, WSS_PROD_URL);
    this.socket = io(WSS_PROD_URL, {
      transports: ["websocket"],
      autoConnect: false
      // auth: {
      //   token: this.authService.token
      // }
    });

    console.log("cnnect call twf??");
    this.socket.on("connect", () => {
      console.log("we connected, wtF???");
      this.authorize();
      console.log("Authorize cause connect");
      this.listeners.forEach(t => t.onConnected());
    });

    this.socket.connect();


    console.log("REgister observe");

    observe(this.authService, "steamID", steamId => {
      console.log("Authorize cause steamID observe", steamId);
      if (steamId) {
        this.authorize();
        console.log("Authorize cause steamID observe", steamId);

      } else {
        // console.log(`No steam id, no auth yet`);
      }
    });

    if (this.authService.steamID) {
      this.authorize();
    }



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
    this.socket.on(Messages.BAD_AUTH, this.badAuth);
  }

  disconnect() {
    this.socket.disconnect();
  }
}
