import { IApp_User } from './app_users.interface';
import { IBase } from './base.interface';
import { IEmployee } from './employees.interface';
import { IMaster_Country } from './master_countries.interface';
import { IMaster_County } from './master_counties.interface';
import { IMaster_State } from './master_states.interface';
import { IMaster_Zone_Type } from './master_zone_types.interface';
import { IPagination } from './pagination.interface';
import { IZone_Account_Team } from './zone_account_teams.interface';
import { IZone_Area_By_Zipcode } from './zone_area_by_zipcodes.interface';
import { IZone_Company } from './zone_companies.interface';
import { IZone_Contact } from './zone_contacts.interface';

export interface IZone extends IBase {
  name?: string;
  description?: string;
  has_parent_zone?: boolean;
  latitude?: number;
  longitude?: number;
  office_address?: string;
  elected_official_name?: string;
  elected_official_title?: string;
  phone?: string;
  email?: string;
  website?: string;
  sequence?: number;
  population_stats?: number;
  contact_stats?: number;
  business_stats?: number;
  democrates_voter_stats?: number;
  republican_voter_stats?: number;
  independent_voter_stats?: number;
  active_voter_stats?: number;
  zone_image?: string;
  country_id?: number;
  country?: IMaster_Country;
  state_id?: number;
  state?: IMaster_State;
  county_id?: number;
  county?: IMaster_County;
  zone_type_id?: number;
  zone_type?: IMaster_Zone_Type;
  manager_employee_id?: number;
  manager_employee?: IEmployee;
  parent_zone_id?: number;
  parent_zone?: IZone;
  child_zones?: IZone[];
  zone_area_by_zipcodes?: IZone_Area_By_Zipcode[];
  zone_account_teams?: IZone_Account_Team[];
  zone_companies?: IZone_Company[];
  zone_contacts?: IZone_Contact[];
  app_users?: IApp_User[];
}

export interface IZones extends IPagination {
  data: IZone[];
}
