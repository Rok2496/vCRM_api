import { IApp_User } from './app_users.interface';
import { IBase } from './base.interface';
import { ICampaign_Prospect } from './campaign_prospects.interface';
import { ICompany } from './companies.interface';
import { ICompany_Contact_Map } from './company_contact_maps.interface';
import { IContact_Tag } from './contact_tags.interface';
import { IGroup_Member } from './group_members.interface';
import { IMaster_Contact_Type } from './master_contact_types.interface';
import { IMaster_Country } from './master_countries.interface';
import { IMaster_State } from './master_states.interface';
import { IPagination } from './pagination.interface';
import { IZone_Contact } from './zone_contacts.interface';

export interface IContact extends IBase {
  first_name?: string;
  last_name?: string;
  job_title?: string;
  company_name?: string;
  full_address?: string;
  address?: string;
  zip_code?: string;
  city?: string;
  date_of_birth?: Date;
  tax_or_ssn?: string;
  mobile?: string;
  sms_subscribed?: boolean;
  whatsapp_number?: boolean;
  personal_email?: string;
  personal_email_verified?: boolean;
  personal_email_subscribed?: boolean;
  business_email?: string;
  business_email_verified?: boolean;
  business_email_subscribed?: boolean;
  years_of_experience?: string;
  summary?: string;
  public_profile?: string;
  internal_profile_and_tags?: string;
  facebook?: string;
  linkedin?: string;
  twitter_x?: string;
  profile_picture?: string;
  public_profile_url?: string;
  verified?: boolean;
  internal_notes?: string;
  archive?: boolean;
  active_or_passive?: boolean;
  referred_by_email?: string;
  master_contact_type_id?: number;
  verified_by_user_id?: number;
  country_id?: number;
  state_id?: number;
  company_id?: number;
  company?: ICompany;
  state?: IMaster_State;
  country?: IMaster_Country;
  verified_by_user?: IApp_User;
  master_contact_type?: IMaster_Contact_Type;
  contact_tags?: IContact_Tag[];
  company_contact_maps?: ICompany_Contact_Map[];
  group_members?: IGroup_Member[];
  zone_contacts?: IZone_Contact[];
}

export interface IContacts extends IPagination {
  data: IContact[];
}
