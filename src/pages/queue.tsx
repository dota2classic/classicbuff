import Layout from "../components/Layout";
import React from "react";
import Head from "next/head";
import { LeadButton, LeadButtons } from "./index";
import { observer } from "mobx-react";
import SocketService from "../service/SocketService";
import { MatchmakingMode } from "../utils/format/formatGameMode";
import styled from "styled-components";
import GameFound from "../components/GameFound";

const Bod = styled.div`
  position: relative;
`;

export default observer(() => {
  return (
    <Layout>
      <Head>
        <title>Поиск матча</title>
      </Head>
      <Bod>
        {SocketService.room && <GameFound />}
        {/*<GameFound />*/}
        <LeadButton
          onClick={() => {
            if (SocketService.mode === MatchmakingMode.SOLOMID) {
              SocketService.leaveQueue(MatchmakingMode.SOLOMID);
            } else {
              SocketService.enterQueue(MatchmakingMode.SOLOMID);
            }
          }}
        >
          {SocketService.mode === MatchmakingMode.SOLOMID ? `Отменить обычный поиск` : `Искать обычную игру`}
        </LeadButton>
      </Bod>
    </Layout>
  );
});
