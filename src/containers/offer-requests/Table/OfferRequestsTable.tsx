import React from "react";
import Table from "components/Table/Table";
import { OfferRequestDTO } from "entities/OfferRequest";
import Cells from "./OfferRequestsTableCells";

interface IOfferRequestTable {
  data: OfferRequestDTO[];

  loading?: boolean;
  hasNext?: boolean;

  loadMore: () => void;
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
    loadMore={props.loadMore}
  />
);

export default OfferRequestTable;
