import styled from "styled-components";
import React from "react";

export const DotaIcon = styled.img`
  height: 40px;
  object-fit: contain;

  &.item {
  }
`;

interface Props {
  hero: string;
}
export default (p: Props) => <DotaIcon src={`/static/heroes/${p.hero}.jpg`} />;
