import React from "react";
import Sidebar, { SidebarItem } from "./Sidebar";
import { Icon, Icon } from "../Icon";

export default {
  title: "Design System/Sidebar",

  parameters: {
    component: Sidebar,
    subcomponents: { SidebarItem }
  }
};

export const all = () => (
  <Sidebar email="konstantinopolskiy@yandex.ru">
    <SidebarItem href="#" title="Запросы" active right={<Icon name="Add" />} />
    <SidebarItem href="#" title="Предложения" />
    <SidebarItem href="#" title="Заявки на лизинг" right={<Icon name="Message" />} />
  </Sidebar>
);
