import { QueueHolder } from "./queue.service";
import { MatchmakingMode } from "../../utils/format/formatGameMode";

export const DefaultQueueHolder: QueueHolder = {
  [MatchmakingMode.ABILITY_DRAFT]: 0,
  [MatchmakingMode.RANKED]: 0,
  [MatchmakingMode.UNRANKED]: 0,
  [MatchmakingMode.SOLOMID]: 0,
  [MatchmakingMode.DIRETIDE]: 0,
  [MatchmakingMode.GREEVILING]: 0,
  [MatchmakingMode.BOTS]: 0,
  [MatchmakingMode.HIGHROOM]: 0
};
