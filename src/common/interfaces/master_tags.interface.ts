import { IBase } from './base.interface';
import { ICompany_Tag } from './company_tags.interface';
import { IContact_Tag } from './contact_tags.interface';
import { IEmployee_Tag } from './employee_tags.interface';
import { IMaster_Tag_Category } from './master_tag_categories.interface';
import { IPagination } from './pagination.interface';

export interface IMaster_Tag extends IBase {
  name?: string;
  description?: string;
  synonyms?: string;
  display_sequence?: number;
  image?: string;
  master_tag_category_id?: number;
  master_tag_category?: IMaster_Tag_Category;
  employee_tags?: IEmployee_Tag[];
  company_tags?: ICompany_Tag[];
  contact_tags?: IContact_Tag[];
}

export interface IMaster_Tags extends IPagination {
  data: IMaster_Tag[];
}
