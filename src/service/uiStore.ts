import { action, observable } from "mobx";

export class UIStore {
  @observable filterOpened = false;
  @action openFilters = () => (this.filterOpened = true);
  @action closeFilters = () => (this.filterOpened = false);
}

export default new UIStore();
