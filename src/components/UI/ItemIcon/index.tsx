import React from "react";
import cx from "classnames";
import { DotaIcon } from "../HeroIcon";
import { PROD_URL } from "config";

interface Props {
  item: string;
  small?: boolean;
}
export const ItemIcon = (p: Props) => (
  <DotaIcon
    className={cx("item", p.small && "small")}
    src={`${PROD_URL}/api/static/items/${p.item.includes("recipe") ? "recipe" : p.item}.webp`}
  />
);
