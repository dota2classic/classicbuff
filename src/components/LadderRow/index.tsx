import styled from "styled-components";
import { colors } from "../../shared";
import { LeaderboardEntryDto } from "../../api/back/models";
import { RoleNames, RoleValue } from "../../utils/format/roles";
import { Tr } from "../UI/Table";
import Link from "next/link";
import React from "react";
import i18n from "./ladder-row.i18n";
import { AppRouter } from "../../utils/route";
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

const NameContainer = styled.a`
  display: flex;
  flex-direction: row;
  align-items: center;
  cursor: pointer;
`;

export default (props: LeaderboardEntryDto) => {
  const highestRole = props.roles.sort((a, b) => RoleValue[b] - RoleValue[a])[0] || "PLAYER";

  const numId = Number(props.id);
  return (
    <Tr>
      <td>
        <Link passHref {...AppRouter.player(numId).link}>
          <a>{props.rank + 1}</a>
        </Link>
      </td>
      <td>
        <Link {...AppRouter.player(numId).link} passHref>
          <NameContainer>
            {highestRole !== "PLAYER" && (
              <Role className={highestRole}>
                <div>{RoleNames[highestRole]}</div>
              </Role>
            )}
            <span>{props.name}</span>
          </NameContainer>
        </Link>
      </td>
      <td style={{ textAlign: "center" }}>{props.mmr}</td>
    </Tr>
  );
};

export const LadderHeader = () => (
  <Tr>
    <th>{i18n.rank}</th>
    <th>{i18n.player}</th>
    <th style={{ textAlign: "center" }}>{i18n.mmr}</th>
  </Tr>
);
