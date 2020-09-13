import styled from "styled-components";
import React from "react";
import image from "../utils/image";
import Link from "next/link";
import { FullTeamFragmentFragment, TeamEntity } from "../generated/sdk";

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
  }
`;
const TeamImage = styled.img`
  border-radius: 50%;
  object-fit: cover;
  width: 60px;
  height: 60px;
  border: 1px solid rgba(255, 255, 255, 0.3);
  border-right: none;
`;
export default (team: FullTeamFragmentFragment) => (
  <Link passHref href={`/teams/${team.id}`}>
    <TeamRow>
      <TeamImage src={image(team.image)} />
      <span>{team.name}</span>
    </TeamRow>
  </Link>
);
