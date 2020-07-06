import styled from "styled-components";
import React from "react";
import { DotaIcon } from "./HeroIcon";

interface Props {
  item: string;
}
export default (p: Props) => <DotaIcon className={"item"} src={`/static/items/${p.item}.png`} />;
