import { IBase } from './base.interface';
import { IEmployee } from './employees.interface';
import { IMaster_Tag_Category } from './master_tag_categories.interface';
import { IMaster_Tag } from './master_tags.interface';
import { IPagination } from './pagination.interface';

export interface IEmployee_Tag extends IBase {
  tag?: string;
  value?: string;
  rating_score?: number;
  display_sequence?: number;
  master_tag_category_id?: number;
  tutor_id?: number;
  employee_id?: number;
  master_tag_id?: number;
  rated_by_employee_id?: number;
  employee?: IEmployee;
  master_tag_category?: IMaster_Tag_Category;
  master_tag?: IMaster_Tag;
  rated_by_employee?: IEmployee;
}

export interface IEmployee_Tags extends IPagination {
  data: IEmployee_Tag[];
}
