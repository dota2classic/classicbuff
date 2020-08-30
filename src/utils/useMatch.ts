import { LadderElement, Match } from "../shared";
import { useState } from "react";
import useWillMount from "./useWillMount";
import api from "../service/api";
import { numToSteamId } from "./numSteamId";
import { PlayerInfo } from "../pages/player/[id]";

export default (mid: string | number) => {
  const [ladder, setLadder] = useState<Match | undefined>(undefined);

  useWillMount(async () => {
    const pinfo = await api.get<Match>("/public/match", { id: mid });
    if (pinfo.data) {
      setLadder(pinfo.data);
    }
  });

  return ladder;
};
