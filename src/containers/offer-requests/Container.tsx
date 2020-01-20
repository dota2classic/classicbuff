import React from "react";
import OfferRequestTable from "components/tables/OfferRequestsTable/OfferRequestsTable";
import store from "./service/store";
import { observer } from "mobx-react";

@observer
export class OfferRequestsContainer extends React.Component {
  async componentDidMount() {
    await store.loadFirstPage();
  }

  render() {
    return <OfferRequestTable data={store.data} loading={store.loading} hasNext={store.hasNext} />;
  }
}

export default OfferRequestsContainer;
