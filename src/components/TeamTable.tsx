import { Table, Tr } from "./LadderRow";
import PlayerRow from "./PlayerRow";
import React from "react";
import { PlayerInMatchDto } from "../api/back/models";

interface Props {
  players: PlayerInMatchDto[];
}
export default ({ players }: Props) => {
  return (
    <Table className="compact">
      <thead>
        <Tr>
          <th style={{ width: 30 }}>Уровень</th>
          <th style={{ width: 60 }}>Герой</th>
          <th style={{ width: 250 }}>Игрок</th>
          <th className={"omit"}>Предметы</th>
          <th style={{ width: 40 }}>K</th>
          <th style={{ width: 40 }}>D</th>
          <th style={{ width: 40 }}>A</th>
          <th style={{ width: 40 }}>LH/D</th>
          <th style={{ width: 40 }}>GPM/XPM</th>
        </Tr>
      </thead>
      <tbody>
        {players.map(it => (
          <PlayerRow key={it.steamId} {...it} />
        ))}
      </tbody>
    </Table>
  );
};
