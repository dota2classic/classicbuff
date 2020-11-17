import styled from "styled-components";
import React from "react";
import { DotaIcon } from "./HeroIcon";

interface Props {
  item: string;
}
export default (p: Props) => (
  <DotaIcon
    className={"item"}
    src={`https://dota2classic.ru/api/static/items/${p.item.includes("recipe") ? "recipe" : p.item}.jpg`}
  />
);
