import { Entity } from "../service/models";
import { EntityRepository } from "../service/entity/EntityRepository";

export interface BrandDTO extends Entity {
  id: string;
  description: string;
}

export const brandRepository = EntityRepository.createFromMeta<BrandDTO>({
  name: "assets.brands",
  sample: {
    id: "004291a2-d0d1-4d69-98bc-4030bb0613fb",
    description: "Autobianchi"
  }
});
