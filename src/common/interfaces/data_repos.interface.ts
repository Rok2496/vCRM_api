import { IBase } from './base.interface';
import { ICampaign_Prospect } from './campaign_prospects.interface';
import { IPagination } from './pagination.interface';

export interface IData_Repo extends IBase {
  first_name?: string;
  middle_name?: string;
  last_name?: string;
  organization_name?: string;
  job_title?: string;
  zip_code?: string;
  latitude?: number;
  longitude?: number;
  street_address?: string;
  mobile?: string;
  home_phone?: string;
  office_phone?: string;
  fax?: string;
  business_email?: string;
  personal_email?: string;
  business_email_validated?: boolean;
  personal_email_validated?: boolean;
  linkedin?: string;
  facebook?: string;
  twitter?: string;
  internal_remarks?: string;
  contact_resume_profile?: string;
  sic_naics_description?: string;
  company_website?: string;
  full_address?: string;
  city?: string;
  county?: string;
  state?: string;
  country?: string;
  sic_code?: string;
  industry?: string;
  company_revenue?: string;
  employee_size?: string;
  tags?: string;
  verified?: boolean;
  campaign_prospects?: ICampaign_Prospect[];
}

export interface IData_Repos extends IPagination {
  data: IData_Repo[];
}
