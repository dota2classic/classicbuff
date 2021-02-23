import PlayerRow from "./PlayerRow";
import React from "react";
import { PlayerInMatchDto } from "../api/back/models";
import { Table, Tr } from "./UI/Table";
import i18n from "./team-table.i18n";
interface Props {
  players: PlayerInMatchDto[];
  reportable?: boolean;
  matchId: number;
}
export default ({ players, matchId, reportable }: Props) => {
  return (
    <Table className="compact">
      <thead>
        <Tr>
          <th style={{ width: 30 }}>{i18n.level}</th>
          <th style={{ width: 60 }}>{i18n.hero}</th>
          <th style={{ width: 250, maxWidth: 250 }}>{i18n.player}</th>
          <th className={"omit"}>{i18n.items}</th>
          <th style={{ width: 40 }}>K</th>
          <th style={{ width: 40 }}>D</th>
          <th style={{ width: 40 }}>A</th>
          <th style={{ width: 40 }}>LH/D</th>
          <th style={{ width: 40 }}>GPM/XPM</th>
          {reportable && <th style={{ width: 30 }}></th>}
        </Tr>
      </thead>
      <tbody>
        {players.map(it => (
          <PlayerRow matchId={matchId} reportable={reportable || false} key={it.steamId} {...it} />
        ))}
      </tbody>
    </Table>
  );
};
