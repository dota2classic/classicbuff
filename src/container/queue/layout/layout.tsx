import React, { PropsWithChildren } from "react";
import styled from "styled-components";
import { observer } from "mobx-react";
import { GameModes } from "./GameModes";
import SteamInfo from "../steam-info";
import { SelectedGameMode } from "./SelectedGameMode";
import { colors } from "../../../shared";
import { useStores } from "../../../stores";
import { LeadButton } from "../../../pages";
import { appApi } from "../../../api/hooks";
import i18n from "./layout.i18n";

const AppLayout = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: ${colors.darkBg};
  color: ${colors.primaryText};
  display: flex;
  overflow-y: hidden;
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
        </Content>
      </AppLayout>
    );
  else return <LeadButton href={`${appApi.apiParams.basePath}/v1/auth/steam`}>{i18n.steamLoginRequired}</LeadButton>;
});
