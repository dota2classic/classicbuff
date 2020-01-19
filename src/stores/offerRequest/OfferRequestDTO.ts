import { Entity } from "../../service/api/model";

export interface OfferRequestDTO extends Entity {
  id: string;
  code: string;
  date: string;
  agent: string;
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
