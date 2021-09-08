import styled from "styled-components";
import { colors } from "../../shared";
import Router, { useRouter } from "next/router";
import { appApi, useApi } from "../../api/hooks";
import { Tab, Tabs } from "../UI/Tabs";
import Link from "next/link";
import { AppRouter } from "../../utils/route";
import cx from "classnames";
import React, { PropsWithChildren, ReactNode } from "react";
import useWillMount from "../../utils/useWillMount";
import { observer } from "mobx-react";
import { useGameConnection } from "../util/useGameConnection";
import { NotificationHold } from "../UI/NotificationHold";
import { SearchGameBar } from "../UI/SearchGameBar/SearchGameBar";
import layoutI18n from "./layout.i18n";
import { useStores } from "stores";
import { PlayButton } from "pages";
const LayoutContainer = styled.div`
  height: 100vh;
  max-height: 100vh;
  display: flex;
  overflow-y: auto;
  overflow-x: hidden;
  flex-direction: column;

  width: 100vw;
  background: ${colors.darkBg};
  padding-bottom: 200px;

  @media (max-width: 600px) {
    padding-bottom: 0;
  }

  @media (max-height: 701px) {
    padding-bottom: 50px;
  }

  &.landing {
    padding-bottom: 0;
  }
  &.no-scroll {
    max-height: 100vh;
    overflow-y: hidden;
    padding-bottom: 0;
  }
`;

const Content = styled.div`
  //flex: 1;

  position: relative;
  z-index: 2;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: fit-content;
  min-width: 60%;

  &.landing {
    margin-top: 0px;
    width: 60%;

    @media (max-width: 600px) {
      width: 100vw;
      max-width: 100vw;
      min-width: unset;
      margin-top: 0px;
    }
  }

  @media (max-width: 600px) {
    width: 100vw;
    max-width: 100vw;
    min-width: unset;
    margin-top: 0px;
  }

  margin: 80px auto auto;
`;

const HeaderWrapper = styled.div`
  position: sticky;
  top: 0;
  right: 0;
  left: 0;
  z-index: 10;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  padding: 4px 40px 0;

  background: ${colors.evenDarkerBg};

  & .flag {
    height: 20px;
    width: auto;
    margin-right: 10px;
  }

  &.compact {
    padding: 0px;
    margin-left: 40px;
  }

  @media (max-width: 600px) {
    display: none;
  }
`;

const Title = styled.div`
  color: #d9d9d9;
  font-size: 20px;
  margin: auto auto 0px;
  justify-content: center;
  align-items: center;
  padding-top: 10px;
  display: flex;
  flex-direction: row;
  align-items: center;

  & span {
    margin-bottom: 20px;
  }

  @media (max-width: 600px) {
    font-size: 16px;
    width: 100%;
    margin: 0 0 20px;
  }
`;

const MenuIcon = styled.img`
  width: 30px;
  height: 30px;
  display: none;
  margin-right: 20px;
  margin-left: 5px;
  @media (max-width: 600px) {
    display: block;
  }
`;

export const CloseIcon = styled.img`
  width: 35px;
  height: 35px;
  object-fit: cover;
  align-items: center;
  display: flex;
  margin-right: 10px;
  position: relative;
`;

