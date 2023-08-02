import styled from "styled-components";
import React from "react";
import Image from "next/image";

export const DotaIcon = styled(Image)`
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
  <DotaIcon width={70} height={40} alt={p.hero} src={`/static/heroes/${p.hero.replace("npc_dota_hero_", "")}.webp`} />
);
