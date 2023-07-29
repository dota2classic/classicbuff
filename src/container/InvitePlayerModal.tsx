import React, { useRef, useState } from "react";
import styled from "styled-components";
import { useApi } from "../api/hooks";
import Input from "../components/UI/Input";
import { useStores } from "../stores";
import useOutsideClick from "../utils/useOutsideClick";
import { NotificationDto } from "../stores/notification/notification.service";
import i18n from "./invite-player-modal.i18n";
import cx from "classnames";

const Modal = styled.div`
  z-index: 100;
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  margin: auto;

  width: 60%;
  height: 60%;
  background: #1d1f22;

  padding: 40px;
  border-radius: 4px;
  display: flex;
  flex-direction: column;
`;

const ModalWrapper = styled.div`
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  z-index: 99;
  background: rgba(0, 0, 0, 0.6);

  &.hidden {
    display: none;
  }
`;

const PlayerPreview = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  transition: 0.3s ease;

  cursor: pointer;
  &:hover {
    background: rgba(0, 0, 0, 0.09);
  }
  & + & {
    margin-top: 10px;
  }

  & span {
    margin-left: 20px;
  }
  & img {
    width: 40px;
    height: 40px;
  }
`;

const Title = styled.div`
  font-size: 20px;
  color: white;
  margin-top: 20px;
`;
const PlayerList = styled.div`
  overflow: auto;
  display: flex;
  flex-direction: column;
  flex: 1;
`;

interface Props {
  close(): void;
  isOpen: boolean;
}

const InvitePlayerModalInner = ({ isOpen, close }: Props) => {
  const [search, setSearch] = useState("");

  const { data } = useApi().playerApi.usePlayerControllerSearch(search);

  const comp = useRef(null);
  const { game, queue, notify } = useStores();
  useOutsideClick(close, comp);

  return (
    <ModalWrapper className={cx(!isOpen && "hidden")}>
      <Modal ref={comp}>
        <Title>{i18n.title}</Title>
        <Input placeholder={"Никнейм игрока"} value={search} onChange={e => setSearch(e.target.value)} />

        <PlayerList>
          {data?.map(t => (
            <PlayerPreview
              key={t.id}
              onClick={async () => {
                queue.inviteToParty(t.id);
                notify.enqueueNotification(new NotificationDto(i18n.withValues.inviteSent({ name: t.name })));
                close();
              }}
            >
              <img src={t.avatar} alt="" />
              <span>{t.name}</span>
            </PlayerPreview>
          ))}
        </PlayerList>
      </Modal>
    </ModalWrapper>
  );
};

export const InvitePlayerModal = ({ isOpen, close }: Props) => {
  return <InvitePlayerModalInner isOpen={isOpen} close={close} />;
};
