import { GameServerDto } from "../../api/back/models";
import React from "react";
import { Tr } from "../LadderRow";
import { appApi } from "../../api/hooks";
import { mutate } from "swr";
import Button from "../Button";

export const GameServer = (it: GameServerDto) => {
  return (
    <Tr>
      <td>{it.url}</td>
      <td>{it.version}</td>
      <td>
        <Button
          className="small"
          onClick={async () => {
            await appApi.adminApi.serverControllerStopServer(it.url);
            await mutate(JSON.stringify(appApi.adminApi.serverControllerLiveSessionsContext()), undefined, true);
          }}
        >
          Остановить
        </Button>
      </td>
    </Tr>
  );
};
