import React from "react";
import OfferRequestTable from "./OfferRequestsTable";
import data from "./offer-requests-data.json";
import { action } from "@storybook/addon-actions";

export default {
  title: "Containers/Offer Request Table",

  parameters: {
    component: OfferRequestTable
  }
};

export const all = () => <OfferRequestTable data={data} loadMore={action("Load More")} />;
