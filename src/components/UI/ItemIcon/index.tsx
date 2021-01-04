import React from "react";
import cx from "classnames";
import { DotaIcon } from "../HeroIcon";

interface Props {
  item: string;
  small?: boolean;
}
export default (p: Props) => (
  <DotaIcon
    className={cx("item", p.small && "small")}
    src={`https://dota2classic.ru/api/static/items/${p.item.includes("recipe") ? "recipe" : p.item}.jpg.webp`}
  />
);
