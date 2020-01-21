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
  value: Order<T>;

  readonly fields: OrderDescriptor<T>[];

  constructor(fields: OrderDescriptor<T>[]) {
    this.fields = fields;
    this.value = { field: fields[0].field };
    if (fields[0].directional === "bi") this.value.direction = "asc";
  }

  @action
  onChange = (value: Order<T>) => (this.value = value);

  toArray = () => (this.value ? [this.value] : []);
}
