import { IBase } from './base.interface';
import { ICampaign } from './campaigns.interface';
import { IEmployee } from './employees.interface';
import { IPagination } from './pagination.interface';

export interface ICampaign_Team extends IBase {
  primary?: boolean;
  assigned_date?: Date;
  notes?: string;
  employee_id?: number;
  campaign_id?: number;
  campaign?: ICampaign;
  employee?: IEmployee;
}

export interface ICampaign_Teams extends IPagination {
  data: ICampaign_Team[];
}
