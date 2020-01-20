import * as React from "react";
import Accordion from "components/Accordion/Accordion";
import SearchInput from "components/forms/SearchInput/SearchInput";
import FinderContainer from "containers/common/filters/Finder/FinderContainer";
import FilterCard from "components/FilterCard/FilterCard";
import { handleKeyDown, KeyName } from "utils/hooks";
import { brandRepository } from "../../entities/Brand";

export const OfferRequestsFilters = () => {
  const [brand, onChangeBrand] = React.useState<{ [key: string]: string }>({});
  const [model, onChangeModel] = React.useState<{ [key: string]: string }>({});

  handleKeyDown(KeyName.ESC, () => alert("close filters"));

  return (
    <FilterCard show={true} onClear={() => alert("clear all")} onClose={() => alert("close filters")}>
      <Accordion title="Дата создания">
        <input type="date" />
        <input type="date" />
      </Accordion>

      <Accordion title="Клиент">
        <SearchInput placeholder="Наименование" />
      </Accordion>

      <FinderContainer title="Марка" values={brand} onChange={onChangeBrand} onInitData={} onSearch={} />

      <FinderContainer
        title="Модель"
        field="asset_model"
        values={model}
        onChange={onChangeModel}
        repository={brandRepository}
      />
    </FilterCard>
  );
};

export default OfferRequestsFilters;
