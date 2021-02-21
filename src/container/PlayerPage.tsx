import React, { useEffect, useState } from "react";
import { Tab, Tabs } from "../components/UI/Tabs";
import Router, { useRouter } from "next/router";
import AuthService from "../service/AuthServiceService";
import PlayerHistoryTab from "./PlayerHistoryTab";
import PlayerHeroesTab from "./PlayerHeroesTab";
import cx from "classnames";
import { DiscordBlock } from "../components/UI/DiscordBlock";
import { useTab } from "../utils/useTab";
import { PlayerTeamsTab } from "./PlayerTeamsTab";
import i18n from "pages-i18n/profile/profile.i18n";
interface Props {
  steam_id: string;
}
export default (p: Props) => {
  const [tab, setTabAction] = useTab("tab", 0);

  const isMine = AuthService.me?.steamId === p.steam_id;

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
          <Tab className={cx(tab == 2 && "active")} onClick={() => setTabAction(2)}>
            Discord
          </Tab>
        )}

        {isMine && (
          <Tab className={cx(tab == 3 && "active")} onClick={() => setTabAction(3)}>
            {i18n.teamInvites}
          </Tab>
        )}

        {isMine && (
          <Tab
            onClick={() => {
              AuthService.logout();
              return Router.push("/");
            }}
          >
            {i18n.logout}
          </Tab>
        )}
      </Tabs>

      {tab === 0 && <PlayerHistoryTab steam_id={p.steam_id} />}
      {tab === 1 && <PlayerHeroesTab steam_id={p.steam_id} />}
      {tab === 2 && (
        <>
          <DiscordBlock />
        </>
      )}
      {tab === 3 && (
        <>
          <PlayerTeamsTab />
        </>
      )}
    </>
  );
};
