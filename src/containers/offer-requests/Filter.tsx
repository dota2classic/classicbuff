import * as React from "react";
import Accordion from "components/Accordion/Accordion";
import SearchInput from "components/forms/SearchInput/SearchInput";
import FinderContainer from "containers/common/filters/Finder/FinderContainer";
import FilterCard from "components/FilterCard/FilterCard";
import { handleKeyDown, KeyName } from "utils/hooks";
import { brandRepository } from "../../entities/Brand";
import { modelRepository } from "../../entities/Model";
import uiStore from "../../service/uiStore";
import offerRequestStore from "./service/store";

export const OfferRequestsFilters = () => {
  const [brand, onChangeBrand] = React.useState<{ [key: string]: string }>({});
  const [model, onChangeModel] = React.useState<{ [key: string]: string }>({});

  handleKeyDown(KeyName.ESC, () => alert("close filters"));

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
          filters: [{ field: "description", comp: "contains", value: query }]
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
          filters: [{ field: "description", comp: "contains", value: query }]
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
        values={brand}
        onChange={onChangeBrand}
        onInitData={fetchBrand.onInitData}
        onSearch={fetchBrand.onSearch}
      />

      <FinderContainer
        title="Модель"
        values={model}
        onChange={onChangeModel}
        onInitData={fetchModel.onInitData}
        onSearch={fetchModel.onSearch}
      />
    </FilterCard>
  );
};

export default OfferRequestsFilters;
