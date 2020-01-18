import React from "react";
import SearchInput from "./SearchInput";

export default {
  title: "Design System/Form/Search Input",

  parameters: {
    component: SearchInput
  }
};

export const all = () => (
  <div style={{ width: 260 }}>
    <SearchInput placeholder="Введите наименование..." />
    <SearchInput placeholder="Введите наименование..." value="123" />
  </div>
);
