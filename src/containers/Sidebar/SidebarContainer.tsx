import { SidebarItem } from "../../components/Sidebar/SidebarItem";
import { AddIcon, MessageIcon } from "../../assets";
import Sidebar from "../../components/Sidebar/Sidebar";
import * as React from "react";
import authService from "../../service/auth/authService";

export default () => {
  return (
    <Sidebar email="konstantinopolskiy@yandex.ru" onLogout={authService.logout}>
      <SidebarItem href="#" title="Запросы" active right={<AddIcon />} />
      <SidebarItem href="#" title="Предложения" />
      <SidebarItem href="#" title="Заявки на лизинг" right={<MessageIcon />} />
    </Sidebar>
  );
};
