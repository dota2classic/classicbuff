import React from "react";
import Sidebar, { SidebarItem } from "../Sidebar/Sidebar";
import { AddIcon, FilterIcon, MessageIcon } from "../../assets";
import Layout from "./Layout";
import Button from "../Button/Button";
import Divider from "../Divider/Divider";
import TextInput from "../forms/TextInput/TextInput";
import Header, { HeaderCart } from "../Header/Header";
import ToolbarSortBy from "../Toolbar/ToolbarSortedBy";
import Toolbar from "../Toolbar/Toolbar";
import { action } from "@storybook/addon-actions";
import Accordion from "../Accordion/Accordion";
import SearchInput from "../forms/SearchInput/SearchInput";
import Finder from "../FilterCard/Finder/Finder";
import FilterCard from "../FilterCard/FilterCard";
import { apiFilterCard } from "../FilterCard/FilterCard.stories";

export default {
  title: "Design System/Layout",

  parameters: {
    component: Layout
  }
};

export const all = () => (
  <Layout
    sidebar={
      <Sidebar email="konstantinopolskiy@yandex.ru">
        <SidebarItem href="#" title="Запросы" active right={<AddIcon />} />
        <SidebarItem href="#" title="Предложения" />
        <SidebarItem href="#" title="Заявки на лизинг" right={<MessageIcon />} />
      </Sidebar>
    }
    filters={
      <FilterCard onClear={action("onClear")} onClose={action("onClose")}>
        <Accordion title="Дата создания">
          <input type="date" />
          <input type="date" />
        </Accordion>
        <Accordion title="Клиент">
          <SearchInput placeholder="Наименование" />
        </Accordion>

        <Finder
          title="Марка"
          onInitData={apiFilterCard.initData}
          onSearch={apiFilterCard.search}
          onChange={action("Марка")}
        />
        <Finder
          title="Модель"
          onInitData={apiFilterCard.initData}
          onSearch={apiFilterCard.search}
          onChange={action("Модель")}
        />
      </FilterCard>
    }
    showFilters
  >
    <Header>
      <Button type="primary" iconLeft={<AddIcon />} text="Создать запрос" />
      <Divider vertical />
      <TextInput placeholder="Номер запроса, клиент или ИНН, продукт" />
      <Divider vertical />
      <HeaderCart />
    </Header>

    <Toolbar title="Запросы">
      <ToolbarSortBy
        fields={[
          { key: "number", label: "по номеру", directional: "bi" },
          { key: "date", label: "по дате", directional: "bi" },
          { key: "cost", label: "по стоимости", directional: "bi" }
        ]}
      />
      <Divider vertical />
      <Button type="tertiary" text="Фильтры" iconLeft={<FilterIcon />} />
    </Toolbar>
  </Layout>
);
