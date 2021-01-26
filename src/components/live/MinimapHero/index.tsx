import styled from "styled-components";
import React from "react";
import cx from "classnames";
interface Props {
  hero: string;
  x: number;
  y: number;
  team: number;
  small?: boolean;
}

const Hero = styled.div<{ x: number; y: number }>`
  width: 30px;
  height: 30px;
  position: absolute;
  transition: 5s linear;
  left: ${p => p.x * 100}%;
  bottom: ${p => p.y * 100}%;

  &.small {
    transform: scale(0.5);
  }

  &.radiant {
    filter: drop-shadow(1px 1px 0 #c0de15) drop-shadow(-1px -1px 0 #c0de15);
  }
  &.dire {
    filter: drop-shadow(1px 1px 0 #c23c2a) drop-shadow(-1px -1px 0 #c23c2a);
  }
`;

export const MinimapHero = ({ hero, x, y, team, small }: Props) => {
  return <Hero x={x} y={y} className={cx("d2mh", hero, team === 2 ? "radiant" : "dire", small && "small")} />;
};
