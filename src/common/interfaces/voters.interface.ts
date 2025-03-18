import { IBase } from './base.interface';
import { IContact } from './contacts.interface';
import { IData_Repo } from './data_repos.interface';
import { IPagination } from './pagination.interface';
import { IVoter_Tag } from './voter_tags.interface';

export interface IVoter extends IBase {
  first_name?: string;
  middle_name?: string;
  last_name?: string;
  name_suffix?: string;
  residence_address_number?: string;
  residence_half_code?: string;
  residence_pre_direction?: string;
  residence_street_name?: string;
  residence_post_direction?: string;
  residence_apartment_type?: string;
  residence_apartment_number?: string;
  residence_address_non_standard?: string;
  residence_city?: string;
  residence_zip_code_5?: string;
  residence_zip_code_4?: string;
  mailing_address_line_1?: string;
  mailing_address_line_2?: string;
  mailing_address_line_3?: string;
  mailing_address_line_4?: string;
  date_of_birth?: Date;
  gender?: string;
  enrollment?: string;
  other_party?: string;
  county_code?: number;
  election_district?: number;
  legislative_district?: number;
  town_city?: string;
  ward?: string;
  congressional_district?: number;
  senate_district?: number;
  assembly_district?: number;
  last_voter_date?: string;
  previous_year_voted?: string;
  previous_county?: string;
  previous_address?: string;
  previous_name?: string;
  county_voter_registration_number?: string;
  registration_date?: string;
  voter_registration_source?: string;
  identification_required?: string;
  identification_met?: string;
  voter_status?: string;
  status_reason_code?: string;
  inactive_date?: string;
  purge_date?: string;
  state_board_of_elections_id?: string;
  voter_history?: string;
  import_hash?: string;
  latitude?: number;
  longitude?: number;
  mobile?: string;
  email_address?: string;
  
  // Relations
  contact_id?: number;
  contact?: IContact;
  data_repo_id?: number;
  data_repository?: IData_Repo;
  voter_tags?: IVoter_Tag[];
}

export interface IVoters extends IPagination {
  data: IVoter[];
} 