import { IRepository, Page, Pageable } from "../Repository";
import api from "../api/api";
import { Entity, EntityMeta, Field } from "../models";

export class EntityRepository<T extends Entity> implements IRepository<T> {
  name: string;
  fields: Field<T>[];

  constructor(name: string, fields: Field<T>[]) {
    this.name = name;
    this.fields = fields;
  }

  static createFromMeta<T extends Entity>(meta: EntityMeta<T>): EntityRepository<T> {
    return new this(meta.name, Object.keys(meta.sample) as Field<T>[]);
  }

  async getAll(pageable: Partial<Pageable<T>> = {}) {
    try {
      const request = {
        name: this.name,
        fields: this.fields,
        page: pageable.page || 1,
        page_size: pageable.size || 10,
        order: pageable.order || [],
        filters: pageable.filters?.map(it => {
          if (typeof it.value === "object") {
            return { ...it, value: Object.keys(it.value) };
          }
          return it;
        })
      };

      const response = await api.core.directoryList(request);
      if (!response.ok) {
        console.log("bad response", response);
        // todo:
        throw Error("");
      }

      const data = response.data as any;

      return {
        data: data[request.name].values,
        representations: data.reference_repr
      } as Page<T>;
    } catch (e) {
      console.error(e);
    }

    return { data: [] };
  }

  async getOne(id: string) {
    const response = await api.core.item.get(this.name, id);

    if (!response.ok) {
      // todo:
      throw Error("");
    }

    return response.data as T;
  }
}
