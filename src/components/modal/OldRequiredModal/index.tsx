import React, { useRef } from "react";
import styled from "styled-components";
import useOutsideClick from "../../../utils/useOutsideClick";
import { ColoredRole } from "../../UI/ColoredRole";
import Button, { LinkButton } from "../../UI/Button";
import Link from "next/link";

const Modal = styled.div`
  z-index: 100;
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  margin: auto;

  width: 30%;
  height: fit-content;
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

const Title = styled.div`
  font-size: 20px;
  color: white;
  margin-top: 20px;
`;

const MainText = styled.div`
  font-size: 16px;
  color: white;
  margin-top: 20px;
`;

const Buttons = styled.div`
  display: flex;
  flex-direction: row;
  margin-top: 60px;
`;
interface Props {
  close(): void;
  open: boolean;
}

export const OldRequiredModal = ({ open, close }: Props) => {
  const comp = useRef(null);
  useOutsideClick(close, comp);

  if (!open) return null;
  return (
    <ModalWrapper>
      <Modal ref={comp}>
        <Title>
          Эта функция доступна только игрокам с ролью <ColoredRole className="old">Древний</ColoredRole> и выше!
        </Title>

        <MainText>Поддержи проект и получи доступ к эксклюзивным возможностям!</MainText>

        <Buttons>
          <Link href="/donate" passHref>
            <LinkButton>Узнать больше</LinkButton>
          </Link>
          <span style={{ marginLeft: 20 }} />
          <Button onClick={close}>Закрыть</Button>
        </Buttons>
      </Modal>
    </ModalWrapper>
  );
};
