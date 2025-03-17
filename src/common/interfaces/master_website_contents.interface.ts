import { IBase } from './base.interface';
import { IPagination } from './pagination.interface';

export interface IMaster_Website_Content extends IBase {
  readonly title?: string;
  readonly public_url?: string;
  readonly document_version?: string;
  readonly content?: string;
  readonly seo_tags?: string;
  readonly published_date?: Date;
  readonly author?: string;
  readonly status?: string;
  readonly tags?: string;
  readonly image?: string;
}

export interface IMaster_Website_Contents extends IPagination {
  data: IMaster_Website_Content[];
}
