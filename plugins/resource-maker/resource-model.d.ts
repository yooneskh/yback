// deno-lint-ignore-file no-explicit-any

import { ObjectId } from '../../deps.ts';


export interface IResourceBase {
  _id: ObjectId;
  createdAt: number;
  updatedAt: number;
}

export interface IResourceProperty {
  type: 'string' | 'number' | 'boolean' | 'series' | 'object';
  array?: boolean;
  ref?: string;
  required?: boolean;
  default?: any;
  enum?: any[];
  /* series */
  seriesIdentifier?: string;
  seriesLoopTo?: string;
  seriesBase?: Record<string, unknown>;
  seriesSchema?: IResourceProperties<any, any>;
  itemWidth?: number;
  /* meta */
  vIf?: any;
  title?: string;
  titleable?: boolean;
  items?: string[] | { value: string, text: string }[];
  itemValue?: string;
  itemText?: string;
  width?: number;
  variants?: Record<string, Partial<IResourceProperty>>;
  dir?: string;
  hideInTable?: boolean;
  hidden?: boolean;
  longText?: boolean;
  richText?: boolean;
  geo?: 'point';
  defaultCenter?: [longitude: number, latitude: number];
  defaultZoom?: number;
  /* temporary */
  nonCreating?: boolean;
}

export type IResourceProperties<T, TF> = {
  [key in keyof T] -?: IResourceProperty;
}
