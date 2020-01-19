import React from "react";
import Table from "components/Table/Table";
import Cells from "./OfferRequestsTableCells";

export type OfferRequestsDTO = {
  id: string;
  code: string;
  date: string;
  agent: string;
  lessee_legal_id: string;
  lessee_description: string;
  asset_brand: string;
  asset_model: string;
  asset_count: number;
  asset_cost: string;
  asset_cost_currency: string;
  assets: string;
  leasing_term_month: number;
  leasing_payments_schedule_type: string;
};

interface IOfferRequestTable {
  data: OfferRequestsDTO[];
  loading?: boolean;
}

const OfferRequestTable = (props: IOfferRequestTable) => (
  <Table
    columns={[
      [{ cell: Cells.NumberAndDate, header: "Номер, дата" }],
      [{ cell: Cells.ClientAndINN, header: "Клиент, ИНН" }],
      [{ cell: Cells.AssetsAndCount, header: "Предмет, количество" }],
      [{ cell: Cells.CostAndTerm, header: "Стоимость, срок", right: true }],
      [{ cell: Cells.Comment, header: "Комментарий" }]
    ]}
    data={props.data}
    loading={props.loading}
  />
);

export default OfferRequestTable;
