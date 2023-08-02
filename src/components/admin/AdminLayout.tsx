import styled from "styled-components";
import React, { PropsWithChildren } from "react";
import Link from "next/link";

const Sidebar = styled.div`
  flex-direction: column;
  display: flex;
  width: 200px;
  padding-left: 40px;
  padding-top: 100px;
`;

const ALayout = styled.div`
  padding-top: 100px;
  display: flex;
  flex-direction: row;
  min-height: 100vh;
  width: 100vw;
  //background: #edeef0;
  background: #101213;
  font-family: Roboto, sans-serif;
`;

const Body = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  margin-right: 200px;
`;

const SidebarItem = styled.span`
  font-size: 18px;
  color: white;
  text-decoration: none;
  margin-top: 20px;
`;

export const AdminLayout = (p: PropsWithChildren<{}>) => {
  return (
    <ALayout>
      <Sidebar>
        <Link passHref href={"/"}>
          <SidebarItem>Главная</SidebarItem>
        </Link>
        {/*<Link passHref href={"/admin/"}>*/}
        {/*  <SidebarItem>Очереди</SidebarItem>*/}
        {/*</Link>*/}
        <Link passHref href={"/admin/servers"}>
          <SidebarItem>Сервера</SidebarItem>
        </Link>
        {/*<Link passHref href={"/admin/tournament"}>*/}
        {/*  <SidebarItem>Турниры</SidebarItem>*/}
        {/*</Link>*/}
      </Sidebar>
      <Body>{p.children}</Body>
    </ALayout>
  );
};
