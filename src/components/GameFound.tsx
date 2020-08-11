import styled from "styled-components";
import React, { useState } from "react";
import SocketService from "../service/SocketService";
import { observer } from "mobx-react";

const GameFoundBlock = styled.div`
  display: flex;
  position: absolute;
  background: #171717;
  padding: 20px 40px;
  border-radius: 8px;
  flex-direction: column;
  left: 0;
  right: 0;
  align-items: center;
  justify-content: center;
`;
const Button = styled.button`
  padding: 10px 40px;
  background: #232323;
  color: white;
  cursor: pointer;
  border: 1px solid grey;
  border-radius: 4px;
  flex: 1;
  & + & {
    margin-left: 10px;
  }
`;

const MatchmakingStatus = styled.div`
  font-size: 18px;
  color: white;
  margin-bottom: 20px;
`;

const AcceptPoint = styled.div`
  width: 16px;
  height: 16px;
  border: 2px solid #181818;
  border-radius: 50%;
  overflow: hidden;
  position: relative;

  &::before {
    content: "";
    background: #393939;
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
  }
  &.accept {
    &::before {
      background: #0d5c0d;
    }
  }
`;

const AcceptStatus = styled.div`
  display: flex;
  flex-direction: row;
`;

const Accepts = observer(() => {
  const acceptedCount = SocketService.accepted;
  const m = new Array(10).fill(null);
  return (
    <AcceptStatus>
      {m.map((it, index) => (
        <AcceptPoint className={index < acceptedCount ? "accept" : undefined} />
      ))}
    </AcceptStatus>
  );
});

export default () => {
  const [actionTaken, setActionTaken] = useState(false);
  return (
    <GameFoundBlock>
      <MatchmakingStatus>Match found</MatchmakingStatus>
      {actionTaken && <Accepts />}
      {!actionTaken && (
        <div style={{ flex: 1, display: "flex", justifyContent: "center" }}>
          <Button
            onClick={() => {
              setActionTaken(true);
              SocketService.acceptGame();
            }}
          >
            Accept
          </Button>
          <Button
            onClick={() => {
              setActionTaken(true);
              SocketService.declineGame();
            }}
          >
            Decline
          </Button>
        </div>
      )}
    </GameFoundBlock>
  );
};
