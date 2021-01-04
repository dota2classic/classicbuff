import HeroIcon from "./index";
import React from "react";
import ItemIcon from "./index";

export default {
  title: "UI/ItemIcon",
  component: ItemIcon
};

export const all = () => (
  <>
    <HeroIcon item={"ghost_scepter"} />
    <HeroIcon item={"armlet_active"} />
  </>
);
