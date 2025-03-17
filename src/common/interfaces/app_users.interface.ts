import { App_Roles } from 'src/models';
import { IApp_Notification } from './app_notifications.interface';
import { IApp_User_Custom_Permission } from './app_user_custom_permissions.interface';
import { IApp_User_Role } from './app_user_roles.interface';
import { IBase } from './base.interface';
import { IContact } from './contacts.interface';
import { IEmployee_Attendance } from './employee_attendances.interface';
import { IEmployee_Leave } from './employee_leaves.interface';
import { IEmployee } from './employees.interface';
import { IGroup_Member } from './group_members.interface';
import { IGroup } from './groups.interface';
import { IMaster_Country } from './master_countries.interface';
import { IPagination } from './pagination.interface';
import { ITask_Note } from './task_notes.interface';
import { IZone_Account_Team } from './zone_account_teams.interface';
import { IZone } from './zones.interface';

export interface IApp_User extends IBase {
  is_super_admin?: boolean;
  username?: string;
  password_hash?: string;
  first_name?: string;
  last_name?: string;
  email?: string;
  phone_number?: string;
  active_or_archive?: boolean;
  email_confirmed?: boolean;
  phone_number_confirmed?: boolean;
  two_factor_enabled?: boolean;
  lockout_enabled?: boolean;
  access_failed_count?: number;
  lockout_end?: Date;
  security_stamp?: string;
  profile_picture?: string;
  profile_picture_url?: string;
  profile_picture_thumbnail_url?: string;
  whatsapp_subscribed?: boolean;
  email_subscribed?: boolean;
  sms_subscribed?: boolean;
  zone_id?: number;
  student_id?: number;
  tutor_id?: number;
  institute_id?: number;
  employee_id?: number;
  master_country_id?: number;
  primary_role_id?: number;
  master_country?: IMaster_Country;
  zone?: IZone;
  employee?: IEmployee;
  primary_role?: App_Roles;

  // External Relations:
  app_user_roles?: IApp_User_Role[];
  app_user_custom_permissions?: IApp_User_Custom_Permission[];
  app_notifications?: IApp_Notification[];
  zone_account_teams: IZone_Account_Team[];
  task_notes: ITask_Note[];
  employees: IEmployee[];
  manager_approval_employee_attendances: IEmployee_Attendance[];
  manager_approval_employee_leaves: IEmployee_Leave[];
  verified_contacts: IContact[];
  groups: IGroup[];
  group_members: IGroup_Member[];
}

export interface IApp_Users extends IPagination {
  data: IApp_User[];
}
