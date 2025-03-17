import { IBase } from './base.interface';
import { ICompany } from './companies.interface';
import { IPagination } from './pagination.interface';

export interface IMaster_Company_Type extends IBase {
  name?: string;
  companies?: ICompany[];
}

export interface IMaster_Company_Types extends IPagination {
  data: IMaster_Company_Type[];
}
