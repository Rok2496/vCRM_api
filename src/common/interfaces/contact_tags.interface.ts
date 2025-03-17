import { IBase } from './base.interface';
import { IContact } from './contacts.interface';
import { IMaster_Tag_Category } from './master_tag_categories.interface';
import { IMaster_Tag } from './master_tags.interface';
import { IPagination } from './pagination.interface';

export interface IContact_Tag extends IBase {
  tag?: string;
  tag_value?: string;
  display_sequence?: number;
  rating_score?: number;
  master_tag_id?: number;
  master_tag_category_id?: number;
  contact_id?: number;
  contact?: IContact;
  master_tag_category?: IMaster_Tag_Category;
  master_tag?: IMaster_Tag;
}

export interface IContact_Tags extends IPagination {
  data: IContact_Tag[];
}
