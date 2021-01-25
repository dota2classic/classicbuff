import { MatchmakingMode } from "../../utils/format/formatGameMode";

export abstract class GameCoordinatorListener {
  onConnected() {}
  onAuthorized() {}
  onDisconnected() {}

  onQueueUpdate(mode: MatchmakingMode, inQueue: number) {}

  onPartyUpdated() {}
}
