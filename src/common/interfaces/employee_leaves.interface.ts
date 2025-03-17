import { IApp_User } from './app_users.interface';
import { IBase } from './base.interface';
import { IEmployee } from './employees.interface';
import { IPagination } from './pagination.interface';

export interface IEmployee_Leave extends IBase {
  start_date?: Date;
  end_date?: Date;
  reason?: string;
  approved_or_declined?: boolean;
  manager_approval_status?: boolean;
  manager_approval_remarks?: string;
  master_employee_leave_type_id?: number;
  tutor_id?: number;
  employee_id?: number;
  approved_by_manager_user_id?: number;
  approved_by_manager_user?: IApp_User;
  employee?: IEmployee;
}

export interface IEmployee_Leaves extends IPagination {
  data: IEmployee_Leave[];
}
