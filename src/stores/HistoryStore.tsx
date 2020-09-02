import { action, observable, observe, runInAction } from "mobx";
import { Match } from "../shared";
import { MatchmakingMode } from "../utils/format/formatGameMode";
import api from "../service/api";

export default class HistoryStore {
  @observable
  public page: number = 0;

  @observable
  public mode?: MatchmakingMode = MatchmakingMode.RANKED;
}
