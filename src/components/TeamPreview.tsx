import styled from "styled-components";
import React from "react";
import image from "../utils/image";
import Link from "next/link";
import { FullTeamFragmentFragment, SmallTeamFragment, TeamEntity } from "../generated/sdk";
import { Tr } from "./LadderRow";

const TeamRow = styled.a`
  display: flex;
  flex-direction: row;
  color: white;
  align-items: center;

  text-decoration: none;
  font-size: 20px;

  & span {
    margin-left: 20px;
  }

  & + & {
    margin-top: 20px;
    border-top: 1px solid grey;
  }
  transition: 0.3s ease;

  padding: 20px;
  border-radius: 2px;

  &:hover {
    background: rgba(0, 0, 0, 0.1);
  }
`;
const TeamImage = styled.img`
  border-radius: 50%;
  object-fit: cover;
  width: 50px;
  height: 50px;
  border: 1px solid rgba(255, 255, 255, 0.3);
  border-right: none;
`;
export default (team: SmallTeamFragment) => (
  <Link passHref href={`/teams/${team.id}`}>
    <TeamRow>
      <TeamImage src={image(team.image)} />
      <span>{team.name}</span>
    </TeamRow>
  </Link>
);

const TeamLogo = styled.img`
  object-fit: cover;
  width: 80px;
  height: 50px;
  border: 1px solid rgba(255, 255, 255, 0.3);
  border-right: none;
`;
export const TableTeamPreview = (team: FullTeamFragmentFragment) => (
  <Tr>
    <td>
      <TeamLogo src={image(team.image)} />
    </td>
    <td style={{ fontSize: 18 }}>
      <Link passHref href={`/teams/${team.id}`}>
        <a>{team.name}</a>
      </Link>
    </td>
    <td>{team.tag}</td>
    <td>0</td> {/*Матчей*/}
    <td>{team.members.length}</td>
  </Tr>
);
