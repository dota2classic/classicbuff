import { action, observable } from "mobx";
import { Order } from "./Repository";
import { Entity, Field } from "./models";

export interface OrderDescriptor<T extends Entity> {
  field: Field<T>;
  label: string;
  directional: "uni" | "bi";
}

export class OrderStore<T extends Entity> {
  @observable
  value?: Order<T>;

  readonly fields: OrderDescriptor<T>[];

  constructor(fields: OrderDescriptor<T>[]) {
    this.fields = fields;
  }

  @action
  onChange = (value?: Order<T>) => (this.value = value);

  toArray = () => (this.value ? [this.value] : []);
}
