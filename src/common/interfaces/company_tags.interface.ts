import { IBase } from './base.interface';
import { ICompany } from './companies.interface';
import { IMaster_Company_Type } from './master_company_types.interface';
import { IMaster_Country } from './master_countries.interface';
import { IMaster_State } from './master_states.interface';
import { IMaster_Tag_Category } from './master_tag_categories.interface';
import { IMaster_Tag } from './master_tags.interface';
import { IPagination } from './pagination.interface';

export interface ICompany_Tag extends IBase {
  tag?: string;
  display_sequence?: number;
  tag_value?: string;
  rating_score?: number;
  master_tag_id?: number;
  master_tag_category_id?: number;
  company_id?: number;
  company?: ICompany;
  master_tag_category?: IMaster_Tag_Category;
  master_tag?: IMaster_Tag;
}

export interface ICompany_Tags extends IPagination {
  data: ICompany_Tag[];
}
