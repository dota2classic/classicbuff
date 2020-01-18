import React from "react";
import Button from "./Button";
import { CloseIcon, FilterIcon } from "../../assets";

export default {
  title: "Design System/Button",

  parameters: {
    component: Button
  }
};

export const all = () => (
  // todo: remove div style
  <div style={{ display: "flex" }}>
    <Button type="primary" iconLeft={<FilterIcon />} text="Кнопка" />
    <Button type="primary" text="Кнопка" />
    <Button type="secondary" text="Кнопка" iconLeft={<FilterIcon />} />
    <Button type="tertiary" text="Кнопка" iconLeft={<FilterIcon />} />
  </div>
);

export const primary = () => <Button type="primary" text="Кнопка" iconLeft={<FilterIcon />} />;
export const secondary = () => <Button type="secondary" text="Кнопка" iconRight={<FilterIcon />} />;
export const tertiary = () => <Button type="tertiary" text="Кнопка" iconLeft={<FilterIcon />} />;
