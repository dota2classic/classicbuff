import React from "react";
import { clearThrottle, throttle } from "utils/throttle";
import Finder, { IFinderItem } from "./Finder";

interface IFinderLogic {
  onInitData: () => Promise<IFinderItem[]>;
  onSearch: (query: string) => Promise<IFinderItem[]>;
}

interface FinderLogicState {
  data: IFinderItem[];
  initData: IFinderItem[];
  searchResult: IFinderItem[];

  query: string;
  expand: boolean;
  checked: { [key: string]: string };
}

class FinderLogic extends React.Component<IFinderLogic, FinderLogicState> {
  state: FinderLogicState = {
    query: "",
    expand: false,

    data: [],
    initData: [],
    searchResult: [],

    checked: {}
  };

  private timeout?: number;

  @throttle(1000)
  async onSearch(query: string = "") {
    const searchResult = await this.props.onSearch(query);
    this.setState({ searchResult });
  }

  async componentDidMount() {
    const data = await this.props.onInitData();
    this.setState({ data, initData: data });
  }

  componentWillUnmount() {
    clearTimeout(this.timeout);
    clearThrottle(this.onSearch);
  }

  render() {
    return (
      <Finder
        data={this.state.data.slice(0, this.state.initData.length)}
        searchResult={this.state.searchResult}
        query={this.state.query}
        onChangeQuery={this.onChangeQuery}
        checked={this.state.checked}
        onChangeChecked={this.onChangeChecked}
        expand={this.state.expand}
        onChangeExpand={this.onChangeExpand}
      />
    );
  }

  onChangeQuery = async (query: string) => {
    if (!query) {
      this.onChangeExpand(false);
      return;
    }

    this.setState({ query, expand: true });
    await this.onSearch(query);
  };

  onChangeExpand = async (expand: boolean) => {
    this.setState({ expand, query: "" });
    await this.onSearch("");
    if (!expand) this.timeout = setTimeout(this.sortData, 500);
  };

  onChangeChecked = (item: IFinderItem, checked: boolean) => {
    const newState = {
      ...this.state,
      checked: { ...this.state.checked }
    };

    if (checked) {
      newState.checked[item.key] = item.value;

      const alreadyInData = !!this.state.data.find(it => it.key === item.key);
      if (!alreadyInData) {
        newState.data = this.state.data.concat(item);
      }
    } else {
      delete newState.checked[item.key];
    }

    this.setState(newState);
  };

  private sortData = () => {
    const { checked, data, initData } = this.state;

    const selectedOnly = data.filter(it => checked[it.key]);
    const resultLength = Math.max(selectedOnly.length, initData.length);

    const initDataRest = initData.filter(it => !checked[it.key]).slice(0, resultLength);

    this.setState({ data: selectedOnly.concat(initDataRest) });
  };
}

export default FinderLogic;
