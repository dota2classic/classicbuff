import React, { useEffect, useState } from "react";
import { Tab, Tabs } from "../components/Tabs";
import { Table, Tr } from "../components/LadderRow";
import HeroIcon from "../components/HeroIcon";
import PlayerMatch from "../components/PlayerMatch";
import Pagination from "../components/Pagination";
import SmartTable from "../components/SmartTable";
import Router, { useRouter } from "next/router";
import { steamIdToNum } from "../utils/numSteamId";
import getHeroRating from "../utils/getHeroRating";
import { usePlayerPageQuery, useTeamInvitesCountQuery, useUserQuery } from "../generated/sdk";
import { BaseGQLConfig } from "../shared";
import AuthService from "../service/AuthService";
import TeamPreview from "../components/TeamPreview";
import PlayerHistoryTab from "./PlayerHistoryTab";
import PlayerHeroesTab from "./PlayerHeroesTab";
import PlayerTeamTab from "./PlayerTeamTab";
import cx from "classnames";
interface Props {
  steam_id: string;
}
export default (p: Props) => {
  const { data: teamData } = useUserQuery({
    variables: {
      id: p.steam_id
    }
  });

  const { tab: initialTab } = useRouter().query;

  const [tab, setTab] = useState(0);

  useEffect(() => {
    const newTab = Number(initialTab);
    if (!Number.isNaN(newTab)) {
      setTab(newTab);
    }
  }, [initialTab]);

  // const isMine = AuthService.me?.steam_id === p.steam_id;
  const isMine = false;

  const { data } = useTeamInvitesCountQuery({
    ...BaseGQLConfig
  });

  const setTabAction = async (tab: number) => {
    await Router.push(Router.pathname.split("?")[0] + `?tab=${tab}`, Router.asPath.split("?")[0] + `?tab=${tab}`, {
      shallow: true
    });
    setTab(tab);
  };

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
          <Tab
            className={cx((tab == 2 && "active") || undefined, data?.TeamInvitations.length && "interesting")}
            onClick={() => setTabAction(2)}
          >
            Приглашения в команду
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
      {tab === 2 && <PlayerTeamTab />}
    </>
  );
};
