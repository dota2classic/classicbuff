import { observer } from "mobx-react-lite";
import styled from "styled-components";
import React from "react";
import { useStores } from "../../stores";
import Button, { LinkButton } from "../../components/UI/Button";
import Input from "../../components/UI/Input";
import { CopyToClipboard } from "react-copy-to-clipboard";
import AuthServiceService from "../../service/AuthServiceService";

export const Modal = styled.div`
  z-index: 100;
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  margin: auto;

  width: 300px;
  height: fit-content;
  background: #1d1f22;

  padding: 40px;
  border-radius: 4px;

  box-shadow: 0 0 30px 10px rgba(150, 150, 150, 0.25);
`;

export const ModalWrapper = styled.div`
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.6);
`;

const GameReady = styled.div`
  text-align: center;
  font-size: 24px;
  font-weight: bold;
  color: #dcddde;
`;

const Buttons = styled.div`
  display: flex;
  flex-direction: row;
  margin-top: 40px;

  justify-content: space-between;
`;

const AcceptDot = styled.div`
  width: 14px;
  height: 14px;
  background: #262629;
  transition: 0.3s ease;
  border: 1px solid rgba(0, 0, 0, 0.5);
  border-radius: 50%;

  &.accepted {
    background: #094c09;
  }
`;
const AcceptDots = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  margin-top: 40px;
`;
const IAcceptGameModal = () => {
  const { queue } = useStores();

  if (queue.isSearchingServer)
    return (
      <ModalWrapper>
        <Modal>
          <GameReady>Идет поиск игрового сервера...</GameReady>
        </Modal>
      </ModalWrapper>
    );

  if (queue.gameInfo?.serverURL)
    return (
      <ModalWrapper>
        <Modal>
          <GameReady>Игра готова!</GameReady>
          <Buttons>
            <LinkButton target={"__blank"} href={`steam://connect/${queue.gameInfo?.serverURL}`}>
              Подключиться к игре
            </LinkButton>
          </Buttons>
          <div style={{ marginTop: 5 }} />

          <CopyToClipboard text={`connect ${queue.gameInfo?.serverURL}`}>
            <Input style={{ width: "100%" }} readOnly className="iso" value={`connect ${queue.gameInfo?.serverURL}`} />
          </CopyToClipboard>
        </Modal>
      </ModalWrapper>
    );

  if (!queue.gameInfo) return null;

  if (!queue.gameInfo.iAccepted)
    return (
      <ModalWrapper>
        <Modal>
          <GameReady>Игра найдена!</GameReady>
          <Buttons>
            <Button onClick={queue.acceptGame}>Принять</Button>
            <Button onClick={queue.declineGame}>Отклонить</Button>
          </Buttons>
        </Modal>
      </ModalWrapper>
    );

  return (
    <ModalWrapper>
      <Modal>
        <GameReady>
          Ожидаем игроков <br /> {queue.gameInfo!!.accepted === undefined ? 0 : queue.gameInfo!!.accepted} из{" "}
          {queue.gameInfo.total}...
        </GameReady>
        <AcceptDots>
          {new Array(queue.gameInfo.total).fill(null).map((_, t) => (
            <AcceptDot key={t} className={t < queue.gameInfo!!.accepted ? "accepted" : undefined} />
          ))}
        </AcceptDots>
      </Modal>
    </ModalWrapper>
  );
};
export const AcceptGameModal = observer(IAcceptGameModal);
