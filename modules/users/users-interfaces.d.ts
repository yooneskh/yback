import type { IResourceBase } from '../../plugins/resource-maker/resource-model.d.ts';


export interface IUserBase<PT = string> {
  name: string;
  phoneNumber: string;
  profile?: PT;
  email?: string;
} export interface IUser<PT = string> extends IUserBase<PT>, IResourceBase {}
