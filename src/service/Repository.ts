export interface Page<T> {
  data: T[];
  page: number;
  totalPages: number;
}

export interface Sort {
  field: string;
  order: "asc" | "desc";
}

export interface Pageable {
  current: number;
  size: number;
  sort: Sort[];
}
