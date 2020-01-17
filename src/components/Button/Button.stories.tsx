import React from "react";
import Button from "./Button";
import { FilterIcon } from "../../assets";

export default {
  title: "Design System/Button",

  parameters: {
    component: Button
  }
};

export const all = () => (
  <>
    <Button style="primary" iconLeft={<FilterIcon />} text="Кнопка" />
    <Button style="secondary" text="Кнопка" iconLeft={<FilterIcon />} />
    <Button style="tertiary" text="Кнопка" iconLeft={<FilterIcon />} />
  </>
);

export const primary = () => <Button style="primary" text="Кнопка" iconLeft={<FilterIcon />} />;
export const secondary = () => <Button style="secondary" text="Кнопка" iconRight={<FilterIcon />} />;
export const tertiary = () => <Button style="tertiary" text="Кнопка" iconLeft={<FilterIcon />} />;
