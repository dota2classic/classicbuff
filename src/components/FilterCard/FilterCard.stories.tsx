import React from "react";
import FilterCard from "./FilterCard";
import { action } from "@storybook/addon-actions";

export default {
  title: "Design System/Filter Card",

  parameters: {
    component: FilterCard
  }
};

export const all = () => (
  <FilterCard onClear={action("onClear")} onClose={action("onClose")}>
    123
  </FilterCard>
);
