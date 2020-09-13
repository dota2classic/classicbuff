import styled from "styled-components";
import React, { useState } from "react";
import { AdminTable } from "./AdminTable";
import serverOperatorName from "../../utils/serverOperatorName";
import formatGameMode, { MatchmakingMode as MM } from "../../utils/format/formatGameMode";
import {
  GameServerOperatorDto,
  GameServersDto,
  MatchmakingMode,
  useKillServerMutation,
  useRestartServerMutation,
  useStartServerMutation
} from "../../generated/sdk";

const Operator = styled.div``;

const TableRow = (it: GameServersDto & { revalidate: () => void }) => {
  const [runMode, setRunMode] = useState<MatchmakingMode | undefined>(undefined);

  const [startServer] = useStartServerMutation();
  const [killServer] = useKillServerMutation();

  const [restartServer] = useRestartServerMutation();

  return (
    <tr>
      <td>{it.url}</td>
      <td className={it.running ? "good" : undefined}>
        {it.running ? `Запущен ${(it.mode && formatGameMode(it.mode)) || ""}` : `Выключен`}
      </td>
      <td>
        {it.running ? (
          <>
            <button onClick={() => killServer({ variables: { url: it.url } }).then(it.revalidate)}>Остановить</button>
            <button
              onClick={() =>
                restartServer({
                  variables: {
                    url: it.url,
                    mode: runMode!!
                  }
                }).then(it.revalidate)
              }
            >
              Перезапустить
            </button>
          </>
        ) : (
          <>
            <select
              onChange={e => {
                const v = e.target.value as MatchmakingMode;
                setRunMode(v);
              }}
            >
              <option value={undefined}>Выберите режим</option>
              <option value={MatchmakingMode.Ranked}>{formatGameMode(MM.RANKED)}</option>
              <option value={MatchmakingMode.Unranked}>{formatGameMode(MM.UNRANKED)}</option>
              <option value={MatchmakingMode.Solomid}>{formatGameMode(MM.SOLOMID)}</option>
              <option value={MatchmakingMode.Diretide}>{formatGameMode(MM.DIRETIDE)}</option>
              <option value={MatchmakingMode.Greeviling}>{formatGameMode(MM.GREEVILING)}</option>
            </select>
            <button
              onClick={async () => {
                startServer({
                  variables: {
                    url: it.url,
                    mode: runMode!!
                  }
                }).then(it.revalidate);
              }}
              disabled={runMode === undefined}
            >
              Запустить
            </button>
          </>
        )}
      </td>
    </tr>
  );
};

export default (p: GameServerOperatorDto & { revalidate: () => void }) => {
  return (
    <Operator>
      <h3 style={{ textTransform: "capitalize" }}>{serverOperatorName(p.url)}</h3>
      <AdminTable>
        <thead>
          <tr>
            <th>Ссылка</th>
            <th>Статус</th>
            <th>Действия</th>
          </tr>
        </thead>
        <tbody>
          {p.gameServers.map(it => (
            <TableRow {...it} revalidate={p.revalidate} />
          ))}
        </tbody>
      </AdminTable>
    </Operator>
  );
};
