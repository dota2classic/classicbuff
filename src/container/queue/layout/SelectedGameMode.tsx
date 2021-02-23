import { observer } from "mobx-react";
import styled from "styled-components";
import React, { ReactNode } from "react";
import formatGameMode, { MatchmakingMode } from "../../../utils/format/formatGameMode";
import { colors } from "../../../shared";
import Link from "next/link";
import { useStores } from "../../../stores";
import { AdBanner } from "../../../components/ads/ads";
import { BanStatusInfo } from "../../../components/UI/BanStatusInfo";
import i18n from "./selected-game-mode.i18n";
const Container = styled.div`
  flex: 1;
  flex-direction: column;
  padding: 40px 20px 20px;
  position: relative;
`;

const ShortInfo = styled.div`
  margin-left: 40px;
  margin-right: 40px;
  font-size: 16px;

  & .game-mode {
    font-size: 20px;
    font-weight: normal;
    margin-bottom: 20px;
  }
  & a {
    cursor: pointer;
    color: ${colors.primaryTextDark};
    transition: 0.3s ease;
    &:hover {
      color: ${colors.primaryText};
    }
  }
`;

const texts: any = {
  [MatchmakingMode.RANKED]: () => (
    <span>
      {i18n.mostPopularMode} <br />
      <br />
      <Link href={"/leaderboard"}>
        <a>{i18n.viewLeaderboard}</a>
      </Link>
    </span>
  ),
  [MatchmakingMode.TOURNAMENT]: () => <span></span>,
  [MatchmakingMode.UNRANKED]: () => <span>{i18n.unranked}</span>,
  [MatchmakingMode.BOTS]: () => <span>{i18n.bots}</span>,
  [MatchmakingMode.SOLOMID]: () => <span>{i18n.solomid}</span>,
  [MatchmakingMode.DIRETIDE]: () => <span>{i18n.diretide}</span>,
  [MatchmakingMode.GREEVILING]: () => <span>Один из самых старых ивентов, проводимых Valve</span>,
  [MatchmakingMode.ABILITY_DRAFT]: () => <span>{i18n.abilityDraft}</span>,
  [MatchmakingMode.HIGHROOM]: () => <span>Режим для поиска игр с высоким рейтингом</span>,
  [MatchmakingMode.TOURNAMENT_SOLOMID]: () => <span></span>
};

export const SelectedGameMode = observer(() => {
  const { auth, queue } = useStores();

  return (
    <Container>
      <ShortInfo>
        <div className={"game-mode"}>{formatGameMode(queue.selectedMode)}</div>

        {(queue.selectedModeBanned && <BanStatusInfo ban={auth.me!!.banStatus} />) ||
          texts[queue.selectedMode as any]()}

        <br />
        <br />
        <br />
        <AdBanner />
      </ShortInfo>
    </Container>
  );
});
