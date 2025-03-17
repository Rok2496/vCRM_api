import { IBase } from './base.interface';
import { IEmployee } from './employees.interface';
import { IMaster_Task_Status } from './master_task_statuses.interface';
import { IPagination } from './pagination.interface';
import { ITask_Document } from './task_documents.interface';
import { ITask_Note } from './task_notes.interface';

export interface ITask_Event extends IBase {
  task_or_event?: boolean;
  name?: string;
  description?: string;
  start_date_time?: Date;
  end_date_time?: Date;
  estimated_time_in_hours?: number;
  actual_time_in_hours?: number;
  save_as_template?: boolean;
  master_task_status?: IMaster_Task_Status;
  employee?: IEmployee;
  employee_id?: number;
  master_task_status_type_id?: number;
  task_documents?: ITask_Document[];
  task_notes?: ITask_Note[];
}

export interface ITask_Events extends IPagination {
  data: ITask_Event[];
}
