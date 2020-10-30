import styled from "styled-components";
import React from "react";
import Link from "next/link";
import { LeaderboardEntryDto } from "../api/back/models";

export const Tr = styled.tr`
  line-height: 16px;
  color: #5e5e5e;
  font-size: 14px;
  &.link {
    cursor: pointer;
  }

  &:nth-child(even) {
    background-color: rgba(255, 255, 255, 0.04);
  }

  &:nth-child(odd) {
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

export default (props: LeaderboardEntryDto) => {
  const playerUrl = `/player/${props.id}`;

  return (
    <Tr>
      <td>
        <Link href={playerUrl}>
          <a>{props.rank + 1}</a>
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
    background-color: black !important;
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
