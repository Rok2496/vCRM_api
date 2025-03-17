import { IApp_User } from './app_users.interface';
import { IBase } from './base.interface';
import { IContact } from './contacts.interface';
import { IEmployee } from './employees.interface';
import { IGroupMessage } from './group_messages.interface';
import { IGroup } from './groups.interface';
import { IPagination } from './pagination.interface';

export interface IGroup_Member extends IBase {
  name?: string;
  job_title?: string;
  country_code?: string;
  phone?: string;
  whatsapp?: string;
  email?: string;
  profile_picture_id?: string;
  allow_send_message?: boolean;
  group_admin?: boolean;
  active_member_or_removed?: boolean;
  student_id?: number;
  user_id?: number;
  tutor_id?: number;
  contact_id?: number;
  employee_id?: number;
  group_id?: number;
  group?: IGroup;
  employee?: IEmployee;
  contact?: IContact;
  user?: IApp_User;
  group_messages?: IGroupMessage[];
}

export interface IGroup_Members extends IPagination {
  data: IGroup_Member[];
}
