import { ApiProperty } from '@nestjs/swagger';
import { IsEmail } from 'class-validator';

export class RequestLoginOtpDto implements Readonly<RequestLoginOtpDto> {
  @ApiProperty()
  @IsEmail()
  email: string;
}
