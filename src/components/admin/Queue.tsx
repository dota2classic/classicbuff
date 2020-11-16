import styled from "styled-components";
import React from "react";
import formatGameMode, { MatchmakingMode } from "../../utils/format/formatGameMode";
// import api from "../../service/api";
import { PartyDto, QueueDto, QueuePlayerDto } from "../../generated/sdk";

const QueueBlock = styled.div`
  display: flex;
  flex-direction: column;
  padding: 10px;
  border: 1px solid grey;
  border-radius: 5px;
  flex: 1;

  & + & {
    margin-top: 40px;
  }
`;

const GameMode = styled.div`
  font-size: 18px;
  font-weight: bold;
  color: black;
  border-bottom: 1px solid rgba(0, 0, 0, 0.39);
  margin-bottom: 10px;

  & span {
    font-size: 14px;
    font-weight: 400;
  }
`;

const SinglePlayer = styled.div`
  display: flex;
  flex-direction: row;
  color: black;

  &.leader {
    font-size: 18px;
  }
`;

const Party = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 4px;
  border-left: 1px solid #cbcb00;
  padding-left: 4px;
  border-radius: 2px;
`;

export const QParty = (p: PartyDto & { invalidate: () => void; mode: MatchmakingMode }) => {
  const isLeader = (qp: QueuePlayerDto) => p.leader.id === qp.id;
  return (
    <Party>
      <button
        onClick={async () => {
          // await api.post("/admin/queue_remove_party", { mode: p.mode, partyId: p.id });
          p.invalidate();
        }}
      >
        remove
      </button>
      {p.players.map(t => (
        <SinglePlayer className={isLeader(t) ? "leader" : undefined}>{t.name}</SinglePlayer>
      ))}
    </Party>
  );
};

interface Props {
  invalidate: () => void;
}

export default (q: QueueDto & Props) => {
  return (
    <QueueBlock>
      <GameMode>
        {formatGameMode(q.mode)}, <span>{q.parties.reduce((a, b) => a + b.players.length, 0)} в очереди</span>
      </GameMode>
      {q.parties.map(f => (
        <QParty {...f} mode={q.mode} invalidate={q.invalidate} />
      ))}
    </QueueBlock>
  );
};
