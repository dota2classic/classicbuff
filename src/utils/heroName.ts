import heroes from "../texts/heroes";

export default (fullname?: string) => {
  return heroes.find(it => it.tag === fullname?.replace("npc_dota_hero_", ""))?.name;
};
