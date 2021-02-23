import styled from "styled-components";
import { colors } from "../../shared";
import Router, { useRouter } from "next/router";
import { appApi, useApi } from "../../api/hooks";
import { Tab, Tabs } from "../UI/Tabs";
import Link from "next/link";
import { AppRouter } from "../../utils/route";
import cx from "classnames";
import { steamIdToNum } from "../../utils/numSteamId";
import React, { PropsWithChildren, ReactNode } from "react";
import useWillMount from "../../utils/useWillMount";
import { observer } from "mobx-react";
import { useGameConnection } from "../util/useGameConnection";
import { NotificationHold } from "../UI/NotificationHold";
import { SearchGameBar } from "../UI/SearchGameBar/SearchGameBar";
import layoutI18n from "./layout.i18n";
import { useStores } from "../../stores";
const LayoutContainer = styled.div`
  min-height: 100vh;
  width: 100vw;
  background: ${colors.darkBg};
  padding-bottom: 200px;

  @media (max-width: 600px) {
    padding-bottom: 0;
  }

  &.no-scroll {
    max-height: 100vh;
    overflow-y: hidden;
    padding-bottom: 0;
  }
`;

const Content = styled.div`
  position: relative;
  z-index: 2;
  display: flex;
  flex-direction: column;
  align-items: center;
  min-width: 600px;
  width: fit-content;
  //width: 60%;

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
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 40px 40px 0;

  &.compact {
    padding: 0px;
  }

  @media (max-width: 600px) {
    display: none;
  }
`;

export const LinkWrapper = styled.img`
  height: 40px;
  width: auto;
  margin: 10px;
  cursor: pointer;

  &.small {
    height: 35px;
  }
`;

const SiteLink = styled.a`
  font-size: 16px;

  transition: 0.3s ease;
  display: flex;
  align-items: center;
  text-decoration: underline;
  text-underline-position: under;

  &:hover {
    color: ${colors.primaryTextHighlight};
  }
  cursor: pointer;
  color: ${colors.primaryText};
  margin-left: 40px;
  @media (max-width: 600px) {
    margin-left: 0;
  }
`;

const Title = styled.div`
  color: #d9d9d9;
  font-size: 20px;
  margin: auto auto 0px;
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

const DefaultHeader = observer(() => {
  const router = useRouter();

  const asPath = router.asPath;

  const { lang, auth } = useStores();

  const { data: liveData } = useApi().liveApi.useLiveMatchControllerListMatches({
    refreshInterval: 30_000
  });

  return (
    <>
      <HeaderWrapper>
        <Tabs className="heading">
          <Link passHref {...AppRouter.index.link}>
            <Tab className={cx(asPath === "/" && "active")}>
              <span style={{ textTransform: "uppercase" }}>dota2classic</span>
            </Tab>
          </Link>
          <Link passHref {...AppRouter.download.link}>
            <Tab className={cx(asPath === "/download" && "active")}>{layoutI18n.download}</Tab>
          </Link>
          <Link passHref {...AppRouter.queue.link}>
            <Tab className={cx(asPath === "/queue" && "active")}>{layoutI18n.play}</Tab>
          </Link>
          <Link passHref {...AppRouter.donate.link}>
            <Tab className={cx(asPath === "/donate" && "active")}>{layoutI18n.donate}</Tab>
          </Link>
          <Link passHref {...AppRouter.leaderboard.link}>
            <Tab className={cx(asPath === "/leaderboard" && "active")}>{layoutI18n.leaderboard}</Tab>
          </Link>

          <Link passHref {...AppRouter.history.index.link}>
            <Tab className={cx(asPath.startsWith("/history") && "active")}>{layoutI18n.matches}</Tab>
          </Link>
          <Link passHref {...AppRouter.live.link}>
            <Tab className={cx(asPath.startsWith("/live") && "active")}>
              {layoutI18n.live}
              {liveData && <span className="badge">{liveData?.length}</span>}
            </Tab>
          </Link>

          {auth.isModerator && (
            <Link passHref href={"/admin/servers"}>
              <Tab className={cx(asPath.startsWith("/admin/servers") && "active")}>Админка</Tab>
            </Link>
          )}

          {auth.authorized ? (
            <Link passHref {...AppRouter.player(auth.steamID || "").link}>
              <Tab className={cx(asPath === `/player/${steamIdToNum(auth.steamID || "")}` && "active")}>
                {layoutI18n.profile}
              </Tab>
            </Link>
          ) : (
            <Tab className={cx(asPath === "/me" && "active")}>
              <a href={`${appApi.apiParams.basePath}/v1/auth/steam`}>{layoutI18n.loginViaSteam}</a>
            </Tab>
          )}
        </Tabs>
      </HeaderWrapper>
      <HeaderWrapper className="compact">
        <Tabs className="heading">
          <Tab target="__blank" href="https://discord.gg/VU5wjA8">
            Discord
          </Tab>
          <Tab target="__blank" href="https://vk.com/club191796288">
            VK
          </Tab>
          <Tab target="__blank" href="https://www.youtube.com/user/facts2dota">
            Youtube
          </Tab>

          <Link passHref {...AppRouter.tournament.index.link}>
            <Tab className={cx(asPath.startsWith("/tournament") && "active")}>{layoutI18n.tournaments}</Tab>
          </Link>

          <Link passHref {...AppRouter.team.index.link}>
            <Tab className={cx(asPath.startsWith("/team") && "active")}>{layoutI18n.teams}</Tab>
          </Link>

          <Tab className="accent" onClick={() => lang.toggle()}>
            {lang.language === "ru" ? "In english" : "По русски"}
          </Tab>
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

  useGameConnection();

  return (
    <LayoutContainer className={cx(p.noScroll && "no-scroll")}>
      <DefaultHeader />
      <NotificationHold />
      <Content className={cx(p.landing && "landing")}>
        <Title>
          <MenuIcon
            onClick={() => Router.push(`${router.pathname}?menu`, `${router.asPath}?menu`)}
            src={"https://dota2classic.ru/api/static/menu.svg"}
          />
          {p.title && <span>{p.title}</span>}
        </Title>
        {p.children}
      </Content>
      <SearchGameBar />
    </LayoutContainer>
  );
});
