import { HeroIcon } from "./index";
import React from "react";

export default {
  title: "UI/HeroIcon",
  component: HeroIcon
};

export const all = () => (
  <>
    <HeroIcon hero={"npc_dota_hero_axe"} />
    <HeroIcon hero={"npc_dota_hero_enigma"} />
  </>
);
