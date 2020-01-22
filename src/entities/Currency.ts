import { Entity } from "../service/models";
import { EntityRepository } from "../service/entity/EntityRepository";

export interface CurrencyDTO extends Entity {
  id: string;
  description: string;
  symbol?: string;
}

export const currencyRepository = EntityRepository.createFromMeta<CurrencyDTO>({
  name: "common.currencies",
  sample: {
    id: "ee322eff-7c40-4e46-95cd-77cd7343e875",
    description: "Российский рубль.",
    symbol: "руб."
  }
});
