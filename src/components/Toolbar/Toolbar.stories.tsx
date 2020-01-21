import React from "react";
import Toolbar from "./Toolbar";
import Button from "../Button/Button";
import ToolbarSortBy from "./ToolbarSortedBy";
import Divider from "../Divider/Divider";
import { Icon } from "../Icon";
import { OrderDescriptor } from "../../service/OrderStore";
import { OfferRequestDTO } from "../../entities/OfferRequest";
import { action } from "@storybook/addon-actions";

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
        data={
          [
            { field: "code", label: "по номеру", directional: "bi" },
            { field: "date", label: "по дате", directional: "bi" },
            { field: "status", label: "по статусу", directional: "uni" }
          ] as OrderDescriptor<OfferRequestDTO>[]
        }
        value={{ field: "code", direction: "asc" }}
        onChange={action("onChange")}
      />
      <Divider vertical />
      <div>Вид:</div>
      <Divider vertical />
      <Button type="tertiary" text="Фильтры" iconLeft={<Icon name="filter" />} />
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
        data={
          [
            { field: "number", label: "по компании", directional: "bi" },
            { field: "date", label: "по сумме договора", directional: "bi" },
            { field: "cost", label: "по удорожанию", directional: "uni" }
          ] as any
        }
        value={{ field: "number", direction: "asc" } as any}
        onChange={action("onChange")}
      />
    </Toolbar>
  </>
);

export const Requests = () => (
  <>
    <Toolbar title="Запросы">
      <ToolbarSortBy
        data={
          [
            { field: "number", label: "по номеру", directional: "bi" },
            { field: "date", label: "по дате", directional: "bi" },
            { field: "cost", label: "по стоимости", directional: "bi" }
          ] as any
        }
        value={{ field: "number", direction: "asc" } as any}
        onChange={action("onChange")}
      />
      <Divider vertical />
      <Button type="tertiary" text="Фильтры" iconLeft={<Icon name="filter" />} />
    </Toolbar>
  </>
);

export const Proposals = () => (
  <>
    <Toolbar title="Предложения">
      <ToolbarSortBy
        data={
          [
            { field: "number", label: "по номеру", directional: "bi" },
            { field: "date", label: "по дате", directional: "bi" },
            { field: "cost", label: "по сумме договора", directional: "bi" }
          ] as any
        }
        value={{ field: "number", direction: "asc" } as any}
        onChange={action("onChange")}
      />
      <Divider vertical />
      <Button type="tertiary" text="Фильтры" iconLeft={<Icon name="filter" />} />
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
        data={
          [
            { field: "number", label: "сначала без файлов", directional: "uni" },
            { field: "date", label: "сначала с файлами", directional: "uni" },
            { field: "cost", label: "по алфавиту", directional: "bi" }
          ] as any
        }
        value={{ field: "number", direction: "asc" } as any}
        onChange={action("onChange")}
      />
      <Divider vertical />
      <Button type="tertiary" text="Фильтры" iconLeft={<Icon name="filter" />} />
    </Toolbar>
  </>
);

export const Bids = () => (
  <>
    <Toolbar title="Заявки на лизинг">
      <ToolbarSortBy
        data={
          [
            { field: "activity", label: "по активности", directional: "bi" },
            { field: "number", label: "по номеру", directional: "bi" },
            { field: "date", label: "по дате", directional: "bi" },
            { field: "status", label: "по статусу", directional: "uni" }
          ] as any
        }
        value={{ field: "number", direction: "asc" } as any}
        onChange={action("onChange")}
      />
      <Divider vertical />
      <Button type="tertiary" text="Фильтры" iconLeft={<Icon name="filter" />} />
    </Toolbar>
  </>
);
