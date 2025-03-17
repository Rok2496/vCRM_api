import { IBase } from './base.interface';
import { IPagination } from './pagination.interface';
import { IZone } from './zones.interface';

export interface IMaster_Zone_Type extends IBase {
  name?: string;
  zones?: IZone[];
}

export interface IMaster_Zone_Types extends IPagination {
  data: IMaster_Zone_Type[];
}
