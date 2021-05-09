import cx from "classnames";
import React, { ReactNode, useState } from "react";
import styled, { keyframes } from "styled-components";
import { colors } from "../../../shared";
import { useStores } from "../../../stores";
import { OldRequiredModal } from "../../modal/OldRequiredModal";
import { ColoredRole } from "../ColoredRole";
import { observer } from "mobx-react";
import { useRouter } from "next/router";
import formatGameMode from "../../../utils/format/formatGameMode";
import { AcceptGameModal } from "../../../container/queue/AcceptGameModal";
import i18n from "./search-game-button.i18n";
export const pendingAnimation = keyframes`
  0% {
    box-shadow: 0 0 5px 1px rgba(255,255,255,0.6);
  }

  50% {
      box-shadow: 0 0 5px 1px rgba(255,255,255,0.2);
  }

  100% {
    box-shadow: 0 0 5px 1px rgba(255,255,255,0.6);
  }
`;

const SearchGameButtonComp = styled.button`
  outline: none;
  padding: 10px;
  color: ${colors.primaryText};
  font-family: "Trajan Pro 3", sans-serif;

  border: 1px solid ${colors.dota.green};
  border-radius: 2px;

  font-size: 18px;
  cursor: pointer;
  white-space: pre;

  transition: 0.3s ease;
  background-color: ${colors.evenDarkerBg};

  &.banned {
    color: ${colors.primaryTextDark};
    border-color: ${colors.dota.red};
  }
  
  &.ingame{
  display: none;
  }
  &.search {
  }

  &.cancel {
    border: none !important;
    outline: none;
    // animation: ${pendingAnimation} 2s linear infinite;
  }

  &:hover {
    border-radius: 4px;
    color: ${colors.primaryTextHighlight};
    background-color: ${colors.darkBg};
  }
`;

const FullSearchInfo = styled.div`
  display: flex;
  flex-direction: row;
  background: ${colors.evenDarkerBg};
`;

const EmbedCancelSearch = styled.div`
  display: flex;
  flex-direction: column;

  animation: ${pendingAnimation} 2s linear infinite;
`;

const GameSearchInfo = styled.div`
  padding: 10px;
  font-size: 14px;
  color: ${colors.primaryText};
`;

export const SearchGameButton = observer(() => {
  const { queue } = useStores();
  const [oldRequiredOpen, setOldRequiredOpen] = useState(false);
  const { auth } = useStores();
  const router = useRouter();

  const isQueuePage = router.pathname === "/queue";

  if (!queue.ready) return <SearchGameButtonComp>Подключение...</SearchGameButtonComp>;

  return (
    <FullSearchInfo>
      <OldRequiredModal open={oldRequiredOpen} close={() => setOldRequiredOpen(false)}>
        {i18n.withValues.oldRequired({
          old: (...chunks: ReactNode[]) => <ColoredRole className="old">{chunks}</ColoredRole>,
          human: (...chunks: ReactNode[]) => <ColoredRole className="human">{chunks}</ColoredRole>
        })}
      </OldRequiredModal>
      <AcceptGameModal />
      {(queue.searchingMode !== undefined && (
        <EmbedCancelSearch>
          <SearchGameButtonComp
            className={cx("cancel", queue.gameInfo?.serverURL && "ingame")}
            onClick={() => queue.cancelSearch()}
          >
            {i18n.cancelSearch}
          </SearchGameButtonComp>
          {!isQueuePage && (
            <GameSearchInfo>
              {formatGameMode(queue.searchingMode)},{" "}
              {i18n.withValues.search({ s: queue.inQueue[JSON.stringify(queue.searchingMode)] })}
            </GameSearchInfo>
          )}
        </EmbedCancelSearch>
      )) || (
        <GameSearchInfo>
          <SearchGameButtonComp
            disabled={queue.selectedModeBanned}
            className={cx("search", auth.me?.banStatus.isBanned && "banned", queue.gameInfo?.serverURL && "ingame")}
            onClick={() => {
              if (!isQueuePage) {
                router.push("/queue", "/queue").finally();
                return;
              }

              if (!queue.enterQueue()) {
                setOldRequiredOpen(true);
              }
            }}
          >
            {i18n.searchGame}
          </SearchGameButtonComp>
        </GameSearchInfo>
      )}
    </FullSearchInfo>
  );
});
