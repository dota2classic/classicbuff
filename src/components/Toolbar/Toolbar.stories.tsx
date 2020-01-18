import React from "react";
import Toolbar from "./Toolbar";
import Button from "../Button/Button";
import ToolbarSortBy from "./ToolbarSortedBy";

export default {
  title: "Design System/Toolbar",

  parameters: {
    component: Toolbar,
    subcomponents: { ToolbarSortBy }
  }
};

export const all = () => (
  <>
    <Toolbar title="Условия сделки">
      <Button type="tertiary" text="Лизингополучатель" />
      <Button type="tertiary" text="Предмет лизинга" />
      <Button type="tertiary" text="Поставка" />
      <Button type="tertiary" text="Условия сделки" />
    </Toolbar>
  </>
);

export const RequestConditions = () => (
  <>
    <Toolbar title="Условия сделки">
      <Button type="tertiary" text="Лизингополучатель" />
      <Button type="tertiary" text="Предмет лизинга" />
      <Button type="tertiary" text="Поставка" />
      <Button type="tertiary" text="Условия сделки" />
    </Toolbar>
  </>
);

export const RequestProducts = () => (
  <>
    <Toolbar title="Лизинговые продукты">
      <Button type="tertiary" text="Лизингополучатель" />
      <Button type="tertiary" text="Предмет лизинга" />
      <Button type="tertiary" text="Поставка" />
      <Button type="tertiary" text="Условия сделки" />
    </Toolbar>
  </>
);

export const RequestProposals = () => (
  <>
    <Toolbar title="Коммерческие предложения">
      <Button type="tertiary" text="Лизингополучатель" />
      <Button type="tertiary" text="Предмет лизинга" />
      <Button type="tertiary" text="Поставка" />
      <Button type="tertiary" text="Условия сделки" />
    </Toolbar>
  </>
);

export const Requests = () => (
  <>
    <Toolbar title="Запросы">
      <ToolbarSortBy fields={{ number: "по номеру", date: "по дате", cost: "по стоимости" }} />
    </Toolbar>
  </>
);

export const Proposals = () => (
  <>
    <Toolbar title="Предложения">
      <Button type="tertiary" text="Лизингополучатель" />
      <Button type="tertiary" text="Предмет лизинга" />
      <Button type="tertiary" text="Поставка" />
      <Button type="tertiary" text="Условия сделки" />
    </Toolbar>
  </>
);

export const Proposal = () => (
  <>
    <Toolbar title="Предложение 00005-00000032-002">
      <Button type="tertiary" text="Лизингополучатель" />
      <Button type="tertiary" text="Предмет лизинга" />
      <Button type="tertiary" text="Поставка" />
      <Button type="tertiary" text="Условия сделки" />
    </Toolbar>
  </>
);

export const MultibidDocs = () => (
  <>
    <Toolbar title="Документы">
      <Button type="tertiary" text="Лизингополучатель" />
      <Button type="tertiary" text="Предмет лизинга" />
      <Button type="tertiary" text="Поставка" />
      <Button type="tertiary" text="Условия сделки" />
    </Toolbar>
  </>
);

export const Bids = () => (
  <>
    <Toolbar title="Заявки на лизинг">
      <Button type="tertiary" text="Лизингополучатель" />
      <Button type="tertiary" text="Предмет лизинга" />
      <Button type="tertiary" text="Поставка" />
      <Button type="tertiary" text="Условия сделки" />
    </Toolbar>
  </>
);
