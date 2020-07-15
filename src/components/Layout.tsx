import styled from "styled-components";
import React, { PropsWithChildren, ReactNode } from "react";
import Link from "next/link";

const LayoutContainer = styled.div`
  min-height: 100vh;
  width: 100vw;
  //padding-top: 200px;
  background: #15191d;
  padding-bottom: 200px;
`;

const Content = styled.div`
  position: relative;
  z-index: 2;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 60%;
  min-width: 600px;
  margin: 80px auto auto;
`;

const HeaderWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 40px;
`;

const LinkWrapper = styled.img`
  height: 40px;
  width: auto;
  margin: 10px;
`;

const SiteLink = styled.a`
  font-size: 18px;
  text-decoration: none;
  cursor: pointer;
  color: #d9d9d9;
  margin-left: 40px;
`;

const Title = styled.div`
  margin: auto;
  color: #d9d9d9;
  font-size: 20px;
  margin-bottom: 40px;
`;
export default (p: PropsWithChildren<{ title: ReactNode }>) => {
  return (
    <LayoutContainer>
      <HeaderWrapper>
        <a href="https://discord.gg/VU5wjA8">
          <LinkWrapper alt={"Discord logo"} src="/static/icons/dis2.png" />
        </a>
        <a href="https://vk.com/club191796288">
          <LinkWrapper alt={"Vk logo"} src="/static/icons/vk1.png" />
        </a>
        <Link href={"/"}>
          <SiteLink>Таблица лидеров</SiteLink>
        </Link>
        <Link href={"/history"}>
          <SiteLink>История матчей</SiteLink>
        </Link>
      </HeaderWrapper>

      <Content>
        <Title>{p.title}</Title>
        {p.children}
      </Content>
    </LayoutContainer>
  );
};
