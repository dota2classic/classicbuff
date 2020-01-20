import { Entity, Field } from "./models";

export interface IRepository<T extends Entity> {
  name: string;
  fields: Field<T>[];

  getAll(pageable?: Partial<Pageable<T>>): Promise<Page<T>>;

  getOne(id: string): Promise<T>;
}

export interface Page<T extends Entity> {
  data: T[];
}

export interface Pageable<T extends Entity> {
  page: number;
  size: number;
  order: Order<T>[];
  filters: Filter<T>[];
}

export interface Order<T extends Entity> {
  field: Field<T>;
  direction?: "asc" | "desc";
}

export type Filter<T extends Entity> = {
  field: Field<T>;

  comp:
    | "eq" // точное соответствие
    | "gte" // больше или равно
    | "in" // вхождение в список
    | "lte" // меньше или равно
    | "contains" // совпадение
    | "ftsearch"; // неточное совпадение с сортировкой по релевантности

  value: number | string | string[];
};
