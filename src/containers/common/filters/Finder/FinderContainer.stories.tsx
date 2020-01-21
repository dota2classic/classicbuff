import React from "react";
import { action } from "@storybook/addon-actions";
import { delay } from "utils/helpers";
import FinderContainer from "./FinderContainer";
import apiMock from "./api-mock-finder.json";

export default {
  title: "Container/Filter Card/Finder Container",
  component: FinderContainer,
  excludeStories: ["apiFilterCard"]
};

const toFinderItem = (brand: string, model: string) => ({
  key: brand + "---" + model,
  value: brand + " " + model
});

export const apiFilterCard = {
  search: async (query: string = "") => {
    await delay(300);
    return apiMock
      .map(it => it.models.map(model => toFinderItem(it.brand, model)))
      .flat()
      .filter(it => it.value.toLowerCase().indexOf(query.toLowerCase()) !== -1)
      .slice(0, 50);
  },
  initData: async () => {
    await delay(300);
    return apiMock.map(it => toFinderItem(it.brand, it.models[0])).slice(0, 10);
  }
};

export const all = () => (
  <div style={{ width: 260 }}>
    <FinderContainer
      title="Марка"
      onInitData={apiFilterCard.initData}
      onSearch={apiFilterCard.search}
      onChange={action("onChange")}
      values={{}}
    />
  </div>
);
