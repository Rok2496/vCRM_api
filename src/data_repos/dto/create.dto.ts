import { ApiProperty } from '@nestjs/swagger';

export class CreateDataReposDto implements Readonly<CreateDataReposDto> {
  @ApiProperty()
  first_name: string;

  @ApiProperty()
  middle_name: string;

  @ApiProperty()
  last_name: string;

  @ApiProperty()
  organization_name: string;

  @ApiProperty()
  job_title: string;

  @ApiProperty()
  zip_code: string;

  @ApiProperty()
  latitude: number;

  @ApiProperty()
  longitude: number;

  @ApiProperty()
  street_address: string;

  @ApiProperty()
  mobile: string;

  @ApiProperty()
  home_phone: string;

  @ApiProperty()
  office_phone: string;

  @ApiProperty()
  fax: string;

  @ApiProperty()
  business_email: string;

  @ApiProperty()
  personal_email: string;

  @ApiProperty()
  business_email_validated: boolean;

  @ApiProperty()
  personal_email_validated: boolean;

  @ApiProperty()
  linkedin: string;

  @ApiProperty()
  facebook: string;

  @ApiProperty()
  twitter: string;

  @ApiProperty()
  internal_remarks: string;

  @ApiProperty()
  contact_resume_profile: string;

  @ApiProperty()
  sic_naics_description: string;

  @ApiProperty()
  company_website: string;

  @ApiProperty()
  full_address: string;

  @ApiProperty()
  city: string;

  @ApiProperty()
  county: string;

  @ApiProperty()
  state: string;

  @ApiProperty()
  country: string;

  @ApiProperty()
  sic_code: string;

  @ApiProperty()
  industry: string;

  @ApiProperty()
  company_revenue: string;

  @ApiProperty()
  employee_size: string;

  @ApiProperty()
  tags: string;

  @ApiProperty()
  verified: boolean;
}
