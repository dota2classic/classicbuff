import React from "react";
import { delay } from "utils/delay";
import Finder from "./Finder";
import cars from "./cars.json";
import { action } from "@storybook/addon-actions";

export default {
  title: "Design System/Filter Card/Finder",
  component: Finder,
  excludeStories: ["apiFilterCard"]
};

const toFinderItem = (brand: string, model: string) => ({
  key: brand + "---" + model,
  value: brand + " " + model
});

export const apiFilterCard = {
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
  <div style={{ width: 260 }}>
    <Finder
      title="Марка"
      onInitData={apiFilterCard.initData}
      onSearch={apiFilterCard.search}
      onChange={action("onChange")}
    />
  </div>
);
