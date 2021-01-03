import { observer } from "mobx-react";
import styled from "styled-components";
import React from "react";
import { useStores } from "../../stores";

const ModalWrap = styled.div`
  position: fixed;
  right: 100px;
  top: 100px;
  width: 250px;
  height: 100px;
  background: #1d1f22;
  box-shadow: 0 0 10px 3px rgba(150, 150, 150, 0.25);

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Buttons = styled.div`
  display: flex;
  justify-content: space-evenly;
  widows: 100%;
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
  color: white;

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
`;
export const AcceptPartyModal = observer(() => {
  const { game } = useStores();

  if (!game.pendingPartyInvite) return null;

  return (
    <ModalWrap>
      <Title>{game.pendingPartyInvite.leader} приглашает в группу</Title>
      <Buttons>
        <Button onClick={() => game.submitPartyInvite(true)}>Принять</Button>
        <Button onClick={() => game.submitPartyInvite(false)}>Отклонить</Button>
      </Buttons>
    </ModalWrap>
  );
});
