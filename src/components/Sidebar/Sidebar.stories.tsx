import React from "react";
import Sidebar, { SidebarItem } from "./Sidebar";
import { AddIcon, MessageIcon } from "../../assets";

export default {
  title: "Design System/Sidebar",

  parameters: {
    component: Sidebar,
    subcomponents: { SidebarItem }
  }
};

export const all = () => (
  <Sidebar email="konstantinopolskiy@yandex.ru">
    <SidebarItem href="#" title="Запросы" active right={<AddIcon />} />
    <SidebarItem href="#" title="Предложения" />
    <SidebarItem href="#" title="Заявки на лизинг" right={<MessageIcon />} />
  </Sidebar>
);
