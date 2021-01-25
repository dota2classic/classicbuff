import styled from "styled-components";
import { observer } from "mobx-react";
import React from "react";
import { useStores } from "../../../stores";
import { NotificationDto } from "../../../stores/notification/notification.service";
import { colors } from "../../../shared";

const NotificationContainer = styled.div`
  position: fixed;

  left: 50px;
  bottom: 50px;
  display: flex;
`;
const Notification = styled.div`
  color: ${colors.primaryText};
  background: ${colors.evenDarkerBg};
  padding: 15px;
`;

export const NotificationHold = observer(() => {
  const { notify } = useStores();

  if (!notify.currentPendingNotification) return null;

  return (
    <NotificationContainer>
      <Notification>{notify.currentPendingNotification.text}</Notification>
    </NotificationContainer>
  );
});
