import { action, computed, observable, observe } from "mobx";
import { Dota2Version, MatchmakingMode } from "../../utils/format/formatGameMode";
import { Game } from "../Game";
import { GameCoordinatorListener } from "./game-coordinator.listener";
import { GameCoordinatorState } from "./game-coordinator.state";
import { DefaultQueueHolder } from "./mock";
import { AuthServiceService } from "../../service/AuthServiceService";
import { appApi } from "../../api/hooks";
import { PartyDto } from "../../api/back/models";
import { GameFound, LauncherServerStarted, PartyInviteReceivedMessage, ReadyCheckUpdate, RoomState } from "../messages";
import { Sound } from "../sound";
import { blinkTab } from "../../utils/blinkTab";
import { NotificationDto, NotificationService } from "../notification/notification.service";
import { PendingPartyInvite } from "../../container/queue/PendingPartyInvite";
import React from "react";

export type QueueHolder = {
  [key: string]: number;
};

export interface GameInfo {
  mode: MatchmakingMode;
  accepted: number;
  total: number;
  roomID: string;
  iAccepted: boolean;
  serverURL?: string;
}

export class QueueState {
  constructor(public readonly mode: MatchmakingMode, public readonly version: Dota2Version) {}
}

export class QueueService extends GameCoordinatorListener {
  private matchSound!: HTMLAudioElement;
  private roomReadySound!: HTMLAudioElement;

  constructor(
    private readonly game: Game,
    private readonly auth: AuthServiceService,
    private readonly notify: NotificationService
  ) {
    super();

    game.registerListener(this);
    this.fetchParty().finally();
    if (typeof window !== "undefined") {
      this.matchSound = new Audio(Sound.MATCH_GAME);
      this.roomReadySound = new Audio(Sound.NOTIFY_GAME);
      observe(this, "selectedMode", e => {
        if (typeof window !== "undefined") {
          localStorage.setItem("d2c_mode", JSON.stringify(e.newValue));
        }
      });
      const mode = localStorage.getItem("d2c_mode");
      if (mode !== null) {
        try {
          const parsed = JSON.parse(mode);
          if (typeof parsed == "object") {
            this.selectedMode = parsed;
          } else throw "";
        } catch (e) {
          this.selectedMode = new QueueState(MatchmakingMode.BOTS, Dota2Version.Dota_681);
        }
      }
      // setTimeout(() => {
      //   this.gameInfo = {
      //     total: 10,
      //     accepted: 5,
      //     mode: MatchmakingMode.BOTS,
      //     iAccepted: false,
      //     roomID: "fd",
      //     serverURL: undefined
      //
      //   }
      // }, 1000)
    }
  }

  @observable
  public searchingMode?: QueueState;

  @observable
  public selectedMode: QueueState = new QueueState(MatchmakingMode.BOTS, Dota2Version.Dota_681);

  @observable
  public readyState: GameCoordinatorState = GameCoordinatorState.DISCONNECTED;

  @observable
  public inQueue: QueueHolder = DefaultQueueHolder;

  @observable
  public gameInfo?: GameInfo;

  @observable
  public party?: PartyDto;

  @computed
  public get needAuth(): boolean {
    return !this.auth.authorized;
  }

  @computed
  public get ready(): boolean {
    return (
      this.readyState === GameCoordinatorState.AUTHORIZED && this.party !== undefined && this.auth.me !== undefined
    );
  }

  @computed
  public get isSearchingServer(): boolean {
    if (!this.gameInfo) return false;
    return this.gameInfo.accepted === this.gameInfo.total && !this.gameInfo.serverURL;
  }

  @computed
  public get canPartyRanked(): boolean {
    return this.auth.hasOld;
  }

  @computed
  public get selectedModeBanned(): boolean {
    if (this.selectedMode.mode === MatchmakingMode.BOTS) return false;
    return !!this.auth.me?.banStatus.isBanned;
  }

  @action
  public cancelSearch = () => {
    this.game.cancelSearch();
    this.searchingMode = undefined;
  };

  @action
  public leaveParty() {
    this.game.leaveParty();
    this.fetchParty().finally();
  }

  @action
  public enterQueue(): boolean {
    try {
      if (this.canQueue()) {
        this.startSearch(this.selectedMode);
        return true;
      } else {
        return false;
      }
    } catch (e) {
      return true;
    }
  }

  @action
  public inviteToParty(id: string) {
    this.game.inviteToParty(id);
  }

  @action
  public acceptGame = () => {
    this.game.acceptPendingGame(this.gameInfo!!.roomID);
    if (this.gameInfo) this.gameInfo.iAccepted = true;
  };

  @action
  public declineGame = () => {
    this.game.declinePendingGame(this.gameInfo!!.roomID);
    this.gameInfo = undefined;
    this.cancelSearch();
  };

  /**
   * Listener methods
   */

