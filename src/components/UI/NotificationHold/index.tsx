import styled from "styled-components";
import { observer } from "mobx-react";
import React from "react";
import { useStores } from "../../../stores";
import { colors } from "../../../shared";

const NotificationContainer = styled.div`
  position: fixed;

  display: flex;
  flex-direction: column;
  z-index: 1000;
  left: 50px;
  bottom: 50px;

  & div + div {
    margin-top: 10px;
  }
`;
const Notification = styled.div`
  color: ${colors.primaryText};
  background: ${colors.evenDarkerBg};
  padding: 15px;
`;

export const NotificationHold = observer(() => {
  const { notify } = useStores();

  if (!notify.currentPendingNotification && notify.permanentQueue.length === 0) return null;

  return (
    <NotificationContainer>
      {notify.permanentQueue.map(t => t.text)}
      {notify.currentPendingNotification && <Notification>{notify.currentPendingNotification.text}</Notification>}
    </NotificationContainer>
  );
});
