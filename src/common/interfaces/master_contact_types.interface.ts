import { IBase } from './base.interface';
import { IContact } from './contacts.interface';
import { IPagination } from './pagination.interface';

export interface IMaster_Contact_Type extends IBase {
  name?: string;
  contacts?: IContact[];
}

export interface IMaster_Contact_Types extends IPagination {
  data: IMaster_Contact_Type[];
}
