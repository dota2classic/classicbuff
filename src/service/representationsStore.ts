import { action, observable } from "mobx";

export class RepresentationsStore {
  @observable
  values: { [id: string]: string } = {};

  @action
  add = (data: { [key: string]: string }) => {
    this.values = {
      ...this.values,
      ...data
    };
  };
}

export default new RepresentationsStore();
