import React from "react";
import Accordion from "components/Accordion/Accordion";
import Finder, { IFinderItem } from "components/Finder/Finder";
import { clearThrottle, throttle } from "utils/throttle";
import { IRepository } from "service/Repository";
import { Entity, Field } from "service/models";

interface IFinderContainer<T extends Entity> {
  title: string;

  onInitData: () => Promise<IFinderItem[]>;
  onSearch: (query: string) => Promise<IFinderItem[]>;

  values: { [key: string]: string };
  onChange: (values: { [key: string]: string }) => void;
}

interface IFinderContainerState {
  data: IFinderItem[];
  initData: IFinderItem[];
  searchResult: IFinderItem[];

  query: string;
  expand: boolean;
  searchLoading: boolean;
}

class FinderContainer<T extends Entity> extends React.Component<IFinderContainer<T>, IFinderContainerState> {
  static defaultProps = {
    value: {},
    displayField: "description"
  };

  state: IFinderContainerState = {
    query: "",
    expand: false,
    searchLoading: false,

    data: [],
    initData: [],
    searchResult: []
  };

  private timeout?: number;

  @throttle(1000)
  async onSearch(query: string = "") {
    const searchResult = await this.props.onSearch(query);
    this.setState({ searchResult, searchLoading: false });
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
    const checkedLength = Object.keys(this.props.values).length;

    return (
      <Accordion
        title={this.props.title}
        additional={checkedLength ? checkedLength : ""}
        onChangeCollapsed={this.onChangeCollapsed}
      >
        <Finder
          data={this.state.data.slice(0, this.state.initData.length)}
          searchResult={this.state.searchResult}
          searchLoading={this.state.searchLoading}
          query={this.state.query}
          onChangeQuery={this.onChangeQuery}
          checked={this.props.values}
          onChangeChecked={this.onChangeChecked}
          expand={this.state.expand}
          onToggleExpand={this.onToggleExpand}
        />
      </Accordion>
    );
  }

  onChangeQuery = async (query: string) => {
    if (!query) {
      this.onChangeExpand(false);
      return;
    }

    this.setState({ query, expand: true, searchLoading: true });
    await this.onSearch(query);
  };

  onChangeExpand = async (expand: boolean) => {
    this.setState({ expand, query: "", searchLoading: true });
    await this.onSearch("");
    if (!expand) this.timeout = setTimeout(this.sortData, 500);
  };

  onToggleExpand = () => this.onChangeExpand(!this.state.expand);

  onChangeChecked = (item: IFinderItem, checked: boolean) => {
    const values = { ...this.props.values };

    if (checked) {
      values[item.key] = item.value;

      const notFoundInData = !this.state.data.find(it => it.key === item.key);
      if (notFoundInData) {
        this.setState({
          data: this.state.data.concat(item)
        });
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
      .map(it => ({
        key: it,
        value: values[it]
      }));

    const resultLength = Math.max(checked.length + newChecked.length, initData.length);
    const initDataRest = initData.filter(it => !values[it.key]).slice(0, resultLength);

    this.setState({ data: checked.concat(newChecked, initDataRest) });
  };
}

export default FinderContainer;
