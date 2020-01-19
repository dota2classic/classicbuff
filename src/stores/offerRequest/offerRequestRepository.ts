import { OfferRequestDTO } from "./OfferRequestDTO";
import { Page, Pageable } from "../../service/Repository";
import api from "../../service/api/api";

export class OfferRequestRepository {
  public async getAll(pageable: Pageable): Promise<Page<OfferRequestDTO>> {
    const response = await api.core.directoryList({
      directories: [
        {
          name: "offer_requests.OfferRequests",
          fields: [
            "agent",
            "code",
            "date",
            "asset_cost",
            "asset_count",
            "asset_cost_currency",
            "lessee_legal_id",
            "lessee_description",
            "leasing_term_month",
            "asset_brand",
            "asset_model",
            "assets",
            "leasing_payments_schedule_type"
          ],
          page: pageable.current,
          page_size: pageable.size,
          order: pageable.sort
        }
      ]
    });

    if (!response.ok) {
      // todo:
      throw Error("");
    }

    return response.data as Page<OfferRequestDTO>;
  }

  public async getOne(id: string): Promise<OfferRequestDTO> {
    const response = await api.core.item.get("offer_requests.OfferRequests", id);

    if (!response.ok) {
      // todo:
      throw Error("");
    }

    return response.data as OfferRequestDTO;
  }
}

export default new OfferRequestRepository();
