import { IApp_User } from './app_users.interface';
import { IBase } from './base.interface';
import { ICompany } from './companies.interface';
import { IContact } from './contacts.interface';
import { IEmployee } from './employees.interface';
import { IMaster_City } from './master_cities.interface';
import { IMaster_County } from './master_counties.interface';
import { IMaster_State } from './master_states.interface';
import { IMaster_Zip_Code } from './master_zip_codes.interface';
import { IPagination } from './pagination.interface';
import { IZone } from './zones.interface';

export interface IMaster_Country extends IBase {
  name?: string;
  ticker?: string;
  flag_icon?: string;
  phone_code?: string;
  master_states?: IMaster_State[];
  master_counties?: IMaster_County[];
  master_cities?: IMaster_City[];
  master_zip_codes?: IMaster_Zip_Code[];
  employees?: IEmployee[];
  companies?: ICompany[];
  contacts?: IContact[];
  zones?: IZone[];
  app_users?: IApp_User[];
}

export interface IMaster_Countries extends IPagination {
  data: IMaster_Country[];
}
