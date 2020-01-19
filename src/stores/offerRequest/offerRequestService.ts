import { action, observable } from "mobx";
import { Sort } from "service/Repository";
import offerRequestRepository, { OfferRequestRepository } from "./offerRequestRepository";
import { OfferRequestDTO } from "./OfferRequestDTO";

const PAGE_SIZE = 20;

export class OfferRequestService {
  @observable
  isLoading = true;

  @observable
  isEmpty = false;

  @observable
  isError = false;

  @observable
  page = 0;

  @observable
  hasNext = true;

  @observable
  contentIds: string[] = [];

  @observable
  contentMap: { [id: string]: OfferRequestDTO } = {};

  private offerRequestRepository: OfferRequestRepository;

  constructor(repository: OfferRequestRepository) {
    this.offerRequestRepository = repository;
  }

  @action
  public refresh = async () => {
    this.isLoading = true;

    try {
      const result = await this.offerRequestRepository.getAll({ current: this.page, size: PAGE_SIZE, sort: [] });

      this.contentIds = result.data.map(it => it.id);
      this.page = result.page;
      this.hasNext = result.data.length == PAGE_SIZE;

      this.isEmpty = this.contentIds.length == 0 && this.page == 0;
      this.isError = false;
    } catch (e) {
      this.isError = true;
    } finally {
      this.isLoading = false;
    }
  };

  @action
  public setPage = async (page: number) => {
    if (!this.hasNext) return;
    this.page = page;
    return this.refresh();
  };

  @action
  public setSort = async (sort: Sort) => {
    // if (page >= this.totalPages) return;
    // this.page = page;
    return this.refresh();
  };
}

export default new OfferRequestService(offerRequestRepository);
