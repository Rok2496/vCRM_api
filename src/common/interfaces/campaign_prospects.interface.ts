import { IBase } from './base.interface';
import { ICampaign } from './campaigns.interface';
import { ICompany } from './companies.interface';
import { IContact } from './contacts.interface';
import { IData_Repo } from './data_repos.interface';
import { IPagination } from './pagination.interface';

export interface ICampaign_Prospect extends IBase {
  sales_score?: number;
  data_repository_id?: number;
  institute_id?: number;
  tutor_id?: number;
  student_id?: number;
  contact_id?: number;
  company_id?: number;
  campaign_id?: number;
  campaign?: ICampaign;
  company?: ICompany;
  contact?: IContact;
  data_repository?: IData_Repo;
}

export interface ICampaign_Prospects extends IPagination {
  data: ICampaign_Prospect[];
}
