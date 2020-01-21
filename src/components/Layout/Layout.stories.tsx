import React, { FC } from "react";
import Sidebar, { SidebarItem } from "../Sidebar/Sidebar";
import { Icon } from "../Icon";
import Layout from "./Layout";
import Button from "../Button/Button";
import Divider from "../Divider/Divider";
import TextInput from "../forms/TextInput/TextInput";
import Header, { HeaderCart } from "../Header/Header";
import ToolbarSortBy from "../Toolbar/ToolbarSortedBy";
import Toolbar from "../Toolbar/Toolbar";
import Accordion from "../Accordion/Accordion";
import SearchInput from "../forms/SearchInput/SearchInput";
import FinderContainer from "../../containers/common/filters/Finder/FinderContainer";
import FilterCard from "../FilterCard/FilterCard";
import OfferRequestTable from "../tables/OfferRequestsTable/OfferRequestsTable";
import { boolean, withKnobs } from "@storybook/addon-knobs";
import data from "../tables/OfferRequestsTable/offer-requests-data.json";
import { OrderDescriptor } from "../../service/OrderStore";
import { OfferRequestDTO } from "../../entities/OfferRequest";
import { Order } from "../../service/Repository";
import { apiFilterCard } from "../../containers/common/filters/Finder/FinderContainer.stories";
import { action } from "@storybook/addon-actions";

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
  const [toolbarSortBy, onChangeToolbarSortBy] = React.useState<Order<OfferRequestDTO>>({
    field: "code",
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
          <SidebarItem href="#" title="Запросы" active right={<Icon name="add" />} />
          <SidebarItem href="#" title="Предложения" />
          <SidebarItem href="#" title="Заявки на лизинг" right={<Icon name="message" />} />
        </Sidebar>
      }
      filters={
        <FilterCard onClear={clearAll} onClose={hideFilters} show={filtersShown}>
          <Accordion title="Дата создания">
            <input type="date" />
            <input type="date" />
          </Accordion>
          <Accordion title="Клиент">
            <SearchInput placeholder="Наименование" />
          </Accordion>

          <FinderContainer
            title="Марка"
            values={brand}
            onChange={onChangeBrand}
            onInitData={apiFilterCard.initData}
            onSearch={apiFilterCard.search}
          />
          <FinderContainer
            title="Модель"
            values={model}
            onChange={onChangeModel}
            onInitData={apiFilterCard.initData}
            onSearch={apiFilterCard.search}
          />
        </FilterCard>
      }
    >
      <Header>
        <Button type="primary" iconLeft={<Icon name="add" />} text="Создать запрос" />
        <Divider vertical />
        <TextInput placeholder="Номер запроса, клиент или ИНН, продукт" value={search} onChange={onChangeSearch} />
        <Divider vertical />
        <HeaderCart />
      </Header>

      <Toolbar title="Запросы">
        <ToolbarSortBy
          data={
            [
              { field: "code", label: "по номеру", directional: "bi" },
              { field: "date", label: "по дате", directional: "bi" },
              { field: "asset_cost", label: "по стоимости", directional: "bi" }
            ] as OrderDescriptor<OfferRequestDTO>[]
          }
          value={toolbarSortBy as Order<OfferRequestDTO>}
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

      <OfferRequestTable
        data={data}
        loading={boolean("Loading", false)}
        hasNext={boolean("Has Next", true)}
        loadMore={action("Load More")}
      />
    </Layout>
  );
};
