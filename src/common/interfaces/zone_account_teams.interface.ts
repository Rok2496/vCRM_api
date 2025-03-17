import { IApp_User } from './app_users.interface';
import { IBase } from './base.interface';
import { IEmployee } from './employees.interface';
import { IPagination } from './pagination.interface';
import { IZone } from './zones.interface';

export interface IZone_Account_Team extends IBase {
  name?: string;
  primary_manager?: boolean;
  start_date?: Date;
  end_date?: Date;
  live_or_planning?: boolean;
  zone?: IZone;
  user?: IApp_User;
  employee?: IEmployee;
  employee_id?: number;
  user_id?: number;
  zone_id?: number;
}

export interface IZone_Account_Teams extends IPagination {
  data: IZone_Account_Team[];
}
