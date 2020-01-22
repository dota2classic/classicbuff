import { action, computed, observable } from "mobx";
import { Filter } from "./Repository";
import { Entity, Field } from "./models";

export class FilterStore<T extends Entity> {
  @observable
  values: { [key: string]: Filter<T> } = {};

  @computed
  get length() {
    return Object.keys(this.values).length;
  }

  @action
  onChange = (value: Filter<T>) => {
    this.values[value.field as string] = value;
  };

  @action
  onRemove = (field: Field<T>) => {
    delete this.values[field as string];
  };

  @action
  onClear = () => {
    this.values = {};
  };

  toArray = () => Object.values(this.values);
}
