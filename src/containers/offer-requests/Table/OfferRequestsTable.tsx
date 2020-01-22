import React from "react";
import { OfferRequestDTO } from "entities/OfferRequest";
import { AutoSizer, Column, Table } from "react-virtualized";
import Cells from "./OfferRequestsTableCells";
import styled from "styled-components";
import { colors } from "../../../components/shared/styles";

interface IOfferRequestTable {
  data: OfferRequestDTO[];

  loading?: boolean;
  hasNext?: boolean;

  loadMore: () => void;
}

// const OfferRequestTable = (props: IOfferRequestTable) => (
//   <Table
//     columns={[
//       [{ cell: Cells.NumberAndDate, header: "Номер, дата" }],
//       [{ cell: Cells.ClientAndINN, header: "Клиент, ИНН" }],
//       [{ cell: Cells.AssetsAndCount, header: "Предмет, количество" }],
//       [{ cell: Cells.CostAndTerm, header: "Стоимость, срок", right: true }],
//       [{ cell: Cells.Comment, header: "Комментарий" }]
//     ]}
//     data={props.data}
//     loading={props.loading}
//     hasNext={props.hasNext}
//     loadMore={props.loadMore}
//   />
// );

const rightClassName = "right";
const headerClassName = "header";
const rowClassName = "row";
const oddRowClassName = "odd-row";
const evenRowClassName = "even-row";

const getRowClassName = (props: { index: number }) => {
  if (props.index < 0) return "";
  return props.index % 2 == 0 ? `${rowClassName} ${evenRowClassName}` : `${rowClassName} ${oddRowClassName}`;
};

const TableWrapper = styled.div`
  flex: 1;

  .${headerClassName} {
    color: ${colors.text.secondary};
    padding: 10px 0;
  }

  .${rightClassName} {
    text-align: right;
  }

  .${rowClassName} {
    transition: background-color 0.15s ease;
    cursor: pointer;

    &.${oddRowClassName} {
      :hover {
        background: ${colors.createHover(colors.common.background)};
      }
    }

    &.${evenRowClassName} {
      background: ${colors.frame.tiling};

      :hover {
        background: ${colors.createHover(colors.frame.tiling)};
      }
    }
  }
`;

class OfferRequestTable extends React.Component<IOfferRequestTable> {
  render() {
    return (
      <TableWrapper>
        <AutoSizer>
          {({ width, height }) => (
            <Table
              width={width}
              height={height}
              headerHeight={37}
              rowHeight={46}
              rowCount={this.props.data.length}
              rowGetter={this.rowGetter}
              rowClassName={getRowClassName}
              headerClassName={headerClassName}
              estimatedRowSize={20}
              overscanRowCount={20}
              onScroll={this.onScroll}
            >
              <Column
                label="Номер, дата"
                dataKey="number"
                width={150}
                flexGrow={1}
                flexShrink={0.5}
                cellRenderer={Cells.NumberAndDate}
              />
              <Column
                label="Клиент, ИНН"
                dataKey="lessee_description"
                width={250}
                flexGrow={1}
                cellRenderer={Cells.ClientAndINN}
              />
              <Column
                label="Предмет, количество"
                dataKey="asset"
                width={250}
                flexGrow={1}
                cellRenderer={Cells.AssetsAndCount}
              />
              <Column
                label="Стоимость, срок"
                dataKey="cost"
                width={150}
                flexGrow={1}
                flexShrink={0.5}
                headerClassName={rightClassName}
                className={rightClassName}
                cellRenderer={Cells.CostAndTerm}
              />
              <Column
                label="Комментарий"
                dataKey="comment"
                width={250}
                flexGrow={1}
                flexShrink={2}
                cellRenderer={Cells.Comment}
              />
            </Table>
          )}
        </AutoSizer>
      </TableWrapper>
    );
  }

  rowGetter = ({ index }: { index: number }) => this.props.data[index];

  onScroll = (props: { clientHeight: number; scrollHeight: number; scrollTop: number }) => {
    // console.log((props.scrollHeight - props.clientHeight - props.scrollTop) / props.clientHeight);
    const pagesToBottom = (props.scrollHeight - props.clientHeight - props.scrollTop) / props.clientHeight;
    if (pagesToBottom < 1) {
      this.props.loadMore();
    }
  };
}

export default OfferRequestTable;
