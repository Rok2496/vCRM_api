import { IBase } from './base.interface';
import { ICompany } from './companies.interface';
import { IContact } from './contacts.interface';
import { IPagination } from './pagination.interface';

export interface ICompany_Contact_Map extends IBase {
  name?: string;
  job_title?: string;
  email?: string;
  phone?: string;
  display_sequence?: number;
  contact_id?: number;
  company_id?: number;
  company?: ICompany;
  contact?: IContact;
}

export interface ICompany_Contact_Maps extends IPagination {
  data: ICompany_Contact_Map[];
}
