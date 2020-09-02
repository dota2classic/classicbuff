import { Player } from "../shared";
import styled from "styled-components";
import React, { PropsWithChildren } from "react";
import Link from "next/link";
import { steamIdToNum } from "../utils/numSteamId";

export const Tr = styled.tr`
  line-height: 16px;
  color: #5e5e5e;
  font-size: 14px;
  &.link {
    cursor: pointer;
  }

  &.even {
    background-color: rgba(255, 255, 255, 0.04);
  }

  &.odd {
    background-color: rgba(255, 255, 255, 0.02);
  }

  & a {
    text-decoration: none;
  }

  & td.omit,
  th.omit {
    @media (max-width: 600px) {
      display: none;
    }
  }

  & td,
  a {
    color: #c2c2c2;
  }
`;

export default (props: Player & { index: number }) => {
  const playerUrl = `/player/${steamIdToNum(props.steam_id)}`;

  return (
    <Tr className={props.index % 2 === 0 ? "even" : "odd"}>
      <td>
        <Link href={playerUrl}>
          <a>{props.index}</a>
        </Link>
      </td>
      <td>
        <Link href={playerUrl}>
          <a style={{ fontWeight: "bold" }}>{props.name}</a>
        </Link>
      </td>
      <td style={{ textAlign: "center" }}>{props.mmr}</td>
    </Tr>
  );
};

export const LadderHeader = () => (
  <Tr>
    <th>Место</th>
    <th>Игрок</th>
    <th style={{ textAlign: "center" }}>MMR</th>
  </Tr>
);

export const Table = styled.table`
  & thead > tr {
    background-color: black;
  }

  width: 100%;

  & th {
    border: 1px solid #010101;
  }

  & td {
    border: 1px solid black;
  }

  & th.red,
  td.red {
    color: #c23c2a;
  }

  & td.tiny {
    font-size: 12px !important;
  }

  & th.green,
  td.green {
    color: #92a525;
  }

  & td,
  th {
    padding: 12px;
    font-size: 14px;
    font-weight: 500;
    text-align: left;
  }

  &.very-compact {
    width: fit-content;
  }
  &.compact {
    & td,
    th {
      padding: 2px;
      font-size: 14px;
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
