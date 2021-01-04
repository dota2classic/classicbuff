import { Tab, Tabs } from "./index";
import React from "react";

export default {
  component: Tabs,
  title: "UI/Tabs"
};

export const all = () => {
  return (
    <Tabs>
      <Tab className="active">Active tab</Tab>
      <Tab>Inactive tab</Tab>
      <Tab>Another Inactive tab</Tab>
    </Tabs>
  );
};
