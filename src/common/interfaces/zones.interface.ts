import { IApp_User } from './app_users.interface';
import { IBase } from './base.interface';
import { IEmployee } from './employees.interface';
import { IMaster_Country } from './master_countries.interface';
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
  estimated_population?: number;
  has_parent_zone?: boolean;
  parent_zone_id?: number;
  parent_zone?: IZone;
  latitude?: number;
  longitude?: number;
  live_or_planning?: boolean;
  custom_url?: string;
  zone_office_address?: string;
  partner_or_corporate?: boolean;
  phone?: string;
  projected_yearly_revenue?: number;
  sequence?: number;
  company_stats?: number;
  contact_stats?: number;
  institute_stats?: number;
  job_stats?: number;
  store_stats?: number;
  student_stats?: number;
  manager_employee_id?: number;
  zone_type_id?: number;
  state_id?: number;
  country_id?: number;
  manager_employee?: IEmployee;
  zone_type?: IMaster_Zone_Type;
  state?: IMaster_State;
  country?: IMaster_Country;
  zone_area_by_zipcodes?: IZone_Area_By_Zipcode[];
  zone_account_teams?: IZone_Account_Team[];
  zone_companies?: IZone_Company[];
  zone_contacts?: IZone_Contact[];
  app_users?: IApp_User[];
}

export interface IZones extends IPagination {
  data: IZone[];
}
