import React, { useEffect, useState } from "react";
import { Tab, Tabs } from "../components/Tabs";
import Router, { useRouter } from "next/router";
import AuthService from "../service/AuthService";
import PlayerHistoryTab from "./PlayerHistoryTab";
import PlayerHeroesTab from "./PlayerHeroesTab";
import cx from "classnames";
import { DiscordBlock } from "../components/UI/DiscordBlock";
import { useTab } from "../utils/useTab";

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
          История матчей
        </Tab>
        <Tab className={(tab == 1 && "active") || undefined} onClick={() => setTabAction(1)}>
          Общая статистика
        </Tab>

        {isMine && (
          <Tab className={cx(tab == 2 && "active")} onClick={() => setTabAction(2)}>
            Discord
          </Tab>
        )}

        {isMine && (
          <Tab
            onClick={() => {
              AuthService.logout();
              return Router.push("/");
            }}
          >
            Выйти
          </Tab>
        )}
      </Tabs>

      {/*{teamData?.User?.team?.team && (*/}
      {/*  <>*/}
      {/*    <TeamPreview {...teamData?.User?.team?.team} />*/}
      {/*    <br />*/}
      {/*  </>*/}
      {/*)}*/}

      {tab === 0 && <PlayerHistoryTab steam_id={p.steam_id} />}
      {tab === 1 && <PlayerHeroesTab steam_id={p.steam_id} />}
      {tab === 2 && (
        <>
          <DiscordBlock />
        </>
      )}
      {/*{tab === 2 && <PlayerTeamTab />}*/}
    </>
  );
};
