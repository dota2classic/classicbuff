import { action, observable } from "mobx";
import { Entity, Field } from "../models";
import { EntityStore } from "./EntityStore";
import { OrderStore } from "../OrderStore";
import { Filter, IRepository, Order } from "../Repository";
import { FilterStore } from "../FilterStore";
import { throttle } from "../../utils/throttle";

export class PageableEntityStore<T extends Entity> {
  @observable loading = false;
  @observable loadingMore = false;
  @observable empty = false;
  @observable hasNext = false;

  @observable page = 0;
  @observable pageSize = 50;

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

  @throttle(1000)
  @action
  async loadNext() {
    if (!this.hasNext || this.loadingMore) return;
    await this.loadPage(this.page + 1);
  }

  @action
  public loadMore = async (page: number) => {
    await this.loadPage(page);
  };

  // orders and filters

  @action
  public changeOrder = async (order: Order<T>) => {
    this.order.onChange(order);
    await this.loadFirstPage();
  };

  @action
  public changeFilter = async (value: Filter<T>) => {
    this.filter.onChange(value);
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
      filters: this.filter.toArray()
    };

    try {
      if (request.page == 1) {
        this.loading = true;
      } else {
        this.loadingMore = true;
      }
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
      this.loadingMore = false;
    }
  };
}
