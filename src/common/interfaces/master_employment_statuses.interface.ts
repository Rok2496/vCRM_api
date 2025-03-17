import { IBase } from './base.interface';
import { IPagination } from './pagination.interface';

export interface IMaster_Employment_Status extends IBase {
  name?: string;
  description?: string;
}

export interface IMaster_Employment_Statuses extends IPagination {
  data: IMaster_Employment_Status[];
}
