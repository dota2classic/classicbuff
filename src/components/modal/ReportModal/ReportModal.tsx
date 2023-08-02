import React, { PropsWithChildren, useRef, useState } from "react";
import styled from "styled-components";
import Button from "../../UI/Button";
import { PlayerInMatchDto } from "../../../api/back/models";
import { Textarea } from "../../UI/Input";
import { colors } from "../../../shared";
import { useStores } from "../../../stores";
import { useApi } from "../../../api/hooks";
import { NotificationDto } from "../../../stores/notification/notification.service";
import i18n from "./report-modal.i18n";

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
  background: ${colors.darkBg};

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
  margin-bottom: 20px;
`;

const MainText = styled.div`
  font-size: 14px;
  color: white;
  text-align: left;
  margin-top: 20px;
  margin-bottom: 20px;
`;

const Buttons = styled.div`
  display: flex;
  flex-direction: row;
  margin-top: 20px;
`;

interface Props {
  reported: PlayerInMatchDto;
  matchId: number;
  close(): void;
  open: boolean;
}

export const ReportModal = ({ open, close, reported, matchId, children }: PropsWithChildren<Props>) => {
  const comp = useRef(null);
  // useOutsideClick(close, comp);
  const [text, setText] = useState("");
  const { notify, auth } = useStores();
  const api = useApi().playerApi;

  if (!open) return null;
  return (
    <ModalWrapper>
      <Modal ref={comp}>
        <Title>Жалоба на игрока {reported.name}</Title>

        <MainText>
          {i18n.multipleReports}
          <br />
          <br />
          {i18n.onceAnHour}
          <br />
          <br />
          {i18n.withValues.reportsAvailable({ reports: auth.me?.reportsAvailable })}
        </MainText>
        <Textarea
          placeholder="Коротко опишите проблемное поведение"
          value={text}
          onChange={e => setText(e.target.value)}
        />
        <Buttons>
          <Button
            disabled={!auth.me?.reportsAvailable}
            onClick={async () => {
              try {
                const res = await api.playerControllerReportPlayer({
                  reported: reported.steamId,
                  matchId: matchId,
                  text: text
                });
                notify.enqueueNotification(new NotificationDto(i18n.reportSent));
              } catch (e) {
                notify.enqueueNotification(new NotificationDto(i18n.reportError));
              } finally {
                close();
              }
            }}
          >
            Отправить
          </Button>
          <span style={{ marginLeft: 20 }} />
          <Button onClick={close}>Закрыть</Button>
        </Buttons>
      </Modal>
    </ModalWrapper>
  );
};
