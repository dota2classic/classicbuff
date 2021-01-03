import styled from "styled-components";
import React from "react";
import Link from "next/link";
import { LeaderboardEntryDto } from "../api/back/models";
import { RoleNames, RoleValue } from "../utils/format/roles";
import { colors } from "../shared";

export const Tr = styled.tr`
  line-height: 16px;
  color: ${colors.primaryTextDark};
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
    color: ${colors.primaryText};
  }

  & .ROLE_OLD {
    color: purple;
  }

  & .ROLE_MODERATOR {
    color: #335ae7;
  }

  & .ROLE_ADMIN {
    color: #c10303;
  }
  & .ROLE_HUMAN {
    color: #cda71b;
  }
`;

export const Role = styled.div`
  width: 10px;
  height: 10px;
  position: relative;

  border-radius: 50%;
  margin-right: 5px;
  font-size: 14px;

  cursor: pointer;
  & + & {
    margin-left: 5px;
  }
  &.OLD {
    background: ${colors.roles.old};
  }

  &.HUMAN {
    background: ${colors.roles.human};
  }

  &.ADMIN {
    background: ${colors.roles.admin};
  }

  &.MODERATOR {
    background: ${colors.roles.moderator};
  }

  &:hover {
    & div {
      display: block;
      pointer-events: auto;
      opacity: 1;
    }
  }

  & div {
    left: -60px;
    top: 20px;
    z-index: 5;
    transition: 0.3s ease;
    display: block;
    pointer-events: none;
    opacity: 0;
    padding: 10px;
    position: absolute;
    background: rgba(0, 0, 0, 0.9);
  }
`;

const NameContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  cursor: pointer;
`;

export default (props: LeaderboardEntryDto) => {
  const playerUrl = `/player/${props.id}`;

  const highestRole = props.roles.sort((a, b) => RoleValue[b] - RoleValue[a])[0] || "PLAYER";

  return (
    <Tr>
      <td>
        <Link href={playerUrl}>
          <a>{props.rank + 1}</a>
        </Link>
      </td>
      <td>
        <Link href={playerUrl}>
          <NameContainer>
            {highestRole !== "PLAYER" && (
              <Role className={highestRole}>
                <div>{RoleNames[highestRole]}</div>
              </Role>
            )}
            <a style={{ fontWeight: "bold" }}>{props.name}</a>
          </NameContainer>
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
    border: 1px solid ${colors.evenDarkerBg};
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
      padding: 4px;
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
