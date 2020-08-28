import { LadderElement } from "../shared";
import { useState } from "react";
import useWillMount from "./useWillMount";
import api from "../service/api";
import { numToSteamId } from "./numSteamId";
import { PlayerInfo } from "../pages/player/[id]";

export default (sid: string) => {
  const [ladder, setLadder] = useState<LadderElement | undefined>(undefined);

  useWillMount(async () => {
    const pinfo = await api.get<PlayerInfo>("/public/player", { steam_id: sid });
    if (pinfo.data) {
      setLadder(pinfo.data.player);
    }
  });

  return ladder;
};
