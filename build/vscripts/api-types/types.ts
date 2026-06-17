import { Type } from '../api/types';

export type Declaration = Primitive | Nominal | ApiObject;

export interface Primitive {
  kind: 'primitive';
  name: string;
  description?: string;
}

export interface Nominal {
  kind: 'nominal';
  name: string;
  description?: string;
  baseType: string;
}

export interface ApiObject {
  kind: 'object';
  name: string;
  description?: string;
  extend?: string[];
  fields: ObjectField[];
}

export interface ObjectField {
  name: string;
  description?: string;
  types: Type[];
}
