import { IApp_User } from './app_users.interface';
import { IBase } from './base.interface';
import { IPagination } from './pagination.interface';

export interface IMaster_User_Sign_And_Opt_Out_Link extends IBase {
  signature?: string;
  photo?: string;
  opt_out_message?: string;
  opt_out_link?: string;
  user_id?: number;
  user?: IApp_User;
}

export interface IMaster_User_Sign_And_Opt_Out_Links extends IPagination {
  data: IMaster_User_Sign_And_Opt_Out_Link[];
}
