import { IBase } from './base.interface';
import { IGroup_Member } from './group_members.interface';
import { IGroup } from './groups.interface';
import { IPagination } from './pagination.interface';

export interface IGroupMessage extends IBase {
  message?: string;
  message_date_time?: Date;
  message_from_crm_group_member_id?: string;
  message_to?: string;
  message_status_sent?: boolean;
  message_attachment?: string;
  message_attachment_type?: string;
  message_attachment_size?: string;
  master_email_sms_template_id?: number;
  group_member_id?: number;
  group_id?: number;
  group?: IGroup;
  group_member?: IGroup_Member;
}

export interface IGroupMessages extends IPagination {
  data: IGroupMessage[];
}
