import { IApp_User } from './app_users.interface';
import { IBase } from './base.interface';
import { IPagination } from './pagination.interface';

export interface IApp_Notification extends IBase {
  user?: IApp_User;
  user_id?: number;
  title?: string;
  message?: string;
  is_read?: boolean;
}

export interface IApp_Notifications extends IPagination {
  data: IApp_Notification[];
}