const StatsHeader = observer(() => {
  const router = useRouter();

  const asPath = router.asPath.replace("/stats", "");

  const { lang, auth } = useStores();

  const { data: liveData } = useApi().liveApi.useLiveMatchControllerListMatches({
    refreshInterval: 30_000
  });

  return (
    <HeaderWrapper>
      <Tabs className="heading wide">
        <Link {...AppRouter.index.link}>
          <Tab className={cx(asPath === "/" && "active", "primary")}>
            <span style={{ textTransform: "uppercase" }}>dota2classic</span>
          </Tab>
        </Link>

        <Link {...AppRouter.leaderboard.link}>
          <Tab className={cx(asPath === "/leaderboard" && "active")}>{layoutI18n.leaderboard}</Tab>
        </Link>

        <Link {...AppRouter.history.index.link}>
          <Tab className={cx(asPath.startsWith("/history") && "active")}>{layoutI18n.matches}</Tab>
        </Link>
        <Link {...AppRouter.tournament.index.link}>
          <Tab className={cx(asPath.startsWith("/tournament") && "active")}>{layoutI18n.tournaments}</Tab>
        </Link>

        <Link {...AppRouter.team.index.link}>
          <Tab className={cx(asPath.startsWith("/team") && "active")}>{layoutI18n.teams}</Tab>
        </Link>

        <Link {...AppRouter.live.link}>
          <Tab className={cx(asPath.startsWith("/live") && "active")}>
            {layoutI18n.live}
            {liveData && <span className="badge">{liveData?.length}</span>}
          </Tab>
        </Link>

        <div style={{ flex: 1 }} />
        <Tab className="accent no-underline" onClick={() => lang.toggle(router)}>
          {lang.language === "ru" ? (
            <img
              src="https://raw.githubusercontent.com/hampusborgos/country-flags/main/png100px/us.png"
              alt=""
              className="flag"
            />
          ) : (
            <img
              src="https://raw.githubusercontent.com/hampusborgos/country-flags/main/png100px/ru.png"
              alt=""
              className="flag"
            />
          )}
        </Tab>
        {auth.authorized ? (
          <Link {...AppRouter.player(auth.steamID || "").link}>
            <PlayButton className="inline" href={`${appApi.apiParams.basePath}/v1/auth/steam`}>
              {layoutI18n.profile}
            </PlayButton>
          </Link>
        ) : (
          <PlayButton className="inline" href={`${appApi.apiParams.basePath}/v1/auth/steam`}>
            {layoutI18n.loginViaSteam}
          </PlayButton>
        )}
      </Tabs>
    </HeaderWrapper>
  );
});

const DefaultHeader = observer(() => {
  const router = useRouter();

  const asPath = router.asPath;

  const { lang, auth } = useStores();

  return (
    <>
      <HeaderWrapper>
        <Tabs className="heading wide">
          <Link {...AppRouter.index.link}>
            <Tab className={cx(asPath === "/" && "active", "primary")}>
              <span style={{ textTransform: "uppercase" }}>dota2classic</span>
            </Tab>
          </Link>
          <Link {...AppRouter.download.link}>
            <Tab className={cx(asPath === "/download" && "active")}>{layoutI18n.download}</Tab>
          </Link>
          <Link {...AppRouter.queue.link}>
            <Tab className={cx(asPath === "/queue" && "active")}>{layoutI18n.play}</Tab>
          </Link>
          <Link {...AppRouter.stats.link}>
            <Tab className={cx(asPath.startsWith("/stats") && "active")}>{layoutI18n.stats}</Tab>
          </Link>

          {auth.isModerator && (
            <Link passHref href={"/admin/servers"}>
              <Tab className={cx(asPath.startsWith("/admin/servers") && "active")}>Админка</Tab>
            </Link>
          )}

          <div style={{ flex: 1 }} />
          <Tab className="accent no-underline" onClick={() => lang.toggle(router)}>
            {lang.language === "ru" ? (
              <img
                src="https://raw.githubusercontent.com/hampusborgos/country-flags/main/png100px/us.png"
                alt=""
                className="flag"
              />
            ) : (
              <img
                src="https://raw.githubusercontent.com/hampusborgos/country-flags/main/png100px/ru.png"
                alt=""
                className="flag"
              />
            )}
          </Tab>
          {auth.authorized ? (
            <Link {...AppRouter.player(auth.steamID || "").link}>
              <PlayButton className="inline" href={`${appApi.apiParams.basePath}/v1/auth/steam`}>
                {layoutI18n.profile}
              </PlayButton>
            </Link>
          ) : (
            <PlayButton className="inline" href={`${appApi.apiParams.basePath}/v1/auth/steam`}>
              {layoutI18n.loginViaSteam}
            </PlayButton>
          )}
        </Tabs>
      </HeaderWrapper>
    </>
  );
});

export default observer((p: PropsWithChildren<{ landing?: boolean; noScroll?: boolean; title?: ReactNode }>) => {
  const { auth } = useStores();
  useWillMount(() => {
    auth.fetchMe();
  });
  const router = useRouter();

  const asPath = router.asPath;
  useGameConnection();

  return (
    <LayoutContainer className={cx(p.noScroll && "no-scroll", p.landing && "landing")}>
      {asPath.startsWith("/stats") ? <StatsHeader /> : <DefaultHeader />}
      <NotificationHold />
      <Content className={cx(p.landing && "landing")}>
        {p.title && <Title>{p.title && <span>{p.title}</span>}</Title>}
        {p.children}
      </Content>
      <SearchGameBar />
    </LayoutContainer>
  );
});
