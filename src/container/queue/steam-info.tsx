import React, { useState } from "react";
import { observer } from "mobx-react-lite";
import styled, { keyframes } from "styled-components";
import { colors } from "../../shared";
import { useStores } from "../../stores";
import formatGameMode from "../../utils/format/formatGameMode";
import { useApi } from "../../api/hooks";
import cx from "classnames";
import { InvitePlayerModal } from "../InvitePlayerModal";
import { GameCoordinatorState } from "../../stores/queue/game-coordinator.state";
import i18n from "./steam-info.i18n";

const InfoRow = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 10px;

  min-height: 65px;
  width: 100%;
  border-bottom: 1px solid #242424;
  border-top: 1px solid #242424;
  height: 65px;
`;

const CancelFindGameButton = styled.div`
  padding: 10px;
  color: ${colors.primaryText};

  border: 1px solid grey;

  margin-right: 100px;
  cursor: pointer;

  transition: 0.3s ease;
  color: ${colors.primaryTextDark};
  background-color: ${colors.evenDarkerBg};

  &:hover {
    color: ${colors.primaryText};
    background-color: ${colors.darkBg};
  }
`;

const InfoTab = styled.div`
  position: relative;
  font-size: 12px;
  padding: 12px;
  text-decoration: none;
  cursor: pointer;

  display: flex;
  flex-direction: column;

  transition: 0.3s ease;

  color: ${colors.primaryText};
`;

export const pendingAnimation = keyframes`
  0% {
    color: ${colors.primaryTextDark2};
  } 

  50% {
      color: white;
  }
  
  100% {
    color: ${colors.primaryTextDark2};
  }
`;
const SearchGameBar = styled.div`
  margin-left: 100px;
  display: flex;
  flex-direction: column;
  border: none;
  animation: ${pendingAnimation} 2s linear infinite;

  & span.info {
    font-size: 10px;
  }
`;

const PartyContents = styled.div`
  display: flex;
  flex-direction: row;

  width: 400px;
`;

const PartyItem = styled.div`
  border: 1px solid #5f5e5e;
  height: 50px;
  width: 50px;

  margin: 5px;

  position: relative;

  &.invite {
    &::before {
      content: "";
      top: 0;
      bottom: 0;
      right: 0;
      left: 0;
      position: absolute;
      background: rgba(0, 0, 0, 0.3);
      transition: 0.3s ease;
      cursor: pointer;
    }
  }

  &.invite:hover {
    &::before {
      background: rgba(0, 0, 0, 0.05);
    }
  }

  &.leader {
    border: 1px solid #c8831c;
  }
  & img {
    width: 50px;
    height: 50px;
  }
`;

const GameCoordinatorConnection = () => {
  const { queue } = useStores();

  return (
    <InfoRow>
      {queue.readyState === GameCoordinatorState.DISCONNECTED ? (
        <SearchGameBar>{i18n.searchingGameCoordinator}</SearchGameBar>
      ) : (
        <SearchGameBar>{i18n.authorization}</SearchGameBar>
      )}
    </InfoRow>
  );
};

export default observer(() => {
  const { queue } = useStores();
  const { data } = useApi().playerApi.usePlayerControllerMyParty();

  const { data: onlineData } = useApi().statsApi.useStatsControllerOnline();

  const { data: party } = useApi().playerApi.usePlayerControllerMyParty();

  const [inviteOpen, setInviteOpen] = useState(false);

  if (!queue.ready) {
    return <GameCoordinatorConnection />;
  }
  return (
    <InfoRow>
      <InvitePlayerModal open={inviteOpen} close={() => setInviteOpen(false)} />

      <PartyContents>
        {queue.party!!.players.map(t => (
          <PartyItem className={cx(t.steamId === data?.leader.steamId && "leader")}>
            <img src={t.avatar} alt="" />
          </PartyItem>
        ))}

        <PartyItem className={cx("invite")} onClick={() => setInviteOpen(true)}>
          <img src={"https://dota2classic.ru/api/static/plus.png"} alt="" />
        </PartyItem>
      </PartyContents>

      {party && party.players.length > 1 && (
        <CancelFindGameButton onClick={() => queue.leaveParty()}>{i18n.leaveGroup}</CancelFindGameButton>
      )}

      {/*<SearchGameButton />*/}

      {queue.searchingMode !== undefined && (
        <SearchGameBar>
          <span>{i18n.withValues.search({ s: formatGameMode(queue.searchingMode) })}</span>
          <span className={"info"}>{i18n.withValues.playersInQueue({ piq: queue.inQueue[queue.searchingMode] })}</span>
        </SearchGameBar>
      )}

      {onlineData && (
        <InfoTab>
          <span>{i18n.withValues.online({ online: onlineData.inGame })}</span>
          <span>{i18n.withValues.freeServers({ free: onlineData.servers - onlineData.sessions })}</span>
          <span>{i18n.withValues.currentGames({ games: onlineData.sessions })}</span>
        </InfoTab>
      )}
    </InfoRow>
  );
});
