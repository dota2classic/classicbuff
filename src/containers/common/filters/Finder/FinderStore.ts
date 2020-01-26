import { observable } from "mobx";
import { throttle } from "utils/throttle";
import { IFinderItem } from "components/Finder/Finder";

class FinderStore {
  @observable data = [];
  @observable expand = false;

  @observable initData = [];
  @observable initDataLoading = true;

  @observable query = "";
  @observable searchResult = [];
  @observable searchLoading = false;

  private timeout?: number;

  @throttle(1000)
  async onSearch(query: string = "") {
    const searchResult = await this.props.onSearch(query);

    this.searchLoading = false;
    this.searchResult = searchResult;
  }

  async onDidMount() {
    const data = await this.props.onInitData();

    this.initData = data;
    this.initDataLoading = false;
    this.data = data;

    this.sortData();
  }

  onChangeQuery = async (query: string) => {
    if (!query) {
      this.onChangeExpand(false);
      return;
    }

    this.query = query;
    this.expand = true;
    this.searchLoading = true;
    await this.onSearch(query);
  };

  onChangeExpand = async (expand: boolean) => {
    this.expand = expand;
    this.query = "";
    this.searchLoading = true;

    await this.onSearch("");
    if (!expand) {
      clearTimeout(this.timeout);
      this.timeout = setTimeout(this.sortData, 500);
    }
  };

  onToggleExpand = () => this.onChangeExpand(!this.expand);

  onChangeChecked = (item: IFinderItem, checked: boolean) => {
    const values = { ...this.props.values };

    if (checked) {
      values[item.key] = item.value;

      const notFoundInData = !this.state.data.find(it => it.key === item.key);
      if (notFoundInData) {
        this.setState({ data: this.state.data.concat(item) });
      }
    } else {
      delete values[item.key];
    }

    this.props.onChange(values);
  };

  onChangeCollapsed = async (collapsed: boolean) => {
    if (!collapsed) {
      this.onChangeExpand(false);
    }
  };

  private sortData = () => {
    const { values } = this.props;
    const { data, initData } = this.state;

    const checked = data.filter(it => values[it.key]);
    const newChecked = Object.keys(values)
      .filter(key => !checked.find(it => it.key === key))
      .map(it => ({ key: it, value: values[it] }));

    const resultLength = Math.max(checked.length + newChecked.length, initData.length);
    const initDataRest = initData.filter(it => !values[it.key]).slice(0, resultLength);

    this.data = checked.concat(newChecked, initDataRest);
  };
}

export default FinderContainer;
