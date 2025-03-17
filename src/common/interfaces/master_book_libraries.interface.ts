import { IBase } from './base.interface';
import { IPagination } from './pagination.interface';

export interface IMaster_Book_Library extends IBase {
  title?: string;
  author?: string;
  isbn?: string;
  published_date?: Date;
  category?: string;
  digital_library_id?: number;
  seo_tags?: string;
  file_path?: string;

}

export interface IMaster_Book_Libraries extends IPagination {
  data: IMaster_Book_Library[];
}
