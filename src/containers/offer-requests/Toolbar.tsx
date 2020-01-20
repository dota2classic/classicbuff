import ToolbarSortBy from "components/Toolbar/ToolbarSortedBy";
import Divider from "components/Divider/Divider";
import Button from "components/Button/Button";
import { Icon } from "components/Icon";
import Toolbar from "components/Toolbar/Toolbar";
import * as React from "react";
import store from "./service/store";
import { observer } from "mobx-react";
import uiStore from "../../service/uiStore";

@observer
export class OfferRequestsToolbar extends React.Component {
  render() {
    return (
      <Toolbar title="Запросы">
        <ToolbarSortBy data={store.order.fields} value={store.order.value} onChange={store.changeOrder} />
        <Divider vertical />
        <Button
          type="tertiary"
          text="Фильтры"
          iconLeft={<Icon name={store.filter.length ? "filter-active" : "filter"} />}
          onClick={uiStore.openFilters}
        />
      </Toolbar>
    );
  }
}

export default OfferRequestsToolbar;
