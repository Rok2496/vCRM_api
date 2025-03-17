import { IApp_Role_Permission } from './app_role_permissions.interface';
import { IApp_User_Role } from './app_user_roles.interface';
import { IBase } from './base.interface';
import { IPagination } from './pagination.interface';

export interface IApp_Role extends IBase {
  name?: string;
  description?: string;
  app_user_roles?: IApp_User_Role[];
  app_role_permissions?: IApp_Role_Permission[];
}

export interface IApp_Roles extends IPagination {
  data: IApp_Role[];
}
