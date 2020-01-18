import React from "react";
import DateInput from "./DateInput";

export default {
  title: "Design System/Form/Date Input",

  parameters: {
    component: DateInput
  }
};

export const all = () => (
  <>
    <DateInput placeholder="Введите наименование..." />
    <DateInput placeholder="Введите наименование..." />
  </>
);
