import { IApp_Permission } from './app_permissions.interface';
import { IApp_Role } from './app_roles.interface';
import { IBase } from './base.interface';
import { IPagination } from './pagination.interface';

export interface IApp_Role_Permission extends IBase {
  role?: IApp_Role;
  feature?: IApp_Permission;
  role_id?: number;
  feature_id?: number;
}

export interface IApp_Role_Permissions extends IPagination {
  data: IApp_Role_Permission[];
}
