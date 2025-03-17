import { IApp_User } from './app_users.interface';
import { IBase } from './base.interface';
import { IPagination } from './pagination.interface';
import { ITask_Event } from './task_events.interface';

export interface ITask_Note extends IBase {
  notes?: string;
  creation_time?: Date;
  creator_user?: IApp_User;
  task_event?: ITask_Event;
  task_event_id?: number;
  creator_user_id?: number;
}

export interface ITask_Notes extends IPagination {
  data: ITask_Note[];
}
