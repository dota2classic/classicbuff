export interface Entity {
  id: string;
}

export type EntityMeta<T extends Entity> = { name: string; sample: T };

export type Field<T extends Entity> = keyof T;
