import HeroSummaryRow from ".";
import React from "react";
import { Table } from "../Table";

export default {
  title: "UI/Table/HeroSummaryRow",
  component: HeroSummaryRow
};

export const normalTable = () => (
  <Table>
    <tbody>
      <HeroSummaryRow kda={6.6} winrate={0.5} games={10} hero={"npc_dota_hero_axe"} />
    </tbody>
  </Table>
);

export const compact = () => (
  <Table className={"compact"}>
    <tbody>
      <HeroSummaryRow kda={6.6} winrate={0.5} games={10} hero={"npc_dota_hero_axe"} />
    </tbody>
  </Table>
);
