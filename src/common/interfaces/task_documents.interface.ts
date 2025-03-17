import { IBase } from './base.interface';
import { IPagination } from './pagination.interface';
import { ITask_Event } from './task_events.interface';

export interface ITask_Document extends IBase {
  name?: string;
  file_binary_object_id?: string;
  task_event_id?: number;
  task_event?: ITask_Event;
}

export interface ITask_Documents extends IPagination {
  data: ITask_Document[];
}
