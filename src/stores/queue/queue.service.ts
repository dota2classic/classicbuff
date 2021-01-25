import { action, computed, observable, observe } from "mobx";
import { MatchmakingMode } from "../../utils/format/formatGameMode";
import { Game } from "../Game";
import { GameCoordinatorListener } from "./game-coordinator.listener";
import { GameCoordinatorState } from "./game-coordinator.state";
import { DefaultQueueHolder } from "./mock";
import { AuthServiceService } from "../../service/AuthServiceService";
import { appApi } from "../../api/hooks";
import { PartyDto } from "../../api/back/models";

export type QueueHolder = {
  [key in MatchmakingMode]: number;
};

export class QueueService extends GameCoordinatorListener {
  constructor(private readonly game: Game, private readonly auth: AuthServiceService) {
    super();
    game.registerListener(this);
    this.fetchParty().finally();
    if (typeof window !== "undefined") {
      observe(this, "selectedMode", e => {
        if (typeof window !== "undefined") {
          localStorage.setItem("d2c_mode", e.newValue.toString());
        }
      });
      const mode = localStorage.getItem("d2c_mode");
      if (mode !== null) {
        this.selectedMode = Number(mode);
      }
    }
  }

  @observable
  public searchingMode?: MatchmakingMode;

  @observable
  public selectedMode: MatchmakingMode = MatchmakingMode.BOTS;

  @observable
  public readyState: GameCoordinatorState = GameCoordinatorState.DISCONNECTED;

  @observable
  public inQueue: QueueHolder = DefaultQueueHolder;

  @observable
  public party?: PartyDto;

  @computed
  public get ready(): boolean {
    return (
      this.readyState === GameCoordinatorState.AUTHORIZED && this.party !== undefined && this.auth.me !== undefined
    );
  }

  @computed
  public get canPartyRanked(): boolean {
    return this.auth.hasOld;
  }

  @computed
  public get selectedModeBanned(): boolean {
    if (this.selectedMode === MatchmakingMode.BOTS) return false;
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
        console.log("yeas");
        this.startSearch(this.selectedMode);
        return true;
      } else {
        return false;
      }
    } catch (e) {
      console.error(e);
      return true;
    }
  }

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
  public onQueueUpdate(mode: MatchmakingMode, inQueue: number) {
    this.inQueue[mode] = inQueue;
  }

  @action
  public onPartyUpdated() {
    this.fetchParty().finally();
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

    if (this.selectedMode === MatchmakingMode.RANKED) {
      return this.canPartyRanked;
    }

    return true;
  }

  @action
  private startSearch = (mode: MatchmakingMode) => {
    this.game.startSearch(mode);
    this.searchingMode = mode;
  };
}
