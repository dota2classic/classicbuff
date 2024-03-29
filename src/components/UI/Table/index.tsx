import styled from "styled-components";
import { colors } from "../../../shared";

export const Table = styled.table`
  border-spacing: 0;
  & thead > tr {
    background-color: ${colors.almostBlack} !important;
  }

  width: 100%;

  & th {
    //border: 1px solid ${colors.almostBlack};
  }

  & td {
    //border: 1px solid ${colors.evenDarkerBg};
  }

  & th.red,
  td.red {
    color: ${colors.dota.red};
  }

  & td.tiny {
    font-size: 12px !important;
  }

  & th.green,
  td.green {
    color: ${colors.dota.green};
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
      padding: 2px 6px;
      font-size: 14px;
      text-align: left;
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
    color: ${colors.roles.old};
  }

  & .ROLE_MODERATOR {
    color: ${colors.roles.moderator};
  }

  & .ROLE_ADMIN {
    color: ${colors.roles.admin};
  }
  & .ROLE_HUMAN {
    color: ${colors.roles.human};
  }
`;
