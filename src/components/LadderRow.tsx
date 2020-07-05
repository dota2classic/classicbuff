import { LadderElement } from "../shared";
import styled from "styled-components";
import React, { PropsWithChildren } from "react";
import Link from "next/link";

export const Tr = styled.tr`
  line-height: 16px;
  color: #5e5e5e;
  font-size: 14px;

  &.even {
    background-color: rgba(255, 255, 255, 0.04);
  }

  &.odd {
    background-color: rgba(255, 255, 255, 0.02);
  }

  & a {
    text-decoration: none;
  }
  & td,
  a {
    color: #c2c2c2;
  }
`;

export default (props: LadderElement & { index: number }) => {
  return (
    <Tr className={props.index % 2 === 0 ? "even" : "odd"}>
      <td>{props.index}</td>
      <td>
        <Link href={`/player/${props.steam_id}`}>{props.name}</Link>
      </td>
      <td>{props.mmr}</td>
    </Tr>
  );
};

export const LadderHeader = () => (
  <Tr>
    <th>Место</th>
    <th>Игрок</th>
    <th>MMR</th>
  </Tr>
);

export const Table = styled.table`
  & thead > tr {
    background-color: #000000;
  }

  width: 100%;

  & th {
    border: 1px solid #101010;
  }

  & td {
    border: 1px solid black;
  }

  & td.red {
    color: #c23c2a;
  }

  & td.green {
    color: #92a525;
  }

  & td,
  th {
    padding: 12px;
    font-size: 16px;
    text-align: left;
  }

  &.compact {
    & td,
    th {
      padding: 4px;
      font-size: 16px;
      text-align: center;
    }
  }
  border-top-width: 2px;
  border-right-width: 2px;
  border-bottom-width: 2px;
  border-left-width: 2px;
  border-top-color: rgb(59, 58, 56);
  border-right-color: rgb(59, 58, 56);
  border-bottom-color: rgb(59, 58, 56);
  border-left-color: rgb(59, 58, 56);
  -webkit-border-horizontal-spacing: 0px;
  -webkit-border-vertical-spacing: 0px;
`;
