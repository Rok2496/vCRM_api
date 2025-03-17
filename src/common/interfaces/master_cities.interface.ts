import { IBase } from './base.interface';
import { IMaster_County } from './master_counties.interface';
import { IMaster_Country } from './master_countries.interface';
import { IMaster_State } from './master_states.interface';
import { IPagination } from './pagination.interface';

export interface IMaster_City extends IBase {
  name?: string;
  master_country?: IMaster_Country;
  master_state?: IMaster_State;
  master_county?: IMaster_County;
  master_country_id?: number;
  master_state_id?: number;
  master_county_id?: number;
}

export interface IMaster_Cities extends IPagination {
  data: IMaster_City[];
}
