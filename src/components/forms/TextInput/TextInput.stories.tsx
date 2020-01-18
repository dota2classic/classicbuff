import React from "react";
import TextInput from "./TextInput";

export default {
  title: "Design System/Form/Text Input",

  parameters: {
    component: TextInput
  }
};

export const all = () => (
  <div style={{ width: 260 }}>
    <TextInput placeholder="Введите наименование..." />
    <TextInput placeholder="Введите наименование..." />
  </div>
);
