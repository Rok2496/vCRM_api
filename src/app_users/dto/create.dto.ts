import { ApiProperty } from '@nestjs/swagger';

export class CreateApplicationUsersDto
  implements Readonly<CreateApplicationUsersDto>
{
  @ApiProperty()
  username: string;

  @ApiProperty()
  password_hash: string;

  @ApiProperty()
  first_name: string;

  @ApiProperty()
  last_name: string;

  @ApiProperty()
  email: string;

  @ApiProperty()
  phone_number: string;

  @ApiProperty()
  active_or_archive: boolean;

  @ApiProperty()
  email_confirmed: boolean;

  @ApiProperty()
  account_lock: boolean;

  @ApiProperty()
  phone_number_confirmed: boolean;

  @ApiProperty()
  two_factor_enabled: boolean;

  @ApiProperty()
  lockout_enabled: boolean;

  @ApiProperty()
  access_failed_count: number;

  @ApiProperty()
  lockout_end: Date;

  @ApiProperty()
  security_stamp: string;

  @ApiProperty()
  profile_picture: string;

  @ApiProperty()
  profile_picture_url: string;

  @ApiProperty()
  profile_picture_thumbnail_url: string;

  @ApiProperty()
  whatsapp_subscribed: boolean;

  @ApiProperty()
  email_subscribed: boolean;

  @ApiProperty()
  sms_subscribed: boolean;

  @ApiProperty()
  master_country: number;

  @ApiProperty()
  zone: number;

  @ApiProperty()
  student: number;

  @ApiProperty()
  tutor: number;

  @ApiProperty()
  institute: number;

  @ApiProperty()
  employee: number;

  @ApiProperty()
  roles: number[];

  @ApiProperty()
  primary_role: number;
}
