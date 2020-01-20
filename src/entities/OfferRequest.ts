import { Entity } from "../service/models";
import { EntityRepository } from "../service/entity/EntityRepository";

export interface OfferRequestDTO extends Entity {
  id: string;
  code: string;
  date: string;
  agent: string;
  comment: string | null;
  lessee_legal_id: string;
  lessee_description: string;
  asset_brand: string;
  asset_model: string;
  asset_count: number;
  asset_cost: string;
  asset_cost_currency: string;
  assets: string;
  leasing_term_month: number;
  leasing_payments_schedule_type: string;
}

export const offerRequestRepository = EntityRepository.createFromMeta<OfferRequestDTO>({
  name: "offer_requests.OfferRequests",
  sample: {
    id: "edbcb37d-7173-4138-99e0-bca3bbb9f7f9",
    code: "00003-00000001",
    date: "2019-06-20T14:52:51Z",
    agent: "agents.agents/8c1ee32c-ca24-45e8-b104-e5d1cedb5f6f",
    comment: null,
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
  }
});
