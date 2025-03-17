import { IBase } from './base.interface';
import { ICampaign_Prospect } from './campaign_prospects.interface';
import { ICampaign_Team } from './campaign_teams.interface';
import { IEmployee } from './employees.interface';
import { IPagination } from './pagination.interface';

export interface ICampaign extends IBase {
  name?: string;
  description?: string;
  location?: string;
  start_date?: Date;
  end_date?: Date;
  duration?: string;
  projected_revenue?: number;
  revenue_earned?: number;
  projected_sales?: number;
  number_of_sales?: number;
  campaign_budget?: number;
  spent_amount?: number;
  status_open_closed?: number;
  campaign_manager_employee_id?: number;
  campaign_manager?: IEmployee;
  campaign_prospects?: ICampaign_Prospect[];
  campaign_teams?: ICampaign_Team[];
}

export interface ICampaigns extends IPagination {
  data: ICampaign[];
}
