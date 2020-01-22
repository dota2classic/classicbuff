import React from "react";
import store from "./service/store";
import { observer } from "mobx-react";
import OfferRequestTable from "./Table/OfferRequestsTable";

@observer
export class OfferRequestsContainer extends React.Component {
  async componentDidMount() {
    await store.loadFirstPage();
  }

  render() {
    return (
      <OfferRequestTable data={store.data} loading={store.loading} hasNext={store.hasNext} loadMore={store.loadNext} />
    );
  }
}

export default OfferRequestsContainer;
