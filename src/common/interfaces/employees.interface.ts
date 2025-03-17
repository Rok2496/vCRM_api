import { IApp_User } from './app_users.interface';
import { IBase } from './base.interface';
import { ICampaign_Team } from './campaign_teams.interface';
import { ICampaign } from './campaigns.interface';
import { IEmployee_Attendance } from './employee_attendances.interface';
import { IEmployee_Leave } from './employee_leaves.interface';
import { IEmployee_Tag } from './employee_tags.interface';
import { IGroup_Member } from './group_members.interface';
import { IMaster_Country } from './master_countries.interface';
import { IMaster_State } from './master_states.interface';
import { IPagination } from './pagination.interface';
import { ITask_Event } from './task_events.interface';
import { IZone_Account_Team } from './zone_account_teams.interface';
import { IZone } from './zones.interface';

export interface IEmployee extends IBase {
  name: string;
  first_name: string;
  last_name: string;
  full_address: string;
  address: string;
  zip_code: string;
  city: string;
  date_of_birth: Date;
  mobile: string;
  office_phone: string;
  personal_email: string;
  business_email: string;
  employee_profile: string;
  employee_customized_job_profile: string;
  hire_date: Date;
  leave_date: Date;
  facebook: string;
  linked_in: string;
  country_code: string;
  remote_employee: boolean;
  current_or_former_employee: boolean;
  profile_picture_id: string;
  tutor_id: number;
  employee_master_job_title_id: number;
  employee_master_department_id: number;
  user_id: number;
  state_id: number;
  country_id: number;
  country: IMaster_Country;
  state: IMaster_State;
  user: IApp_User;
  task_events: ITask_Event[];
  zone_account_teams: IZone_Account_Team[];
  employee_tags: IEmployee_Tag[];
  rated_by_employee_tags: IEmployee_Tag[];
  employee_attendances: IEmployee_Attendance[];
  employee_leaves: IEmployee_Leave[];
  group_members: IGroup_Member[];
  managed_campaigns: ICampaign[];
  campaign_teams: ICampaign_Team[];
  manager_employee_zones: IZone[];
  app_users: IApp_User[];
}

export interface IEmployees extends IPagination {
  data: IEmployee[];
}
