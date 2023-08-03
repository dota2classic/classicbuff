import React from "react";
import { Tab, Tabs } from "../components/UI/Tabs";
import Router from "next/router";
import PlayerHistoryTab from "./PlayerHistoryTab";
import PlayerHeroesTab from "./PlayerHeroesTab";
import { useTab } from "../utils/useTab";
import i18n from "pages-i18n/profile/profile.i18n";
import { useStores } from "../stores";

interface Props {
  steam_id: string;
}
export default (p: Props) => {
  const [tab, setTabAction] = useTab("tab", 0);
  const { auth } = useStores();
  const isMine = auth.me?.steamId === p.steam_id;

  return (
    <>
      <Tabs>
        <Tab className={(tab == 0 && "active") || undefined} onClick={() => setTabAction(0)}>
          {i18n.history}
        </Tab>
        <Tab className={(tab == 1 && "active") || undefined} onClick={() => setTabAction(1)}>
          {i18n.generalStats}
        </Tab>

        {isMine && (
          <Tab
            onClick={() => {
              auth.logout();
              return Router.push("/");
            }}
          >
            {i18n.logout}
          </Tab>
        )}
      </Tabs>

      {tab === 0 && <PlayerHistoryTab steam_id={p.steam_id} />}
      {tab === 1 && <PlayerHeroesTab steam_id={p.steam_id} />}
    </>
  );
};
