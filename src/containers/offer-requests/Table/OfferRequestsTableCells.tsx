import React, { ReactNode } from "react";
import styled from "styled-components";
import { colors } from "components/shared/styles";
import { OfferRequestDTO } from "entities/OfferRequest";
import { formatPrice } from "../../../utils/format/formatPrice";
import { formatDateStr } from "../../../utils/format/formateDateStr";
import currenciesStore from "../../../service/currenciesStore";
import { observer } from "mobx-react";
import ViewRepresentation from "../../ViewRepresentation";

const TwoItemsCell = styled.div`
  div {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  div + div {
    color: ${colors.text.secondary};
  }
`;

type DTO = OfferRequestDTO;

@observer
class CurrencySymbol extends React.Component<{ value: string }> {
  render() {
    const currency = currenciesStore.values[this.props.value];

    if (currency) {
      return <>{currency.symbol || currency.description}</>;
    }

    return <ViewRepresentation value={this.props.value} />;
  }
}

const OfferRequestTableCells: {
  [key: string]: (props: {
    cellData?: any;
    columnData?: any;
    columnIndex: number;
    dataKey: string;
    isScrolling: boolean;
    parent?: any;
    rowData: DTO;
    rowIndex: number;
  }) => ReactNode;
} = {
  NumberAndDate: ({ rowData }) => (
    <TwoItemsCell>
      <div>{rowData.code}</div>
      <div>{formatDateStr(rowData.date)}</div>
    </TwoItemsCell>
  ),

  ClientAndINN: ({ rowData }) => (
    <TwoItemsCell>
      <div>{rowData.lessee_description}</div>
      <div>{rowData.lessee_legal_id}</div>
    </TwoItemsCell>
  ),

  AssetsAndCount: ({ rowData }) => (
    <TwoItemsCell>
      <div>{rowData.assets}</div>
      <div>{rowData.asset_count} шт.</div>
    </TwoItemsCell>
  ),

  CostAndTerm: ({ rowData }) => (
    <TwoItemsCell>
      <div>
        {formatPrice(rowData.asset_cost) + "\u00A0"} <CurrencySymbol value={rowData.asset_cost_currency} />
      </div>
      <div>{rowData.leasing_term_month} мес.</div>
    </TwoItemsCell>
  ),

  Comment: ({ rowData }) => (
    <>
      <div>{rowData.comment}</div>
    </>
  )
};

export default OfferRequestTableCells;
