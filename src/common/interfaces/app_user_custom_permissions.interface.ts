import { IApp_Permission } from './app_permissions.interface';
import { IApp_User } from './app_users.interface';
import { IBase } from './base.interface';
import { IPagination } from './pagination.interface';

export interface IApp_User_Custom_Permission extends IBase {
  user?: IApp_User;
  permission?: IApp_Permission;
  user_id?: number;
  permission_id?: number;
  access_level?: string;
  assigned_date?: Date;
}

export interface IApp_User_Custom_Permissions extends IPagination {
  data: IApp_User_Custom_Permission[];
}
