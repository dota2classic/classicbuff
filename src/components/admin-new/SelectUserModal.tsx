import styled from "styled-components";
import React, { useRef, useState } from "react";
import { useApi } from "../../api/hooks";
import useOutsideClick from "../../utils/useOutsideClick";
import Input from "../Input";

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

  color: #d2d2d2;
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
  open: boolean;
  onSelect: (steam_id: string, name: string) => void;
}

export const SelectUserModal = ({ open, close, onSelect }: Props) => {
  const [search, setSearch] = useState("");
  const { data } = useApi().playerApi.usePlayerControllerSearch(search);
  const comp = useRef(null);

  useOutsideClick(close, comp);

  if (open)
    return (
      <ModalWrapper>
        <Modal ref={comp}>
          <Title>Искать</Title>
          <Input placeholder={"Никнейм игрока"} value={search} onChange={e => setSearch(e.target.value)} />

          <PlayerList>
            {data?.map(t => (
              <PlayerPreview
                key={t.id}
                onClick={async () => {
                  onSelect(t.id, t.name);
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
