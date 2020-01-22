import React from "react";
import store from "./service/store";
import { observer } from "mobx-react";
import OfferRequestTable from "./Table/OfferRequestsTable";
import LoaderBlock from "../../components/Loader/LoaderBlock";

@observer
export class OfferRequestsContainer extends React.Component {
  async componentDidMount() {
    await store.loadFirstPage();
  }

  render() {
    return (
      <LoaderBlock loading={store.loading} marginTop={37}>
        <OfferRequestTable
          data={store.data}
          loading={store.loading}
          hasNext={store.hasNext}
          loadMore={store.loadNext}
        />
      </LoaderBlock>
    );
  }
}

export default OfferRequestsContainer;
