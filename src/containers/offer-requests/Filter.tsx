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
  fetchBrand = {
    onInitData: async () =>
      (
        await brandRepository.getAll({
          size: 10
        })
      ).data.map(it => ({ key: brandRepository.name + "/" + it.id, value: it.description })),
    onSearch: async (query: string) =>
      (
        await brandRepository.getAll({
          size: 50,
          order: [{ field: "description", direction: "asc" }],
          filters: [{ field: "description", comp: "fsearch", value: query }]
        })
      ).data.map(it => ({ key: brandRepository.name + "/" + it.id, value: it.description }))
  };
  fetchModel = {
    onInitData: async () =>
      (
        await modelRepository.getAll({
          size: 10,
          filters: offerRequestStore.filter.values["asset_brand"]
            ? [
                {
                  field: "brand",
                  comp: "in",
                  value: offerRequestStore.filter.values["asset_brand"].value
                }
              ]
            : []
        })
      ).data.map(it => ({ key: modelRepository.name + "/" + it.id, value: it.description })),
    onSearch: async (query: string) =>
      (
        await modelRepository.getAll({
          size: 50,
          order: [{ field: "description", direction: "asc" }],
          filters: offerRequestStore.filter.values["asset_brand"]
            ? [
                {
                  field: "brand",
                  comp: "in",
                  value: offerRequestStore.filter.values["asset_brand"].value
                },
                { field: "description", comp: "fsearch", value: query }
              ]
            : [{ field: "description", comp: "fsearch", value: query }]
        })
      ).data.map(it => ({ key: modelRepository.name + "/" + it.id, value: it.description }))
  };

  handleESC = (e: KeyboardEvent) => {
    if (KeyName.ESC.includes(e.key)) uiStore.closeFilters();
  };

  componentDidMount(): void {
    document.addEventListener("keydown", this.handleESC);
  }

  componentWillUnmount(): void {
    document.removeEventListener("keydown", this.handleESC);
  }

  render() {
    return (
      <FilterCard show={uiStore.filterOpened} onClear={offerRequestStore.clearFilters} onClose={uiStore.closeFilters}>
        <Accordion title="Дата создания" initialCollapsed>
          <input type="date" />
          <input type="date" />
        </Accordion>

        <Accordion title="Клиент">
          <SearchInput
            placeholder="Наименование"
            value={offerRequestStore.filter.values["lessee_description"]?.value as string | undefined}
            onChange={value => {
              if (!value) {
                offerRequestStore.removeFilter("lessee_description");
                return;
              }

              offerRequestStore.changeFilter({
                field: "lessee_description",
                comp: "fsearch",
                value: value
              });
            }}
          />
        </Accordion>

        <FinderContainer
          title="Марка"
          values={offerRequestStore.filter.values["asset_brand"]?.value as { [key: string]: string }}
          onChange={values => {
            console.log(values);

            if (Object.keys(values).length === 0) {
              offerRequestStore.removeFilter("asset_brand");
              return;
            }

            offerRequestStore.changeFilter({
              field: "asset_brand",
              comp: "in",
              value: values
            });
          }}
          onInitData={this.fetchBrand.onInitData}
          onSearch={this.fetchBrand.onSearch}
        />

        <FinderContainer
          title="Модель"
          key={
            offerRequestStore.filter.values["asset_brand"]?.value
              ? Object.keys(offerRequestStore.filter.values["asset_brand"].value).join("-")
              : "default-model"
          }
          values={offerRequestStore.filter.values["asset_model"]?.value as { [key: string]: string }}
          onChange={values => {
            if (Object.keys(values).length === 0) {
              offerRequestStore.removeFilter("asset_model");
              return;
            }

            offerRequestStore.changeFilter({
              field: "asset_model",
              comp: "in",
              value: values
            });
          }}
          onInitData={this.fetchModel.onInitData}
          onSearch={this.fetchModel.onSearch}
        />
      </FilterCard>
    );
  }
}

export default OfferRequestsFilters;
