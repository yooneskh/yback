// deno-lint-ignore-file no-explicit-any

import { ObjectId } from '../../deps.ts';


export interface IResourceBase {
  _id: typeof ObjectId;
  createdAt: number;
  updatedAt: number;
}

export interface IResourceProperty {
  type: 'string' | 'number' | 'boolean' | 'series';
  array?: boolean;
  ref?: string;
  required?: boolean;
  default?: any;
  enum?: any[];
  seriesIdentifier?: string;
  seriesLoopTo?: string;
  seriesBase?: Record<string, unknown>;
  seriesSchema?: IResourceProperties<any, any>;
  // meta
  title?: string;
  titleable?: boolean;
  items?: string[] | { value: string, text: string }[];
  itemValue?: string;
  itemText?: string;
}

export type IResourceProperties<T, TF> = {
  [key in keyof T] -?: IResourceProperty;
}
