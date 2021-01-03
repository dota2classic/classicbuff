import styled from "styled-components";
import React, { PropsWithChildren, ReactNode } from "react";
import Link from "next/link";
import AuthService from "../service/AuthService";
import Router, { useRouter } from "next/router";
import { Tab, Tabs } from "./Tabs";
import cx from "classnames";
import { appApi } from "../api/hooks";
import useWillMount from "../utils/useWillMount";
import { observer } from "mobx-react";
import { colors } from "../shared";

const LayoutContainer = styled.div`
  min-height: 100vh;
  width: 100vw;
  background: ${colors.darkBg};
  padding-bottom: 200px;

  @media (max-width: 600px) {
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

const DefaultHeader = () => {
  const router = useRouter();

  const asPath = router.asPath;

  return (
    <>
      <HeaderWrapper>
        <Tabs>
          <Tab className={cx(asPath === "/" && "active")}>
            <Link passHref href={"/"}>
              <span style={{ textTransform: "uppercase" }}>dota2classic</span>
            </Link>
          </Tab>
          <Tab className={cx(asPath === "/download" && "active")}>
            <Link passHref href={"/download"}>
              <a>Скачать</a>
            </Link>
          </Tab>
          <Tab className={cx(asPath === "/queue" && "active")}>
            <Link passHref href={"/queue"}>
              <a>Играть</a>
            </Link>
          </Tab>
          <Tab className={cx(asPath === "/support" && "active")}>
            <Link passHref href={"/support"}>
              <a>Поддержка</a>
            </Link>
          </Tab>
          <Tab className={cx(asPath === "/leaderboard" && "active")}>
            <Link passHref href={"/leaderboard"}>
              <a>Таблица лидеров</a>
            </Link>
          </Tab>
          <Tab className={cx(asPath === "/history" && "active")}>
            <Link passHref href={"/history"}>
              <a>Матчи</a>
            </Link>
          </Tab>
          {/*<Tab className={cx(asPath === "/heroes" && "active")}>*/}
          {/*  <Link passHref href={"/heroes"}>*/}
          {/*    <a>Таблица лидеров</a>*/}
          {/*  </Link>*/}
          {/*</Tab>*/}

          {AuthService.authorized ? (
            <Tab className={cx(asPath === "/me" && "active")}>
              <Link passHref href={"/me"}>
                <a>Профиль</a>
              </Link>
            </Tab>
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

export default observer((p: PropsWithChildren<{ landing?: boolean; title?: ReactNode }>) => {
  useWillMount(() => {
    AuthService.fetchMe();
  });
  const router = useRouter();

  console.log(router);
  return (
    <LayoutContainer>
      <DefaultHeader />

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
});
