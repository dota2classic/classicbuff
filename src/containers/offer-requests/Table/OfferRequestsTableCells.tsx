import React from "react";
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

    console.log(currenciesStore.values);

    if (currency) {
      return <>{currency.symbol || currency.description}</>;
    }

    return <ViewRepresentation value={this.props.value} />;
  }
}

const OfferRequestTableCells = {
  NumberAndDate: (props: DTO) => (
    <TwoItemsCell>
      <div>{props.code}</div>
      <div>{formatDateStr(props.date)}</div>
    </TwoItemsCell>
  ),

  ClientAndINN: (props: DTO) => (
    <TwoItemsCell>
      <div>{props.lessee_description}</div>
      <div>{props.lessee_legal_id}</div>
    </TwoItemsCell>
  ),

  AssetsAndCount: (props: DTO) => (
    <TwoItemsCell>
      <div>{props.assets}</div>
      <div>{props.asset_count} шт.</div>
    </TwoItemsCell>
  ),

  CostAndTerm: (props: DTO) => (
    <TwoItemsCell>
      <div>
        {formatPrice(props.asset_cost) + "\u00A0"} <CurrencySymbol value={props.asset_cost_currency} />
      </div>
      <div>{props.leasing_term_month} мес.</div>
    </TwoItemsCell>
  ),

  Comment: (props: DTO) => (
    <>
      <div>{props.comment}</div>
    </>
  )
};

export default OfferRequestTableCells;
