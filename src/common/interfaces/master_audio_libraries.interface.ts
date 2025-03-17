import { IBase } from './base.interface';
import { IPagination } from './pagination.interface';

export interface IMaster_Audio_Library extends IBase {
  name?: string;
  audio_link?: string;
  size?: string;
  file_extension?: string;
  seo_tag?: string;
  attachment?: string;
}

export interface IMaster_Audio_Libraries extends IPagination {
  data: IMaster_Audio_Library[];
}
