import { action, computed, observable } from "mobx";
import { Entity } from "../models";

export class EntityStore<T extends Entity> {
  @observable ids: string[] = [];
  @observable map: { [id: string]: T } = {};

  @computed get data() {
    return this.ids.map(id => this.map[id]);
  }

  @action add = (data: T[]) => {
    const ids = data.map(it => it.id);
    const newIds = ids.filter(it => !this.map[it]);

    this.ids = this.ids.concat(newIds);
    data.forEach(it => (this.map[it.id] = it));
  };

  @action replace = (data: T[]) => {
    this.ids = data.map(it => it.id);
    this.map = {};
    data.forEach(it => (this.map[it.id] = it));
  };
}
