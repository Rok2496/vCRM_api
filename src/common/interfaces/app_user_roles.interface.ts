import { IApp_Role } from './app_roles.interface';
import { IApp_User } from './app_users.interface';
import { IBase } from './base.interface';
import { IPagination } from './pagination.interface';

export interface IApp_User_Role extends IBase {
  user?: IApp_User;
  role?: IApp_Role;
  user_id?: number;
  role_id?: number;
  assigned_date?: Date;
}

export interface IApp_User_Roles extends IPagination {
  data: IApp_User_Role[];
}
