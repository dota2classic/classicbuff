import React from "react";
import Button from "./Button";
import { Icon } from "../Icon";

export default {
  title: "Design System/Button",

  parameters: {
    component: Button
  }
};

export const all = () => (
  // todo: remove div style
  <div style={{ display: "flex" }}>
    <Button type="primary" iconLeft={<Icon name="filter" />} text="Кнопка" />
    <Button type="primary" text="Кнопка" />
    <Button type="secondary" text="Кнопка" iconLeft={<Icon name="filter" />} />
    <Button type="tertiary" text="Кнопка" iconLeft={<Icon name="filter" />} />
  </div>
);

export const primary = () => <Button type="primary" text="Кнопка" iconLeft={<Icon name="filter" />} />;
export const secondary = () => <Button type="secondary" text="Кнопка" iconRight={<Icon name="filter" />} />;
export const tertiary = () => <Button type="tertiary" text="Кнопка" iconLeft={<Icon name="filter" />} />;
