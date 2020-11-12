import React, { useState } from "react";
import styled from "styled-components";
import { useApi } from "../api/hooks";
import Input from "../components/Input";
import { useStores } from "../stores";

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

const InviteList = styled.div`
  overflow: auto;
  display: flex;
  flex-direction: column;
  height: fit-content;
`;
const PlayerList = styled.div`
  overflow: auto;
  display: flex;
  flex-direction: column;
  flex: 1;
`;

interface Props {
  close(): void;
  open: boolean;
}

export const InvitePlayerModal = ({ open, close }: Props) => {
  const [search, setSearch] = useState("");
  const { data } = useApi().playerApi.usePlayerControllerSearch(search);

  const { game } = useStores();

  if (open)
    return (
      <ModalWrapper>
        <Modal>
          <Title>Искать</Title>
          <Input placeholder={"Никнейм игрока"} value={search} onChange={e => setSearch(e.target.value)} />

          <PlayerList>
            {data?.map(t => (
              <PlayerPreview
                key={t.id}
                onClick={async () => {
                  await game.inviteToParty(t.id);
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

  return null;
};
