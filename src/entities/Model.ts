import { Entity } from "service/models";
import { EntityRepository } from "service/entity/EntityRepository";

export interface ModelDTO extends Entity {
  id: string;
  description: string;
  brand: string;
}

export const modelRepository = EntityRepository.createFromMeta<ModelDTO>({
  name: "assets.models",
  sample: {
    id: "00002538-7fa2-4711-8763-513d250ca260",
    description: "96 L",
    brand: "assets.brands/f95dbfe4-ee7b-4e6c-8348-4095a5cc0838"
  }
});
