import React from "react";
import styled from "styled-components";
import { colors } from "components/shared/styles";
import { OfferRequestDTO } from "service/models";

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

const OfferRequestTableCells = {
  NumberAndDate: (props: DTO) => (
    <TwoItemsCell>
      <div>{props.code}</div>
      <div>{props.date}</div>
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
      <div>{props.asset_cost + "\u00A0" + props.asset_cost_currency}</div>
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
