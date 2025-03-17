import { IBase } from './base.interface';
import { ICompany_Tag } from './company_tags.interface';
import { IContact_Tag } from './contact_tags.interface';
import { IEmployee_Tag } from './employee_tags.interface';
import { IMaster_Tag } from './master_tags.interface';
import { IPagination } from './pagination.interface';

export interface IMaster_Tag_Category extends IBase {
  name?: string;
  description?: string;
  image?: string;
  tag?: string;
  display_sequence?: number;
  public_or_private?: boolean;
  master_tags?: IMaster_Tag[];
  employee_tags?: IEmployee_Tag[];
  company_tags?: ICompany_Tag[];
  contact_tags?: IContact_Tag[];
}

export interface IMaster_Tag_Categories extends IPagination {
  data: IMaster_Tag_Category[];
}
