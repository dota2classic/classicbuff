import { observer } from "mobx-react";
import styled from "styled-components";
import React from "react";
// @ts-ignore
import cx from "classnames";
import { pendingAnimation } from "../steam-info";
import formatGameMode, { MatchmakingMode } from "../../../utils/format/formatGameMode";
import { useStores } from "../../../stores";

const Options = styled.div`
  display: flex;
  flex-direction: column;
  border-right: 1px solid #242424;
  width: 300px;
`;
const MOption = styled.div`
  display: flex;
  flex-direction: column;
  padding: 10px 20px;
  cursor: pointer;
  transition: 0.3s ease;

  &:hover {
    background: rgba(1, 1, 1, 0.1);
  }

  & span.info {
    font-size: 12px;
  }
  & + & {
    border-top: 1px solid #4e4d4d;
  }

  &.header {
    cursor: unset;
    font-weight: bold;
    font-size: 18px;
    &:hover {
      background: unset;
    }
  }

  &.current {
    background: rgba(248, 228, 0, 0.03);
  }
  &.active {
    animation: ${pendingAnimation} 2s linear infinite;
  }
  &.disabled {
    cursor: not-allowed;
    &:hover {
      background: unset;
    }
    color: #4a4a4a;
  }
`;
interface MProps {
  mode: MatchmakingMode;
  selected: boolean;
  unrankedGamesLeft?: number;
  onSelect: (mode: MatchmakingMode) => void;
}

const SteamLogo = styled.img`
  width: 20px;
  height: 20px;
`;

const SettingsIcon = styled.img`
  width: 20px;
  height: 20px;
  margin-right: 10px;
  cursor: pointer;
  opacity: 0.5;

  transition: 0.3s ease;
  &:hover {
    opacity: 1;
  }
`;
const UserInfo = styled.div`
  display: flex;
  flex-direction: row;
  margin-bottom: 5px;
  padding: 20px;
  border-bottom: 1px solid #242424;
  border-top: 1px solid #242424;
  height: 65px;
  max-height: 25px;
  align-items: center;
`;

const Username = styled.div`
  font-size: 14px;
  margin-right: 20px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const MatchmakingOption = observer((props: MProps) => {
  const { queue } = useStores();

  const lockedCuzNewbie =
    props.unrankedGamesLeft !== undefined && props.unrankedGamesLeft > 0 && props.mode !== MatchmakingMode.BOTS;

  return (
    <MOption
      className={cx(
        queue.searchingMode === props.mode && "active",
        props.selected && "current",
        queue.searchingMode !== undefined && queue.searchingMode !== props.mode && "disabled",
        lockedCuzNewbie && "disabled"
      )}
      onClick={() => {
        if (lockedCuzNewbie) return;
        if (!(queue.searchingMode !== undefined && queue.searchingMode !== props.mode)) {
          props.onSelect(props.mode);
        }
      }}
    >
      <span>{formatGameMode(props.mode)}</span>
      {props.unrankedGamesLeft && props.unrankedGamesLeft > 0 ? (
        <span className={"info"}>{props.unrankedGamesLeft} игр до разблокировки режима</span>
      ) : (
        <span className={"info"}>{queue.inQueue[props.mode]} в поиске</span>
      )}
    </MOption>
  );
});

export const GameModes = observer(() => {
  const { auth, queue } = useStores();

  const setSelectedMode = (m: MatchmakingMode) => (queue.selectedMode = m);

  return (
    <Options>
      <UserInfo>
        <Username>{auth.name}</Username>
        <SteamLogo src="https://upload.wikimedia.org/wikipedia/commons/thumb/8/83/Steam_icon_logo.svg/600px-Steam_icon_logo.svg.png" />
      </UserInfo>

      <MOption className={"header"}>Поиск игры</MOption>
      {/*{auth.me && auth.me.rank <= 75 && <MatchmakingOption mode={MatchmakingMode.HIGHROOM} />}*/}
      <MatchmakingOption
        onSelect={setSelectedMode}
        selected={queue.selectedMode === MatchmakingMode.RANKED}
        unrankedGamesLeft={auth.me?.unrankedGamesLeft}
        mode={MatchmakingMode.RANKED}
      />
      <MatchmakingOption
        onSelect={setSelectedMode}
        selected={queue.selectedMode === MatchmakingMode.UNRANKED}
        unrankedGamesLeft={auth.me?.unrankedGamesLeft}
        mode={MatchmakingMode.UNRANKED}
      />
      <MatchmakingOption
        onSelect={setSelectedMode}
        selected={queue.selectedMode === MatchmakingMode.BOTS}
        mode={MatchmakingMode.BOTS}
      />
      <MatchmakingOption
        onSelect={setSelectedMode}
        selected={queue.selectedMode === MatchmakingMode.SOLOMID}
        mode={MatchmakingMode.SOLOMID}
      />
      {/*<MatchmakingOption mode={MatchmakingMode.DIRETIDE} />*/}
      {/*<MatchmakingOption mode={MatchmakingMode.GREEVILING} />*/}
    </Options>
  );
});
