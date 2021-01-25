import styled from "styled-components";
import React, { PropsWithChildren, ReactNode } from "react";
import Link from "next/link";
import AuthService from "../service/AuthServiceService";
import Router, { useRouter } from "next/router";
import { Tab, Tabs } from "./UI/Tabs";
import cx from "classnames";
import { appApi, useApi } from "../api/hooks";
import useWillMount from "../utils/useWillMount";
import { observer } from "mobx-react";
import { colors } from "../shared";
import { steamIdToNum } from "../utils/numSteamId";
import { SearchGameBar } from "./UI/SearchGameBar/SearchGameBar";
import { useGameConnection } from "./util/useGameConnection";
import { NotificationHold } from "./UI/NotificationHold";

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
  width: fit-content;
  min-width: 600px;

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
  padding: 40px 40px 20px;

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

const InfoTab = styled.div`
  position: relative;
  font-size: 14px;
  padding: 12px;
  text-decoration: none;
  cursor: pointer;

  display: flex;
  flex-direction: column;

  transition: 0.3s ease;

  color: ${colors.primaryText};
`;
const DefaultHeader = () => {
  const router = useRouter();

  const asPath = router.asPath;

  const { data } = useApi().statsApi.useStatsControllerMe();

  const { data: liveData } = useApi().liveApi.useLiveMatchControllerListMatches({
    refreshInterval: 30_000
  });

  return (
    <>
      <HeaderWrapper>
        <Tabs>
          <Link passHref href={"/"}>
            <Tab className={cx(asPath === "/" && "active")}>
              <span style={{ textTransform: "uppercase" }}>dota2classic</span>
            </Tab>
          </Link>
          <Link passHref href={"/download"}>
            <Tab className={cx(asPath === "/download" && "active")}>Скачать</Tab>
          </Link>
          <Link passHref href={"/queue"}>
            <Tab className={cx(asPath === "/queue" && "active")}>Играть</Tab>
          </Link>
          <Link passHref href={"/donate"}>
            <Tab className={cx(asPath === "/donate" && "active")}>Пожертвовать</Tab>
          </Link>
          <Link passHref href={"/leaderboard"}>
            <Tab className={cx(asPath === "/leaderboard" && "active")}>Таблица лидеров</Tab>
          </Link>
          <Link passHref href={"/history"}>
            <Tab className={cx(asPath.startsWith("/history") && "active")}>Матчи</Tab>
          </Link>

          <Link passHref href={"/live"}>
            <Tab className={cx(asPath.startsWith("/live") && "active")}>
              Live
              {liveData && <span className="badge">{liveData?.length}</span>}
            </Tab>
          </Link>
          {/*<Tab className={cx(asPath === "/heroes" && "active")}>*/}
          {/*  <Link passHref href={"/heroes"}>*/}
          {/*    <a>Таблица лидеров</a>*/}
          {/*  </Link>*/}
          {/*</Tab>*/}

          {AuthService.isModerator && (
            <Link passHref href={"/admin/servers"}>
              <Tab className={cx(asPath.startsWith("/admin/servers") && "active")}>Админка</Tab>
            </Link>
          )}

          {AuthService.authorized ? (
            <Link passHref href={`/player/${steamIdToNum(AuthService.steamID || "")}`}>
              <Tab className={cx(asPath === `/player/${steamIdToNum(AuthService.steamID || "")}` && "active")}>
                Профиль
              </Tab>
            </Link>
          ) : (
            <Tab className={cx(asPath === "/me" && "active")}>
              <a href={`${appApi.apiParams.basePath}/v1/auth/steam`}>Войти через steam</a>
            </Tab>
          )}
        </Tabs>
      </HeaderWrapper>
      <HeaderWrapper className="compact">
        <a href="https://discord.gg/VU5wjA8">
          <LinkWrapper alt={"Discord logo"} src="https://dota2classic.ru/api/static/icons/dis2.png" />
        </a>
        <a href="https://vk.com/club191796288">
          <LinkWrapper alt={"Vk logo"} src="https://dota2classic.ru/api/static/icons/vk1.png" />
        </a>

        <a href="https://www.youtube.com/user/facts2dota">
          <LinkWrapper
            className={"small"}
            alt={"Vk logo"}
            src="https://cdn.discordapp.com/attachments/724018264283414618/791790363237023814/yt3.png"
          />
        </a>

        {data && (
          <InfoTab>
            <span>{data.inGame} онлайн</span>
            <span>{data.sessions} игр</span>
          </InfoTab>
        )}
      </HeaderWrapper>
    </>
  );
};

const TournamentHeader = () => {
  return (
    <>
      <HeaderWrapper>
        <Link passHref href={"/"}>
          <SiteLink>
            <span style={{ textTransform: "uppercase" }}>dota2classic</span>
          </SiteLink>
        </Link>

        <Link passHref href={"/teams"}>
          <SiteLink>Команды</SiteLink>
        </Link>

        {/*<Link passHref href={"/tournament"}>*/}
        {/*  <SiteLink>Турниры</SiteLink>*/}
        {/*</Link>*/}

        {AuthService.authorized ? (
          <Link passHref href={"/me"}>
            <SiteLink>Профиль</SiteLink>
          </Link>
        ) : (
          <SiteLink href={`${appApi.apiParams.basePath}/v1/auth/steam`}>Войти через steam</SiteLink>
        )}
      </HeaderWrapper>
    </>
  );
};

export const TournamentLayout = (p: PropsWithChildren<{ landing?: boolean; title?: ReactNode }>) => {
  useWillMount(() => {
    AuthService.fetchMe();
  });
  const router = useRouter();

  return (
    <LayoutContainer>
      <TournamentHeader />

      <Content className={(p.landing && "landing") || undefined}>
        <Title>
          <MenuIcon
            onClick={() => Router.push(`${router.pathname}?menu`, `${router.asPath}?menu`)}
            src={"https://dota2classic.ru/api/static/menu.svg"}
          />
          {p.title && <span>{p.title}</span>}
        </Title>
        {p.children}
      </Content>
    </LayoutContainer>
  );
};

export default observer((p: PropsWithChildren<{ landing?: boolean; noScroll?: boolean; title?: ReactNode }>) => {
  useWillMount(() => {
    AuthService.fetchMe();
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
