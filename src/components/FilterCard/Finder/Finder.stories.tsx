import React from "react";
import Finder from "./Finder";
import FinderLogic from "./FinderLogic";
import cars from "./cars.json";

export default {
  title: "Design System/Filter Card/Finder",

  parameters: {
    component: Finder
  }
};

const delay = (ms: number) => new Promise(res => setTimeout(res, ms));

const toIData = (brand: string, model: string) => ({
  key: brand + "---" + model,
  value: brand + " " + model
});

const api = {
  search: async (query: string = "") => {
    console.log("api request: search");
    await delay(300);
    return cars
      .map(it => it.models.map(model => toIData(it.brand, model)))
      .flat()
      .filter(it => it.value.toLowerCase().indexOf(query.toLowerCase()) !== -1)
      .slice(0, 50);
  },
  initData: async () => {
    console.log("api request: init data");
    await delay(300);
    return cars.map(it => toIData(it.brand, it.models[0])).slice(0, 10);
  }
};

export const all = () => (
  <div style={{ width: 260 }}>
    <FinderLogic onInitData={api.initData} onSearch={api.search} />
  </div>
);
