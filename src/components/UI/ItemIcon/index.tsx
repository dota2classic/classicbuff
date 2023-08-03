import React from "react";
import cx from "classnames";
import { DotaIcon } from "../HeroIcon";

interface Props {
  item: string;
  small?: boolean;
}
export const ItemIcon = (p: Props) => {
  let url: string;
  if (p.item.includes("emptyitembg")) {
    url = `/static/items/${p.item}.webp`;
  } else {
    url = `https://steamcdn-a.akamaihd.net/apps/dota2/images/items/${p.item}_lg.png`;
  }
  return <DotaIcon width={60} height={44} alt={p.item} className={cx("item", p.small && "small")} src={url} />;
};
