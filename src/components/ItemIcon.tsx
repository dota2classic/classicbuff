import styled from "styled-components";
import React from "react";
import { DotaIcon } from "./HeroIcon";
import cx from "classnames";
interface Props {
  item: string;
  small?: boolean;
}
export default (p: Props) => (
  <DotaIcon
    className={cx("item", p.small && "small")}
    src={`https://dota2classic.ru/api/static/items/${p.item.includes("recipe") ? "recipe" : p.item}.jpg`}
  />
);
