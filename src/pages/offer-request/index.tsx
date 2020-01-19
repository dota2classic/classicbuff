import * as React from "react";
import { boolean } from "@storybook/addon-knobs";
import Layout from "../../components/Layout/Layout";
import Sidebar, { SidebarItem } from "../../components/Sidebar/Sidebar";
import { AddIcon, Icon, MessageIcon } from "../../assets";
import FilterCard from "../../components/FilterCard/FilterCard";
import Accordion from "../../components/Accordion/Accordion";
import SearchInput from "../../components/forms/SearchInput/SearchInput";
import Finder from "../../components/FilterCard/Finder/Finder";
import { apiFilterCard } from "../../components/FilterCard/Finder/Finder.stories";
import Header, { HeaderCart } from "../../components/Header/Header";
import Button from "../../components/Button/Button";
import Divider from "../../components/Divider/Divider";
import TextInput from "../../components/forms/TextInput/TextInput";
import Toolbar from "../../components/Toolbar/Toolbar";
import ToolbarSortBy from "../../components/Toolbar/ToolbarSortedBy";
import OfferRequestTable from "../../components/tables/OfferRequestsTable/OfferRequestsTable";
import data from "../../components/tables/OfferRequestsTable/offer-requests-data.json";
import SidebarContainer from "../../containers/Sidebar/SidebarContainer";

export default () => {
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
      sidebar={<SidebarContainer />}
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
