import React from "react";
import { ItemIcon } from "./index";

export default {
  title: "UI/ItemIcon",
  component: ItemIcon
};

export const all = () => (
  <>
    <ItemIcon item={"ghost_scepter"} />
    <ItemIcon item={"armlet_active"} />
  </>
);
