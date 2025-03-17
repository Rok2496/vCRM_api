import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsPhoneNumber,
  IsString,
} from 'class-validator';

export class ContactWebhookDto {
  @ApiProperty({ description: 'First name of the contact' })
  @IsString()
  @IsNotEmpty()
  firstName: string;

  @ApiProperty({ description: 'Last name of the contact' })
  @IsString()
  @IsNotEmpty()
  lastName: string;

  @ApiProperty({ description: 'Email address of the contact' })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({ description: 'Phone number of the contact' })
  @IsPhoneNumber()
  @IsNotEmpty()
  phone: string;

  @ApiProperty({ description: 'Source of the contact', required: false })
  @IsString()
  @IsOptional()
  source?: string;

  @ApiProperty({
    description: 'Additional details for the contact',
    required: false,
  })
  @IsOptional()
  details?: Record<string, any>;
}
