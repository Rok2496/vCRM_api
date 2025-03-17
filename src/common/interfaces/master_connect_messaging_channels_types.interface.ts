import { IBase } from './base.interface';
import { IPagination } from './pagination.interface';

export interface IMaster_Connect_Channel extends IBase {
  name?: string;
}

export interface IMaster_Connect_Channels extends IPagination {
  data: IMaster_Connect_Channel[];
}
