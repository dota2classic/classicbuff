import React from "react";
import Toolbar from "./Toolbar";
import Button from "../Button/Button";
import ToolbarSortBy from "./ToolbarSortedBy";
import Divider from "../Divider/Divider";
import { FilterIcon } from "../../assets";

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
      <ToolbarSortBy fields={{ number: "по номеру", date: "по дате", status: "по статусу" }} />
      <Divider vertical />
      <div>Вид:</div>
      <Divider vertical />
      <Button type="tertiary" text="Фильтры" iconLeft={<FilterIcon />} />
    </Toolbar>
  </>
);

export const RequestProposals = () => (
  <>
    <Toolbar title="Коммерческие предложения">
      <input type="checkbox" />
      <label htmlFor="">Показывать АВ</label>
      <Divider vertical />
      <ToolbarSortBy fields={{ number: "по компании", date: "по сумме договора", cost: "по удорожанию" }} />
    </Toolbar>
  </>
);

export const Requests = () => (
  <>
    <Toolbar title="Запросы">
      <ToolbarSortBy fields={{ number: "по номеру", date: "по дате", cost: "по стоимости" }} />
      <Divider vertical />
      <Button type="tertiary" text="Фильтры" iconLeft={<FilterIcon />} />
    </Toolbar>
  </>
);

export const Proposals = () => (
  <>
    <Toolbar title="Предложения">
      <ToolbarSortBy fields={{ number: "по номеру", date: "по дате", cost: "по сумме договора" }} />
      <Divider vertical />
      <Button type="tertiary" text="Фильтры" iconLeft={<FilterIcon />} />
    </Toolbar>
  </>
);

export const Proposal = () => (
  <>
    <Toolbar title="Предложение 00005-00000032-002">
      <div>Гущин И. Ю.</div>
    </Toolbar>
  </>
);

export const MultibidDocs = () => (
  <>
    <Toolbar title="Документы">
      <ToolbarSortBy fields={{ number: "сначала без файлов", date: "сначала с файлами", cost: "по алфавиту" }} />
      <Divider vertical />
      <Button type="tertiary" text="Фильтры" iconLeft={<FilterIcon />} />
    </Toolbar>
  </>
);

export const Bids = () => (
  <>
    <Toolbar title="Заявки на лизинг">
      <ToolbarSortBy
        fields={{ activity: "по активности", number: "по номеру", date: "по дате", status: "по статусу" }}
      />
      <Divider vertical />
      <Button type="tertiary" text="Фильтры" iconLeft={<FilterIcon />} />
    </Toolbar>
  </>
);
