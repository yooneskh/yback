import { IResourceBase } from '../../plugins/resource-maker/resource-model.d.ts';


export interface IUserBase {
  name: string;
  phoneNumber: string;
} export interface IUser extends IUserBase, IResourceBase {}