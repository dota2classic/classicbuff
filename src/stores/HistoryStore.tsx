import { action, observable, observe, runInAction } from "mobx";
import { MatchmakingMode } from "../utils/format/formatGameMode";

export default class HistoryStore {
  @observable
  public page: number = 0;

  @observable
  public mode?: MatchmakingMode = MatchmakingMode.RANKED;
}
