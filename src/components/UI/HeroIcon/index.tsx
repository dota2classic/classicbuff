import styled from "styled-components";
import React from "react";
import { PROD_URL } from "config";

export const DotaIcon = styled.img`
  height: 40px;
  object-fit: contain;

  @media (max-width: 1200px) {
    height: 30px;
  }

  &.small {
    height: 30px;
  }
  &.item {
  }
`;

interface Props {
  hero: string;
}
export const HeroIcon = (p: Props) => (
  <DotaIcon src={`${PROD_URL}/api/static/heroes/${p.hero.replace("npc_dota_hero_", "")}.webp`} />
);
