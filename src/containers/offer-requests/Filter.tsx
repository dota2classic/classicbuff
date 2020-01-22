import * as React from "react";
import Accordion from "components/Accordion/Accordion";
import SearchInput from "components/forms/SearchInput/SearchInput";
import FinderContainer from "containers/common/filters/Finder/FinderContainer";
import FilterCard from "components/FilterCard/FilterCard";
import { KeyName } from "utils/hooks";
import { brandRepository } from "../../entities/Brand";
import { modelRepository } from "../../entities/Model";
import uiStore from "../../service/uiStore";
import offerRequestStore from "./service/store";
import { observer } from "mobx-react";

type State = {
  brand: { [key: string]: string };
  model: { [key: string]: string };
};

@observer
export class OfferRequestsFilters extends React.Component<{}, State> {
  state = {
    brand: {},
    model: {}
  };

  onChangeBrand = (brand: { [key: string]: string }) => this.setState({ brand });
  onChangeModel = (model: { [key: string]: string }) => this.setState({ model });

  handleESC = (e: KeyboardEvent) => {
    if (e.key in KeyName.ESC) uiStore.closeFilters();
  };

  componentDidMount(): void {
    document.addEventListener("keydown", this.handleESC);
  }

  componentWillUnmount(): void {
    document.removeEventListener("keydown", this.handleESC);
  }

  render() {
    const fetchBrand = {
      onInitData: async () =>
        (
          await brandRepository.getAll({
            size: 10
          })
        ).data.map(it => ({ key: it.id, value: it.description })),
      onSearch: async (query: string) =>
        (
          await brandRepository.getAll({
            size: 50,
            filters: [{ field: "description", comp: "fsearch", value: query }]
          })
        ).data.map(it => ({ key: it.id, value: it.description }))
    };

    const fetchModel = {
      onInitData: async () =>
        (
          await modelRepository.getAll({
            size: 10
          })
        ).data.map(it => ({ key: it.id, value: it.description })),
      onSearch: async (query: string) =>
        (
          await modelRepository.getAll({
            size: 50,
            filters: [{ field: "description", comp: "fsearch", value: query }]
          })
        ).data.map(it => ({ key: it.id, value: it.description }))
    };

    return (
      <FilterCard show={uiStore.filterOpened} onClear={offerRequestStore.filter.onClear} onClose={uiStore.closeFilters}>
        <Accordion title="Дата создания">
          <input type="date" />
          <input type="date" />
        </Accordion>

        <Accordion title="Клиент">
          <SearchInput placeholder="Наименование" />
        </Accordion>

        <FinderContainer
          title="Марка"
          values={this.state.brand}
          onChange={this.onChangeBrand}
          onInitData={fetchBrand.onInitData}
          onSearch={fetchBrand.onSearch}
        />

        <FinderContainer
          title="Модель"
          values={this.state.model}
          onChange={this.onChangeModel}
          onInitData={fetchModel.onInitData}
          onSearch={fetchModel.onSearch}
        />
      </FilterCard>
    );
  }
}

export default OfferRequestsFilters;
