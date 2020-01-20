import { action, observable } from "mobx";
import { Entity, Field } from "../models";
import { EntityStore } from "./EntityStore";
import { OrderStore } from "../OrderStore";
import { Filter, IRepository, Order } from "../Repository";
import { FilterStore } from "../FilterStore";

export class PageableEntityStore<T extends Entity> {
  @observable loading = false;
  @observable empty = false;
  @observable hasNext = false;

  @observable page = 0;
  @observable pageSize = 20;

  @observable error: boolean | string = false;

  readonly order: OrderStore<T>;
  readonly filter: FilterStore<T>;

  private store: EntityStore<T>;
  private repository: IRepository<T>;

  constructor(order: OrderStore<T>, filter: FilterStore<T>, store: EntityStore<T>, repository: IRepository<T>) {
    this.order = order;
    this.filter = filter;

    this.store = store;
    this.repository = repository;
  }

  get data() {
    return this.store.data;
  }

  // fetch data

  @action
  public loadFirstPage = async () => {
    await this.loadPage(1);
  };

  @action
  public loadNext = async () => {
    if (!this.hasNext) return;
    await this.loadPage(this.page + 1);
  };

  // orders and filters

  @action
  public changeOrder = async (order?: Order<T>) => {
    this.order.onChange(order);
    await this.loadFirstPage();
  };

  @action
  public changeFilter = async (value: Filter<T>, extraInfo?: any) => {
    this.filter.onChange(value, extraInfo);
    await this.loadFirstPage();
  };

  @action
  public removeFilter = async (field: Field<T>) => {
    this.filter.onRemove(field);
    await this.loadFirstPage();
  };

  @action
  public clearFilters = async () => {
    this.filter.onClear();
    await this.loadFirstPage();
  };

  // main method

  @action
  private loadPage = async (page: number) => {
    const request = {
      page,
      size: this.pageSize,
      order: this.order.toArray(),
      filter: this.filter.toArray()
    };

    try {
      this.loading = true;
      const { data } = await this.repository.getAll(request);

      if (request.page > 1) {
        this.store.add(data);
      } else {
        this.store.replace(data);
      }

      this.page = page;
      this.hasNext = data.length == this.pageSize;
      this.empty = data.length == 0 && request.page == 0;
      this.error = false;
    } catch (e) {
      this.error = true;
    } finally {
      this.loading = false;
    }
  };
}
