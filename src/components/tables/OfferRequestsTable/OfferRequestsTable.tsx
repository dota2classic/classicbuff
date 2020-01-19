import React from "react";
import Table from "components/Table/Table";
import Cells from "./OfferRequestsTableCells";
import { OfferRequestDTO } from "stores/offerRequest/OfferRequestDTO";

interface IOfferRequestTable {
  data: OfferRequestDTO[];
  loading?: boolean;
  hasNext?: boolean;
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
    hasNext={props.hasNext}
  />
);

export default OfferRequestTable;
