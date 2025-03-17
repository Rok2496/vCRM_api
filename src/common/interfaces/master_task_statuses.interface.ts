import { IBase } from './base.interface';
import { IPagination } from './pagination.interface';
import { ITask_Event } from './task_events.interface';

export interface IMaster_Task_Status extends IBase {
  name?: string;
  color_code?: string;
  sequence?: number;
  task_events?: ITask_Event[];
}

export interface IMaster_Task_Statuses extends IPagination {
  data: IMaster_Task_Status[];
}
