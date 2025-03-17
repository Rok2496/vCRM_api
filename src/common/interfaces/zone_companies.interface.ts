import { IBase } from './base.interface';
import { IPagination } from './pagination.interface';
import { IZone } from './zones.interface';

export interface IZone_Company extends IBase {
  city_name?: string;
  zip_code?: string;
  display_score?: number;
  zone?: IZone;
  company?: number;
  zone_id?: number;
  company_id?: number;
}

export interface IZone_Companies extends IPagination {
  data: IZone_Company[];
}
