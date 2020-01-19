import React from "react";
import { action } from "@storybook/addon-actions";
import { delay } from "utils/delay";
import FilterCard from "./FilterCard";
import Accordion from "../Accordion/Accordion";
import TextInput from "../forms/TextInput/TextInput";
import SearchInput from "../forms/SearchInput/SearchInput";
import Finder from "./Finder/Finder";
import cars from "./Finder/cars.json";

export default {
  title: "Design System/Filter Card",

  parameters: {
    component: FilterCard
  }
};

const toFinderItem = (brand: string, model: string) => ({
  key: brand + "---" + model,
  value: brand + " " + model
});

const api = {
  search: async (query: string = "") => {
    await delay(300);
    return cars
      .map(it => it.models.map(model => toFinderItem(it.brand, model)))
      .flat()
      .filter(it => it.value.toLowerCase().indexOf(query.toLowerCase()) !== -1)
      .slice(0, 50);
  },
  initData: async () => {
    await delay(300);
    return cars.map(it => toFinderItem(it.brand, it.models[0])).slice(0, 10);
  }
};

export const all = () => (
  <FilterCard onClear={action("onClear")} onClose={action("onClose")}>
    <Accordion title="Дата создания">
      <input type="date" />
      <input type="date" />
    </Accordion>
    <Accordion title="Клиент">
      <SearchInput placeholder="Наименование" />
    </Accordion>

    <Finder title="Марка" onInitData={api.initData} onSearch={api.search} onChange={action("onChange")} />

    <Accordion title="Модель">
      <TextInput placeholder="Наименование" />
      <input type="checkbox" />
      <input type="checkbox" />
      <input type="checkbox" />
      <input type="checkbox" />
      <button>Показать все</button>
    </Accordion>
  </FilterCard>
);
