import { ApiProperty } from '@nestjs/swagger';

import { IsEmail, IsString, Length } from 'class-validator';

export class VerifyEmailDto implements Readonly<VerifyEmailDto> {
  @ApiProperty()
  @IsEmail()
  email: string;

  @ApiProperty()
  @IsString()
  @Length(6, 6)
  otp: string;
}
