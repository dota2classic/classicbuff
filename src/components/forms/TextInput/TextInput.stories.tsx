import React from "react";
import TextInput from "./TextInput";

export default {
  title: "Design System/Form/Text Input",

  parameters: {
    component: TextInput
  }
};

export const all = () => (
  <>
    <TextInput placeholder="Введите наименование..." />
    <TextInput placeholder="Введите наименование..." />
  </>
);
