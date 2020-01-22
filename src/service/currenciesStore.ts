import { observable } from "mobx";
import { CurrencyDTO, currencyRepository } from "../entities/Currency";
import { IRepository } from "./Repository";

export class CurrenciesStore {
  @observable
  values: { [id: string]: CurrencyDTO } = {};

  private repository: IRepository<CurrencyDTO>;

  constructor(repository: IRepository<CurrencyDTO>) {
    this.repository = repository;
    this.repository.getAll({ size: 100 }).then(({ data }) => {
      data.forEach(it => (this.values[this.repository.name + "/" + it.id] = it));
    });
  }
}

export default new CurrenciesStore(currencyRepository);
