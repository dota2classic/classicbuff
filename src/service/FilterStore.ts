import { action, computed, observable } from "mobx";
import { Filter } from "./Repository";
import { Entity, Field } from "./models";

export class FilterStore<T extends Entity> {
  @observable
  values: { [key: string]: Filter<T> } = {};

  @observable
  extraInfo: { [key: string]: any } = {};

  @computed
  get length() {
    return Object.keys(this.values).length;
  }

  @action
  onChange = (value: Filter<T>, extraInfo?: any) => {
    this.values[value.field as string] = value;
    this.extraInfo[value.field as string] = extraInfo;
  };

  @action
  onRemove = (field: Field<T>) => {
    delete this.values[field as string];
    delete this.extraInfo[field as string];
  };

  @action
  onClear = () => {
    this.values = {};
    this.extraInfo = {};
  };

  toArray = () => Object.values(this.values);
}
