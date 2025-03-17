import { ApiProperty } from '@nestjs/swagger';
import { IsEmail } from 'class-validator';

export class ResendOtpDto implements Readonly<ResendOtpDto> {
  @ApiProperty()
  @IsEmail()
  email: string;
}
