import React from "react";
import OfferRequestTable from "./OfferRequestsTable";
import data from "./offer-requests-data.json";

export default {
  title: "Containers/Offer Request Table",

  parameters: {
    component: OfferRequestTable
  }
};

export const all = () => <OfferRequestTable data={data} />;
