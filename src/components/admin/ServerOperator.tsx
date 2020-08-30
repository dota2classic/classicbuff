import { GameServerDTO, ServerOperatorDTO } from "../../utils/dto";
import styled from "styled-components";
import React, { useState } from "react";
import { AdminTable } from "./AdminTable";
import serverOperatorName from "../../utils/serverOperatorName";
import formatGameMode, { MatchmakingMode } from "../../utils/format/formatGameMode";
import api from "../../service/api";

const Operator = styled.div``;

const TableRow = (it: GameServerDTO & { revalidate: () => void }) => {
  const [runMode, setRunMode] = useState<MatchmakingMode | undefined>(undefined);
  return (
    <tr>
      <td>{it.url}</td>
      <td className={it.running ? "good" : undefined}>{it.running ? `Запущен` : `Выключен`}</td>
      <td>
        {it.running ? (
          <button onClick={() => api.post("/admin/kill_server", { url: it.url }).then(it.revalidate)}>
            Остановить
          </button>
        ) : (
          <>
            <select
              onChange={e => {
                const v = Number(e.target.value) as MatchmakingMode;
                setRunMode(Number.isNaN(v) ? undefined : v);
              }}
            >
              <option value={undefined}>Выберите режим</option>
              <option value={MatchmakingMode.RANKED}>{formatGameMode(MatchmakingMode.RANKED)}</option>
              <option value={MatchmakingMode.UNRANKED}>{formatGameMode(MatchmakingMode.UNRANKED)}</option>
              <option value={MatchmakingMode.SOLOMID}>{formatGameMode(MatchmakingMode.SOLOMID)}</option>
              <option value={MatchmakingMode.DIRETIDE}>{formatGameMode(MatchmakingMode.DIRETIDE)}</option>
              <option value={MatchmakingMode.GREEVILING}>{formatGameMode(MatchmakingMode.GREEVILING)}</option>
            </select>
            <button
              onClick={() => api.post("/admin/start_server", { mode: runMode, url: it.url }).then(it.revalidate)}
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
