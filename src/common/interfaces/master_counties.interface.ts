import { IBase } from './base.interface';
import { IMaster_City } from './master_cities.interface';
import { IMaster_Country } from './master_countries.interface';
import { IMaster_State } from './master_states.interface';
import { IMaster_Zip_Code } from './master_zip_codes.interface';
import { IPagination } from './pagination.interface';

export interface IMaster_County extends IBase {
  name?: string;
  master_country?: IMaster_Country;
  master_country_id?: number;
  master_state_id?: number;
  master_state?: IMaster_State;
  master_cities?: IMaster_City[];
  master_zip_codes?: IMaster_Zip_Code[];
}

export interface IMaster_Counties extends IPagination {
  data: IMaster_County[];
}
