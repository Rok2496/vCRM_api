import { IApp_Role_Permissions } from './app_role_permissions.interface';
import { IApp_User_Custom_Permissions } from './app_user_custom_permissions.interface';
import { IBase } from './base.interface';
import { IPagination } from './pagination.interface';

export interface IApp_Permission extends IBase {
  name?: string;
  description?: string;
  app_role_permissions?: IApp_Role_Permissions[];
  app_user_custom_permissions?: IApp_User_Custom_Permissions[];
}

export interface IApp_Permissions extends IPagination {
  data: IApp_Permission[];
}
