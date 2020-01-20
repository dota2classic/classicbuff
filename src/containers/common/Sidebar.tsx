import * as React from "react";
import { FC } from "react";
import Sidebar, { ISidebarItem, SidebarItem as SidebarItemComponent } from "components/Sidebar/Sidebar";
import { Icon } from "components/Icon";
import authService from "service/auth/authService";
import { useRouter } from "next/router";

const SidebarItem: FC<Omit<ISidebarItem, "active">> = (props: Omit<ISidebarItem, "active">) => (
  <SidebarItemComponent {...props} active={useRouter().pathname === props.href} />
);

export const SidebarContainer = () => (
  <Sidebar email="konstantinopolskiy@yandex.ru" onLogout={authService.logout}>
    <SidebarItem href="/offer-request" title="Запросы" right={<Icon name="add" />} />
    <SidebarItem href="/offer" title="Предложения" />
    <SidebarItem href="/lease-request" title="Заявки на лизинг" right={<Icon name="message" />} />
  </Sidebar>
);

export default SidebarContainer;
