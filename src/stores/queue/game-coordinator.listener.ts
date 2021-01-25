import { MatchmakingMode } from "../../utils/format/formatGameMode";
import { GameFound, LauncherServerStarted, PartyInviteReceivedMessage, ReadyCheckUpdate, RoomState } from "../messages";

export abstract class GameCoordinatorListener {
  onConnected() {}
  onAuthorized() {}
  onDisconnected() {}

  onQueueUpdate(mode: MatchmakingMode, inQueue: number) {}

  onPartyUpdated() {}
  onGameFound(gf: GameFound) {}
  onMatchFinished() {}
  onMatchState(url?: string) {}
  onQueueState(mode?: MatchmakingMode) {}
  onRoomNotReady() {}
  onRoomState(state?: RoomState) {}

  onPartyInviteReceived(t: PartyInviteReceivedMessage) {}

  onReadyCheckUpdate(data: ReadyCheckUpdate) {}

  onServerReady(data: LauncherServerStarted) {}

  onPartyInviteExpired(id: string) {}
}
