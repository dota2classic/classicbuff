import React from "react";
import Checkbox from "./Checkbox";

export default {
  title: "Design System/Form/Checkbox",

  parameters: {
    component: Checkbox
  }
};

export const all = () => (
  <div style={{ width: 260 }}>
    <Checkbox label="Компании более 3 лет" />
    <Checkbox label="Ежегодный оборот более 12 млн рублей" checked />
    <Checkbox label="Более 1500 сотрудников" />
    <Checkbox label="Доверенность поручителя" checked />
    <Checkbox label="Компания зарегистрирована в Саудовской Аравии" />
    <Checkbox label="Встаньте на носки, дотянитесь до носа, произнесите название лизинговой компании 16 раз вслух" />
  </div>
);
