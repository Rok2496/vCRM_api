import { IApp_User } from './app_users.interface';
import { IBase } from './base.interface';
import { IGroup_Member } from './group_members.interface';
import { IGroupMessage } from './group_messages.interface';
import { IPagination } from './pagination.interface';

export interface IGroup extends IBase {
  group_name?: string;
  group_description?: string;
  group_type?: string;
  number_of_members?: number;
  create_by_user_id?: number;
  created_by_user?: IApp_User;
  group_members?: IGroup_Member[];
  group_messages?: IGroupMessage[];
}

export interface IGroups extends IPagination {
  data: IGroup[];
}
