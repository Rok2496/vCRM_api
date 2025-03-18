import { IBase } from './base.interface';
import { IMaster_Tag } from './master_tags.interface';
import { IMaster_Tag_Category } from './master_tag_categories.interface';
import { IVoter } from './voters.interface';

export interface IVoter_Tag extends IBase {
  title?: string;
  description?: string;
  display_sequence?: number;
  score?: number;
  
  // Relations
  voter_id?: number;
  voter?: IVoter;
  master_tag_category_id?: number;
  master_tag_category?: IMaster_Tag_Category;
  master_tag_id?: number;
  master_tag?: IMaster_Tag;
}