  @action
  public onDisconnected() {
    this.readyState = GameCoordinatorState.DISCONNECTED;
    this.cleanUp();
  }

  @action
  public onConnected() {
    this.readyState = GameCoordinatorState.CONNECTED;
  }

  @action
  public onAuthorized() {
    this.readyState = GameCoordinatorState.AUTHORIZED;
  }

  @action
  public onQueueUpdate(mode: MatchmakingMode, version: Dota2Version, inQueue: number) {
    this.inQueue[JSON.stringify(new QueueState(mode, version))] = inQueue;
  }

  @action
  public onPartyUpdated() {
    this.fetchParty().finally();
  }

  @action
  public onGameFound(gf: GameFound) {
    this.gameInfo = {
      mode: gf.mode,
      accepted: gf.accepted,
      total: gf.total,
      roomID: gf.roomID,
      iAccepted: false
    };
    this.playGameFoundSound();
    blinkTab("Поиск игры - dota2classic.ru", "Игра найдена!");
  }

  @action
  public onMatchFinished() {
    this.gameInfo = undefined;
  }

  @action
  public onMatchState(url?: string) {
    if (!url && this.gameInfo) {
      this.gameInfo.serverURL = undefined;
      return;
    } else if (!url && !this.gameInfo) return;

    if (!this.gameInfo) {
      this.gameInfo = {
        mode: MatchmakingMode.BOTS,
        accepted: 0,
        total: 0,
        roomID: "",
        iAccepted: true
      };
    }
    this.gameInfo.serverURL = url;
  }

  @action
  public onQueueState({ mode, version }: { mode?: MatchmakingMode; version?: Dota2Version }) {
    if (mode != null && version != null) {
      const qs = new QueueState(mode, version);
      this.searchingMode = qs;
      this.selectedMode = qs;
    } else {
      this.searchingMode = undefined;
    }
  }

  @action
  public onRoomNotReady() {
    this.gameInfo = undefined;
  }

  @action
  public onRoomState(state?: RoomState) {
    if (!state) {
      this.gameInfo = undefined;
    } else {
      this.searchingMode = undefined;

      if (!this.gameInfo)
        this.gameInfo = {
          mode: state.mode,
          accepted: state.accepted,
          total: state.total,
          roomID: state.roomId,
          iAccepted: state.iAccepted
        };
      else
        this.gameInfo = {
          ...this.gameInfo,
          mode: state.mode,
          accepted: state.accepted,
          total: state.total,
          roomID: state.roomId,
          iAccepted: state.iAccepted
        };
    }
  }

  @action
  public onPartyInviteReceived(t: PartyInviteReceivedMessage) {
    const dto = new NotificationDto(
      (
        <PendingPartyInvite
          leader={t.leader}
          onAccept={() => this.acceptParty(t.inviteId)}
          onDecline={() => this.declineParty(t.inviteId)}
        />
      ),
      t.inviteId
    );
    this.notify.enqueueNotification(dto);
  }

  @action
  public onPartyInviteExpired(id: string) {
    this.notify.dequeue(id);
  }

  @action
  public onReadyCheckUpdate(data: ReadyCheckUpdate) {
    if (this.gameInfo) {
      this.gameInfo.accepted = data.accepted;
      this.gameInfo.total = data.total;
      this.gameInfo.mode = data.mode;
    }
  }

  @action
  public onServerReady(data: LauncherServerStarted) {
    if (!this.gameInfo) {
      this.gameInfo = {
        mode: data.info.mode as any,
        accepted: 0,
        total: 0,
        roomID: data.info.roomId,
        iAccepted: true
      };
    }
    this.gameInfo.serverURL = data.url;
    this.roomReadySound.play().finally();
  }

  /**
   * Private utility
   */

  private async fetchParty() {
    this.party = await appApi.playerApi.playerControllerMyParty();
  }

  private cleanUp() {
    this.searchingMode = undefined;
    this.inQueue = DefaultQueueHolder;
  }

  private canQueue() {
    if (!this.ready) throw new Error("Not ready");
    if (this.selectedMode.mode === MatchmakingMode.CAPTAINS_MODE && this.party!!.players.length !== 5) {
      return false;
    }

    // if (this.selectedMode.mode === MatchmakingMode.RANKED && this.party!!.players.length > 1) {
    //   // dont allow parties in ranked
    //   return false;
    // }

    return true;
  }

  @action
  private startSearch = (mode: QueueState) => {
    this.game.startSearch(mode);
    this.searchingMode = mode;
  };

  private playGameFoundSound() {
    this.matchSound.play().finally();
  }

  private acceptParty(id: string) {
    this.game.submitPartyInvite(id, true);
    this.notify.dequeue(id);
  }

  private declineParty(id: string) {
    this.game.submitPartyInvite(id, false);
    this.notify.dequeue(id);
  }
}
