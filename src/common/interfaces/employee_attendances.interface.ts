import { IApp_User } from './app_users.interface';
import { IBase } from './base.interface';
import { IEmployee } from './employees.interface';
import { IPagination } from './pagination.interface';

export interface IEmployee_Attendance extends IBase {
  date?: Date;
  actual_check_in_time?: string;
  actual_check_out_time?: string;
  onsite_or_remote?: boolean;
  actual_work_details?: string;
  manager_approval_status?: boolean;
  manager_approval_remarks?: string;
  check_in_ip?: string;
  check_out_ip?: string;
  check_in_device_id?: string;
  check_out_device_id?: string;
  tutor_id?: number;
  employee_id?: number;
  manager_approval_user_id?: number;
  work_day_type_id?: number;
  manager_approval_user?: IApp_User;
  employee?: IEmployee;
}

export interface IEmployee_Attendances extends IPagination {
  data: IEmployee_Attendance[];
}
