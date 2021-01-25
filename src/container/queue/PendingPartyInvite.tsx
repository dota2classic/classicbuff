import { observer } from "mobx-react";
import styled from "styled-components";
import React from "react";
import { useStores } from "../../stores";
import { colors } from "../../shared";
import { pendingAnimation } from "../../components/UI/SearchGameBar/SearchGameButton";

const ModalWrap = styled.div`
  width: 250px;
  height: 100px;
  background: #1d1f22;
  box-shadow: 0 0 10px 3px rgba(150, 150, 150, 0.25);

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  animation: ${pendingAnimation} 2s linear infinite;
`;

const Buttons = styled.div`
  display: flex;
  justify-content: space-evenly;
  width: 100%;
  flex-direction: row;
`;

const Button = styled.button`
  padding: 4px;
  border: none;
  outline: none;
  background: rgba(0, 0, 0, 0.3);
  font-size: 18px;
  border-radius: 4px;
  transition: 0.3s ease;
  font-family: "Trajan Pro 3", sans-serif;
  color: ${colors.primaryText};

  width: fit-content;
  &:disabled {
    background: rgba(0, 0, 0, 0.3);
    cursor: not-allowed;
  }

  cursor: pointer;
  &:hover:not(:disabled) {
    background: rgba(0, 0, 0, 0.8);
  }
`;

const Title = styled.div`
  font-size: 12px;
  text-align: center;
  color: ${colors.primaryText};
`;
export interface Props {
  leader: string;
  onAccept: () => void;
  onDecline: () => void;
}
export const PendingPartyInvite = observer((p: Props) => {
  return (
    <ModalWrap>
      <Title>{p.leader} приглашает в группу</Title>
      <Buttons>
        <Button onClick={p.onAccept}>Принять</Button>
        <Button onClick={p.onDecline}>Отклонить</Button>
      </Buttons>
    </ModalWrap>
  );
});
