import { observer } from "mobx-react";
import styled from "styled-components";
import React from "react";
// @ts-ignore
import cx from "classnames";
import { pendingAnimation } from "../steam-info";
import formatGameMode, { Dota2Version, MatchmakingMode } from "../../../utils/format/formatGameMode";
import { useStores } from "stores";
import { QueueState } from "stores/queue/queue.service";
import { colors } from "shared";

export const patchI18n = {
  [Dota2Version.Dota_681]: "Dota 6.81",

  [Dota2Version.Dota_684]: "Dota 6.84",
  [Dota2Version.Dota_678]: "Dota 6.78"
};
const Options = styled.div`
  display: flex;
  flex-direction: column;
  border-right: 1px solid #242424;
  overflow-y: auto;
  width: 400px;
`;

const OptionGroup = styled.div`
  display: flex;
  flex-direction: column;
  overflow-y: auto;

  &.shaded {
    transition: 0.3s ease;
    &:hover {
      opacity: 1;
    }

    opacity: 0.4;
  }
`;

const MOption = styled.div`
  display: flex;

  flex-direction: column;
  padding: 20px 20px;
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
    font-weight: normal;
    font-size: 18px;
    color: ${colors.position.foreground.bronze};

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
  unrankedGamesLeft?: number;
  version: Dota2Version;
  onSelect: (mode: MatchmakingMode, version: Dota2Version) => void;
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
  padding: 5px 20px;
  height: 80px;
  max-height: 80px;
  min-height: 80px;
  border-bottom: 1px solid #242424;
  border-top: 1px solid #242424;
  align-items: center;
  & .avatar {
    width: 40px;
    height: 40px;
    border-width: 4px;
    margin-right: 10px;
  }
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

  const localSelected = queue.selectedMode?.mode === props.mode && queue.selectedMode?.version === props.version;
  const isSelected = queue.searchingMode?.mode === props.mode && queue.searchingMode?.version === props.version;

  return (
    <MOption
      className={cx(
        isSelected && "active",
        (localSelected && "current") || undefined,
        queue.searchingMode !== undefined && !isSelected && "disabled",
        lockedCuzNewbie && "disabled"
      )}
      onClick={() => {
        if (lockedCuzNewbie) return;
        if (!(queue.searchingMode !== undefined && !isSelected)) {
          props.onSelect(props.mode, props.version);
        }
      }}
    >
      <span>{formatGameMode(props.mode)}</span>
      {props.unrankedGamesLeft && props.unrankedGamesLeft > 0 ? (
        <span className={"info"}>{props.unrankedGamesLeft} игр до разблокировки режима</span>
      ) : (
        <span className={"info"}>
          {queue.inQueue[JSON.stringify({ mode: props.mode, version: props.version })]} в поиске
        </span>
      )}
    </MOption>
  );
});

const SharedModes = observer(({ version }: { version: Dota2Version }) => {
  const { auth, queue } = useStores();

  const setSelectedMode = (m: MatchmakingMode, version: Dota2Version) =>
    (queue.selectedMode = new QueueState(m, version));

  if (version == Dota2Version.Dota_681) {
    return (
      <OptionGroup className="shaded">
        <MOption className={"header"}>{patchI18n[version]}</MOption>
        <MatchmakingOption version={version} onSelect={setSelectedMode} mode={MatchmakingMode.RANKED} />
        {/*<MatchmakingOption onSelect={setSelectedMode} version={version} mode={MatchmakingMode.CAPTAINS_MODE} />*/}
        {/*<MatchmakingOption onSelect={setSelectedMode} version={version} mode={MatchmakingMode.BOTS} />*/}
        <MatchmakingOption onSelect={setSelectedMode} version={version} mode={MatchmakingMode.SOLOMID} />
      </OptionGroup>
    );
  } else {
    return (
      <OptionGroup>
        <MOption className={"header"}>{patchI18n[version]}</MOption>
        <MatchmakingOption version={version} onSelect={setSelectedMode} mode={MatchmakingMode.RANKED} />
        {/*<MatchmakingOption onSelect={setSelectedMode} version={version} mode={MatchmakingMode.CAPTAINS_MODE} />*/}
        {/*<MatchmakingOption onSelect={setSelectedMode} version={version} mode={MatchmakingMode.BOTS} />*/}
        <MatchmakingOption onSelect={setSelectedMode} version={version} mode={MatchmakingMode.SOLOMID} />
      </OptionGroup>
    );
  }
});

export const GameModes = observer(() => {
  const { auth, queue } = useStores();

  return (
    <Options>
      <UserInfo>
        <img className="avatar" src={auth.me?.avatar} alt="" />
        <Username>{auth.name}</Username>
        <SteamLogo src="https://upload.wikimedia.org/wikipedia/commons/thumb/8/83/Steam_icon_logo.svg/600px-Steam_icon_logo.svg.png" />
      </UserInfo>

      <SharedModes version={Dota2Version.Dota_684} />
      {/*<SharedModes version={Dota2Version.Dota_681} />*/}
    </Options>
  );
});
