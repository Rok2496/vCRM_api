import { IBase } from './base.interface';
import { IPagination } from './pagination.interface';

export interface IMaster_Video_Library extends IBase {
  name?: string;
  video_link?: string;
  size?: string;
  file_extension?: string;
  seo_tag?: string;
  attachment?: string;
}

export interface IMaster_Video_Libraries extends IPagination {
  data: IMaster_Video_Library[];
}
