import React, { PropsWithChildren } from "react";
import styled from "styled-components";
import { observer } from "mobx-react";
import { GameModes } from "./GameModes";
import SteamInfo from "../steam-info";
import { SelectedGameMode } from "./SelectedGameMode";
import { colors } from "../../../shared";
import { useStores } from "../../../stores";
import { AcceptGameModal } from "../AcceptGameModal";
import { AcceptPartyModal } from "../AcceptPartyModal";

const AppLayout = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: ${colors.darkBg};
  color: ${colors.primaryText};
  display: flex;
  flex-direction: row;
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
`;
export const Layout = observer(({ children }: PropsWithChildren<{}>) => {
  const stores = useStores();

  if (stores.auth.authorized)
    return (
      <AppLayout>
        <GameModes />
        <Content>
          <SteamInfo />
          <SelectedGameMode />
          <AcceptGameModal />
          <AcceptPartyModal />
        </Content>
      </AppLayout>
    );
  else return <h1>Для поиска игры нужно войти в свой Steam аккаунт</h1>;
});
