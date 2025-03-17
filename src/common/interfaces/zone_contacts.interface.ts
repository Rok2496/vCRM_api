import { IBase } from './base.interface';
import { IPagination } from './pagination.interface';
import { IZone } from './zones.interface';

export interface IZone_Contact extends IBase {
  contact?: number;
  zone?: IZone;
  display_score?: number;
  // Note: Self Relation
  // zone_contacts?: IZone_Contacts[];
}

export interface IZone_Contacts extends IPagination {
  data: IZone_Contact[];
}
