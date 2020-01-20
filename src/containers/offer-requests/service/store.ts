import { EntityStore } from "service/entity/EntityStore";
import { OrderDescriptor, OrderStore } from "service/OrderStore";
import { PageableEntityStore } from "service/entity/PageableEntityStore";
import { FilterStore } from "service/FilterStore";
import { OfferRequestDTO, offerRequestRepository } from "entities/OfferRequest";

const SORT_FIELDS: OrderDescriptor<OfferRequestDTO>[] = [
  { field: "code", label: "по номеру", directional: "bi" },
  { field: "date", label: "по дате", directional: "bi" },
  { field: "asset_cost", label: "по стоимости", directional: "bi" }
];

const offerRequestStore = new PageableEntityStore<OfferRequestDTO>(
  new OrderStore<OfferRequestDTO>(SORT_FIELDS),
  new FilterStore<OfferRequestDTO>(),
  new EntityStore<OfferRequestDTO>(),
  offerRequestRepository
);

export default offerRequestStore;
