import { IBase } from './base.interface';
import { IData_Repo } from './data_repos.interface';
import { IPagination } from './pagination.interface';
import { IVoter } from './voters.interface';
import { IZone } from './zones.interface';

export interface IVoter_Zone extends IBase {
  display_sequence?: number;
  
  // Relations
  zone_id?: number;
  zone?: IZone;
  voter_id?: number;
  voter?: IVoter;
  data_repo_id?: number;
  data_repository?: IData_Repo;
}

export interface IVoter_Zones extends IPagination {
  data: IVoter_Zone[];
} 