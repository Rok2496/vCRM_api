import { ApiProperty } from '@nestjs/swagger';

export class CreateVotersDto implements Readonly<CreateVotersDto> {
  @ApiProperty({ required: false })
  first_name?: string;

  @ApiProperty({ required: false })
  middle_name?: string;

  @ApiProperty({ required: false })
  last_name?: string;

  @ApiProperty({ required: false })
  name_suffix?: string;

  @ApiProperty({ required: false })
  residence_address_number?: string;

  @ApiProperty({ required: false })
  residence_half_code?: string;

  @ApiProperty({ required: false })
  residence_pre_direction?: string;

  @ApiProperty({ required: false })
  residence_street_name?: string;

  @ApiProperty({ required: false })
  residence_post_direction?: string;

  @ApiProperty({ required: false })
  residence_apartment_type?: string;

  @ApiProperty({ required: false })
  residence_apartment_number?: string;

  @ApiProperty({ required: false })
  residence_address_non_standard?: string;

  @ApiProperty({ required: false })
  residence_city?: string;

  @ApiProperty({ required: false })
  residence_zip_code_5?: string;

  @ApiProperty({ required: false })
  residence_zip_code_4?: string;

  @ApiProperty({ required: false })
  mailing_address_line_1?: string;

  @ApiProperty({ required: false })
  mailing_address_line_2?: string;

  @ApiProperty({ required: false })
  mailing_address_line_3?: string;

  @ApiProperty({ required: false })
  mailing_address_line_4?: string;

  @ApiProperty({ required: false })
  date_of_birth?: Date;

  @ApiProperty({ required: false })
  gender?: string;

  @ApiProperty({ required: false })
  enrollment?: string;

  @ApiProperty({ required: false })
  other_party?: string;

  @ApiProperty({ required: false })
  county_code?: number;

  @ApiProperty({ required: false })
  election_district?: number;

  @ApiProperty({ required: false })
  legislative_district?: number;

  @ApiProperty({ required: false })
  town_city?: string;

  @ApiProperty({ required: false })
  ward?: string;

  @ApiProperty({ required: false })
  congressional_district?: number;

  @ApiProperty({ required: false })
  senate_district?: number;

  @ApiProperty({ required: false })
  assembly_district?: number;

  @ApiProperty({ required: false })
  last_voter_date?: string;

  @ApiProperty({ required: false })
  previous_year_voted?: string;

  @ApiProperty({ required: false })
  previous_county?: string;

  @ApiProperty({ required: false })
  previous_address?: string;

  @ApiProperty({ required: false })
  previous_name?: string;

  @ApiProperty({ required: false })
  county_voter_registration_number?: string;

  @ApiProperty({ required: false })
  registration_date?: string;

  @ApiProperty({ required: false })
  voter_registration_source?: string;

  @ApiProperty({ required: false })
  identification_required?: string;

  @ApiProperty({ required: false })
  identification_met?: string;

  @ApiProperty({ required: false })
  voter_status?: string;

  @ApiProperty({ required: false })
  status_reason_code?: string;

  @ApiProperty({ required: false })
  inactive_date?: string;

  @ApiProperty({ required: false })
  purge_date?: string;

  @ApiProperty({ required: false })
  state_board_of_elections_id?: string;

  @ApiProperty({ required: false })
  voter_history?: string;

  @ApiProperty({ required: false })
  import_hash?: string;

  @ApiProperty({ required: false })
  latitude?: number;

  @ApiProperty({ required: false })
  longitude?: number;

  @ApiProperty({ required: false })
  mobile?: string;

  @ApiProperty({ required: false })
  email_address?: string;

  // Relations:
  @ApiProperty({ required: false })
  contact?: number;

  @ApiProperty({ required: false })
  data_repo?: number;
}
