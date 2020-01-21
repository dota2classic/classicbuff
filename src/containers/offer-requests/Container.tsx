import React from "react";
import OfferRequestTable from "components/tables/OfferRequestsTable/OfferRequestsTable";
import store from "./service/store";
import { observer } from "mobx-react";

@observer
export class OfferRequestsContainer extends React.Component {
  render() {
    return (
      <OfferRequestTable data={store.data} loading={store.loading} hasNext={store.hasNext} loadMore={store.loadMore} />
    );
  }
}

export default OfferRequestsContainer;
