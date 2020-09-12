import { GameServerDTO, ServerOperatorDTO } from "../../utils/dto";
import styled from "styled-components";
import React, { useState } from "react";
import { AdminTable } from "./AdminTable";
import serverOperatorName from "../../utils/serverOperatorName";
import formatGameMode, { MatchmakingMode } from "../../utils/format/formatGameMode";
import api from "../../service/api";
import { GQLMatchmakingMode, killServer, restartServer, startServer } from "../../data/admin/serverMutations";
import { mutate } from "swr";

const Operator = styled.div``;

const TableRow = (it: GameServerDTO & { revalidate: () => void }) => {
  const [runMode, setRunMode] = useState<GQLMatchmakingMode | undefined>(undefined);

  return (
    <tr>
      <td>{it.url}</td>
      <td className={it.running ? "good" : undefined}>
        {it.running ? `Запущен ${(it.mode && formatGameMode(it.mode)) || ""}` : `Выключен`}
      </td>
      <td>
        {it.running ? (
          <>
            <button onClick={() => killServer(it.url).then(it.revalidate)}>Остановить</button>
            <button onClick={() => restartServer(it.url, runMode!!).then(it.revalidate)}>Перезапустить</button>
          </>
        ) : (
          <>
            <select
              onChange={e => {
                const v = e.target.value as GQLMatchmakingMode;
                setRunMode(v);
              }}
            >
              <option value={undefined}>Выберите режим</option>
              <option value={GQLMatchmakingMode.RANKED}>{formatGameMode(MatchmakingMode.RANKED)}</option>
              <option value={GQLMatchmakingMode.UNRANKED}>{formatGameMode(MatchmakingMode.UNRANKED)}</option>
              <option value={GQLMatchmakingMode.SOLOMID}>{formatGameMode(MatchmakingMode.SOLOMID)}</option>
              <option value={GQLMatchmakingMode.DIRETIDE}>{formatGameMode(MatchmakingMode.DIRETIDE)}</option>
              <option value={GQLMatchmakingMode.GREEVILING}>{formatGameMode(MatchmakingMode.GREEVILING)}</option>
            </select>
            <button
              onClick={async () => {
                startServer(it.url, runMode!!).then(it.revalidate);
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

export default (p: ServerOperatorDTO & { revalidate: () => void }) => {
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
