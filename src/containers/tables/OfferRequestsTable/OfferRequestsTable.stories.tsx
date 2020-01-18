import React from "react";
import OfferRequestTable, { OfferRequestsDTO } from "./OfferRequestsTable";

export default {
  title: "Containers/Offer Request Table",

  parameters: {
    component: OfferRequestTable
  }
};

const data: OfferRequestsDTO[] = [
  {
    id: "edbcb37d-7173-4138-99e0-bca3bbb9f7f9",
    code: "00003-00000001",
    date: "2019-06-20T14:52:51Z",
    agent: "agents.agents/8c1ee32c-ca24-45e8-b104-e5d1cedb5f6f",
    lessee_legal_id: "",
    lessee_description: "",
    asset_brand: "assets.brands/46aa8e6f-7fa3-4228-969a-f3c3d4d0841d",
    asset_model: "assets.models/748ead62-1e80-4905-9894-d2fffe8f4de3",
    asset_count: 1,
    asset_cost: "230800.00",
    asset_cost_currency: "common.currencies/ee322eff-7c40-4e46-95cd-77cd7343e875",
    assets: "Suzuki Baleno",
    leasing_term_month: 30,
    leasing_payments_schedule_type: "offer_requests.scheduletypes/increasing"
  },
  {
    id: "28bd65cc-d99a-43e9-9fac-1bf4bd21a8b7",
    code: "00003-00000002",
    date: "2019-07-04T15:54:05Z",
    agent: "agents.agents/8c1ee32c-ca24-45e8-b104-e5d1cedb5f6f",
    lessee_legal_id: "",
    lessee_description: "",
    asset_brand: "assets.brands/b2fd5622-514f-4ba7-8496-a00acbe40b9b",
    asset_model: "assets.models/13d93839-f513-45c9-88c0-68a9eb95839a",
    asset_count: 4,
    asset_cost: "15327600.00",
    asset_cost_currency: "common.currencies/ee322eff-7c40-4e46-95cd-77cd7343e875",
    assets: "Cadillac STS-V",
    leasing_term_month: 26,
    leasing_payments_schedule_type: "offer_requests.scheduletypes/uniform"
  }
];

export const all = () => <OfferRequestTable data={data} />;
