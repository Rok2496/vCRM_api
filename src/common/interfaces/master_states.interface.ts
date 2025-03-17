import { IBase } from './base.interface';
import { ICompany } from './companies.interface';
import { IContact } from './contacts.interface';
import { IEmployee } from './employees.interface';
import { IMaster_City } from './master_cities.interface';
import { IMaster_County } from './master_counties.interface';
import { IMaster_Country } from './master_countries.interface';
import { IMaster_Zip_Code } from './master_zip_codes.interface';
import { IPagination } from './pagination.interface';
import { IZone } from './zones.interface';

export interface IMaster_State extends IBase {
  name?: string;
  ticker?: string;
  master_country_id?: number;
  master_country?: IMaster_Country;
  master_cities?: IMaster_City[];
  master_counties?: IMaster_County[];
  master_zip_codes?: IMaster_Zip_Code[];
  employees?: IEmployee[];
  companies?: ICompany[];
  contacts?: IContact[];
  zones?: IZone[];
}

export interface IMaster_States extends IPagination {
  data: IMaster_State[];
}
