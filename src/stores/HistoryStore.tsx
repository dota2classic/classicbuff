import { action, observable, observe, runInAction } from "mobx";
import { Match } from "../shared";
import { MatchmakingMode } from "../utils/format/formatGameMode";
import api from "../service/api";

export default class HistoryStore {
  @observable
  public page: number = 0;

  @observable
  public mode?: MatchmakingMode = MatchmakingMode.RANKED;

  @observable
  public hasMore: boolean = true;

  @observable
  public matches: Match[] = [];

  constructor() {
    observe(this, "mode", () => {
      runInAction(() => {
        console.log("Mode changed, reesetting matches");
        this.matches = [];
        this.page = 0;
        this.fetch();
      });
    });

    observe(this, "page", () => {
      console.log("Page changed, fetch.");
      this.fetch();
    });
  }

  @action
  public async fetch() {
    const res = await api.get<Match[]>("/matches", { page: this.page, mode: this.mode });
    const data: Match[] = res.data as any;
    this.hasMore = data.length === 30;
    this.matches.push(...data);
  }
}
