import React, { FC } from "react";
import Sidebar, { SidebarItem } from "../Sidebar/Sidebar";
import { AddIcon, Icon, MessageIcon } from "../../assets";
import Layout from "./Layout";
import Button from "../Button/Button";
import Divider from "../Divider/Divider";
import TextInput from "../forms/TextInput/TextInput";
import Header, { HeaderCart } from "../Header/Header";
import ToolbarSortBy from "../Toolbar/ToolbarSortedBy";
import Toolbar from "../Toolbar/Toolbar";
import Accordion from "../Accordion/Accordion";
import SearchInput from "../forms/SearchInput/SearchInput";
import Finder from "../FilterCard/Finder/Finder";
import FilterCard from "../FilterCard/FilterCard";
import OfferRequestTable from "../../containers/tables/OfferRequestsTable/OfferRequestsTable";
import { boolean, withKnobs } from "@storybook/addon-knobs";
import data from "../../containers/tables/OfferRequestsTable/offer-requests-data.json";
import { apiFilterCard } from "../FilterCard/Finder/Finder.stories";

export default {
  title: "Design System/Layout",

  parameters: {
    component: Layout,
    decorators: [withKnobs]
  }
};

export const All: FC = () => {
  const [search, onChangeSearch] = React.useState<string>("");

  const [filtersShown, onChangeFiltersShown] = React.useState<boolean>(false);
  const [toolbarSortBy, onChangeToolbarSortBy] = React.useState<{ field: string; direction?: "asc" | "desc" }>({
    field: "number",
    direction: "asc"
  });
  const [brand, onChangeBrand] = React.useState<{ [key: string]: string }>({});
  const [model, onChangeModel] = React.useState<{ [key: string]: string }>({});

  const hasFilters = Object.keys(brand).length + Object.keys(model).length > 0;

  const showFilters = () => onChangeFiltersShown(true);
  const hideFilters = () => onChangeFiltersShown(false);

  const clearAll = () => {
    onChangeBrand({});
    onChangeModel({});
  };

  let handleKeyPress = (e: KeyboardEvent) => {
    if (e.keyCode === 27) {
      hideFilters();
    }
  };
  React.useEffect(() => {
    document.addEventListener("keydown", handleKeyPress);
    return () => document.removeEventListener("keydown", handleKeyPress);
  });

  return (
    <Layout
      sidebar={
        <Sidebar email="konstantinopolskiy@yandex.ru">
          <SidebarItem href="#" title="Запросы" active right={<AddIcon />} />
          <SidebarItem href="#" title="Предложения" />
          <SidebarItem href="#" title="Заявки на лизинг" right={<MessageIcon />} />
        </Sidebar>
      }
      filters={
        <FilterCard onClear={clearAll} onClose={hideFilters}>
          <Accordion title="Дата создания">
            <input type="date" />
            <input type="date" />
          </Accordion>
          <Accordion title="Клиент">
            <SearchInput placeholder="Наименование" />
          </Accordion>

          <Finder
            title="Марка"
            values={brand}
            onChange={onChangeBrand}
            onInitData={apiFilterCard.initData}
            onSearch={apiFilterCard.search}
          />
          <Finder
            title="Модель"
            values={model}
            onChange={onChangeModel}
            onInitData={apiFilterCard.initData}
            onSearch={apiFilterCard.search}
          />
        </FilterCard>
      }
      showFilters={filtersShown}
    >
      <Header>
        <Button type="primary" iconLeft={<AddIcon />} text="Создать запрос" />
        <Divider vertical />
        <TextInput placeholder="Номер запроса, клиент или ИНН, продукт" value={search} onChange={onChangeSearch} />
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
          value={toolbarSortBy}
          onChange={onChangeToolbarSortBy}
        />
        <Divider vertical />
        <Button
          type="tertiary"
          text="Фильтры"
          iconLeft={<Icon name={hasFilters ? "filter-active" : "filter"} />}
          onClick={showFilters}
        />
      </Toolbar>

      <OfferRequestTable data={data} loading={boolean("Loading", false)} hasNext={boolean("Has Next", true)} />
    </Layout>
  );
};
