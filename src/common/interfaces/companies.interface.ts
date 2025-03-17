import { IBase } from './base.interface';
import { ICampaign_Prospect } from './campaign_prospects.interface';
import { ICompany_Contact_Map } from './company_contact_maps.interface';
import { ICompany_Tag } from './company_tags.interface';
import { IContact } from './contacts.interface';
import { IMaster_Company_Type } from './master_company_types.interface';
import { IMaster_Country } from './master_countries.interface';
import { IMaster_State } from './master_states.interface';
import { IPagination } from './pagination.interface';
import { IZone_Company } from './zone_companies.interface';

export interface ICompany extends IBase {
  name?: string;
  trade_name?: string;
  description?: string;
  custom_id?: string;
  year_of_establishment?: string;
  industry?: string;
  market_cap?: number;
  full_address?: string;
  address1?: string;
  address2?: string;
  city?: string;
  zip_code?: string;
  latitude?: number;
  longitude?: number;
  phone?: string;
  fax?: string;
  email?: string;
  website?: string;
  ein_tax_id?: string;
  logo_binary_object?: string;
  internal_remarks?: string;
  verified?: boolean;
  facebook?: string;
  linkedin?: string;
  twitter?: string;
  master_company_type_id?: number;
  country_id?: number;
  state_id?: number;
  master_company_type?: IMaster_Company_Type;
  country?: IMaster_Country;
  state?: IMaster_State;
  company_tags?: ICompany_Tag[];
  contacts?: IContact[];
  company_contact_maps?: ICompany_Contact_Map[];
  campaign_prospects?: ICampaign_Prospect[];
  zone_companies?: IZone_Company[];
}

export interface ICompanies extends IPagination {
  data: ICompany[];
}
