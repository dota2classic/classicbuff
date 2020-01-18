import React from "react";
import Input from "./Input";

export default {
  title: "Design System/Input",

  parameters: {
    component: Input
  }
};

export const all = () => (
  <>
    <Input placeholder="Введите наименование..." />
    <Input placeholder="Введите наименование..." />
  </>
);
