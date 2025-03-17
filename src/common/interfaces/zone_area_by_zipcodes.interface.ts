import { IBase } from './base.interface';
import { IPagination } from './pagination.interface';
import { IZone } from './zones.interface';

export interface IZone_Area_By_Zipcode extends IBase {
  city_name?: string;
  zip_code?: string;
  zip_code_id?: number;
  zone?: IZone;
  zone_id?: number;
}

export interface IZone_Area_By_Zipcodes extends IPagination {
  data: IZone_Area_By_Zipcode[];
}
