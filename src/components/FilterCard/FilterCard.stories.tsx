import React from "react";
import FilterCard from "./FilterCard";
import { action } from "@storybook/addon-actions";
import Accordion from "../Accordion/Accordion";
import TextInput from "../forms/TextInput/TextInput";
import SearchInput from "../forms/SearchInput/SearchInput";

export default {
  title: "Design System/Filter Card",

  parameters: {
    component: FilterCard
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
    <Accordion title="Марка">
      <SearchInput placeholder="Наименование" />
      <input type="checkbox" />
      <input type="checkbox" />
      <input type="checkbox" />
      <input type="checkbox" />
      <button>Показать все</button>
    </Accordion>
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
