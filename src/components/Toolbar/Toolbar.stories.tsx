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
      <ToolbarSortBy
        fields={[
          { key: "number", label: "по номеру", directional: "bi" },
          { key: "date", label: "по дате", directional: "bi" },
          { key: "status", label: "по статусу", directional: "uni" }
        ]}
      />
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
      <ToolbarSortBy
        fields={[
          { key: "number", label: "по компании", directional: "bi" },
          { key: "date", label: "по сумме договора", directional: "bi" },
          { key: "cost", label: "по удорожанию", directional: "uni" }
        ]}
      />
    </Toolbar>
  </>
);

export const Requests = () => (
  <>
    <Toolbar title="Запросы">
      <ToolbarSortBy
        fields={[
          { key: "number", label: "по номеру", directional: "bi" },
          { key: "date", label: "по дате", directional: "bi" },
          { key: "cost", label: "по стоимости", directional: "bi" }
        ]}
      />
      <Divider vertical />
      <Button type="tertiary" text="Фильтры" iconLeft={<FilterIcon />} />
    </Toolbar>
  </>
);

export const Proposals = () => (
  <>
    <Toolbar title="Предложения">
      <ToolbarSortBy
        fields={[
          { key: "number", label: "по номеру", directional: "bi" },
          { key: "date", label: "по дате", directional: "bi" },
          { key: "cost", label: "по сумме договора", directional: "bi" }
        ]}
      />
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
      <ToolbarSortBy
        fields={[
          { key: "number", label: "сначала без файлов", directional: "uni" },
          { key: "date", label: "сначала с файлами", directional: "uni" },
          { key: "cost", label: "по алфавиту", directional: "bi" }
        ]}
      />
      <Divider vertical />
      <Button type="tertiary" text="Фильтры" iconLeft={<FilterIcon />} />
    </Toolbar>
  </>
);

export const Bids = () => (
  <>
    <Toolbar title="Заявки на лизинг">
      <ToolbarSortBy
        fields={[
          { key: "activity", label: "по активности", directional: "bi" },
          { key: "number", label: "по номеру", directional: "bi" },
          { key: "date", label: "по дате", directional: "bi" },
          { key: "status", label: "по статусу", directional: "uni" }
        ]}
      />
      <Divider vertical />
      <Button type="tertiary" text="Фильтры" iconLeft={<FilterIcon />} />
    </Toolbar>
  </>
);
