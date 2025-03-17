import { IBase } from './base.interface';
import { IMaster_County } from './master_counties.interface';
import { IMaster_Country } from './master_countries.interface';
import { IMaster_State } from './master_states.interface';
import { IPagination } from './pagination.interface';

export interface IMaster_Zip_Code extends IBase {
  name?: string;
  master_country_id?: number;
  master_state_id?: number;
  master_county_id?: number;
  master_country?: IMaster_Country;
  master_state?: IMaster_State;
  master_county?: IMaster_County;
}

export interface IMaster_Zip_Codes extends IPagination {
  data: IMaster_Zip_Code[];
}
