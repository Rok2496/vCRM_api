import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsBoolean, IsDate, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateTeamWeeklyWorkSchedulesDto {
  @ApiProperty({
    description: 'The start date of the work schedule',
    example: '2023-01-01T00:00:00.000Z',
    required: false,
  })
  @IsDate()
  @Type(() => Date)
  @IsOptional()
  start_date?: Date;

  @ApiProperty({
    description: 'Number of work hours per day',
    example: 8,
    required: false,
  })
  @IsNumber()
  @IsOptional()
  number_of_work_hours_per_day?: number;

  @ApiProperty({
    description: 'Number of work hours per week',
    example: 40,
    required: false,
  })
  @IsNumber()
  @IsOptional()
  number_of_work_hours_per_week?: number;

  @ApiProperty({
    description: 'Number of work hours per month',
    example: 160,
    required: false,
  })
  @IsNumber()
  @IsOptional()
  number_of_work_hours_per_month?: number;

  @ApiProperty({
    description: 'Monday start time (format: HH:MM:SS)',
    example: '09:00:00',
    required: false,
  })
  @IsString()
  @IsOptional()
  monday_start_time?: string;

  @ApiProperty({
    description: 'Monday end time (format: HH:MM:SS)',
    example: '17:00:00',
    required: false,
  })
  @IsString()
  @IsOptional()
  monday_end_time?: string;

  @ApiProperty({
    description: 'Monday onsite (true) or remote (false)',
    example: true,
    required: true,
  })
  @IsBoolean()
  monday_onsite_or_remote: boolean;

  @ApiProperty({
    description: 'Tuesday start time (format: HH:MM:SS)',
    example: '09:00:00',
    required: false,
  })
  @IsString()
  @IsOptional()
  tuesday_start_time?: string;

  @ApiProperty({
    description: 'Tuesday end time (format: HH:MM:SS)',
    example: '17:00:00',
    required: false,
  })
  @IsString()
  @IsOptional()
  tuesday_end_time?: string;

  @ApiProperty({
    description: 'Tuesday onsite (true) or remote (false)',
    example: true,
    required: true,
  })
  @IsBoolean()
  tuesday_onsite_or_remote: boolean;

  @ApiProperty({
    description: 'Wednesday start time (format: HH:MM:SS)',
    example: '09:00:00',
    required: false,
  })
  @IsString()
  @IsOptional()
  wednesday_start_time?: string;

  @ApiProperty({
    description: 'Wednesday end time (format: HH:MM:SS)',
    example: '17:00:00',
    required: false,
  })
  @IsString()
  @IsOptional()
  wednesday_end_time?: string;

  @ApiProperty({
    description: 'Wednesday onsite (true) or remote (false)',
    example: true,
    required: true,
  })
  @IsBoolean()
  wednesday_onsite_or_remote: boolean;

  @ApiProperty({
    description: 'Thursday start time (format: HH:MM:SS)',
    example: '09:00:00',
    required: false,
  })
  @IsString()
  @IsOptional()
  thursday_start_time?: string;

  @ApiProperty({
    description: 'Thursday end time (format: HH:MM:SS)',
    example: '17:00:00',
    required: false,
  })
  @IsString()
  @IsOptional()
  thursday_end_time?: string;

  @ApiProperty({
    description: 'Thursday onsite (true) or remote (false)',
    example: true,
    required: true,
  })
  @IsBoolean()
  thursday_onsite_or_remote: boolean;

  @ApiProperty({
    description: 'Friday start time (format: HH:MM:SS)',
    example: '09:00:00',
    required: false,
  })
  @IsString()
  @IsOptional()
  friday_start_time?: string;

  @ApiProperty({
    description: 'Friday end time (format: HH:MM:SS)',
    example: '17:00:00',
    required: false,
  })
  @IsString()
  @IsOptional()
  friday_end_time?: string;

  @ApiProperty({
    description: 'Friday onsite (true) or remote (false)',
    example: true,
    required: true,
  })
  @IsBoolean()
  friday_onsite_or_remote: boolean;

  @ApiProperty({
    description: 'Saturday start time (format: HH:MM:SS)',
    example: '09:00:00',
    required: false,
  })
  @IsString()
  @IsOptional()
  saturday_start_time?: string;

  @ApiProperty({
    description: 'Saturday end time (format: HH:MM:SS)',
    example: '17:00:00',
    required: false,
  })
  @IsString()
  @IsOptional()
  saturday_end_time?: string;

  @ApiProperty({
    description: 'Saturday onsite (true) or remote (false)',
    example: false,
    required: true,
  })
  @IsBoolean()
  saturday_onsite_or_remote: boolean;

  @ApiProperty({
    description: 'Sunday start time (format: HH:MM:SS)',
    example: '09:00:00',
    required: false,
  })
  @IsString()
  @IsOptional()
  sunday_start_time?: string;

  @ApiProperty({
    description: 'Sunday end time (format: HH:MM:SS)',
    example: '17:00:00',
    required: false,
  })
  @IsString()
  @IsOptional()
  sunday_end_time?: string;

  @ApiProperty({
    description: 'Sunday onsite (true) or remote (false)',
    example: false,
    required: true,
  })
  @IsBoolean()
  sunday_onsite_or_remote: boolean;

  @ApiProperty({
    description: 'Monday work day type ID',
    example: 1,
    required: false,
  })
  @IsNumber()
  @IsOptional()
  monday_work_day_type_id?: number;

  @ApiProperty({
    description: 'Tuesday work day type ID',
    example: 1,
    required: false,
  })
  @IsNumber()
  @IsOptional()
  tuesday_work_day_type_id?: number;

  @ApiProperty({
    description: 'Wednesday work day type ID',
    example: 1,
    required: false,
  })
  @IsNumber()
  @IsOptional()
  wednesday_work_day_type_id?: number;

  @ApiProperty({
    description: 'Thursday work day type ID',
    example: 1,
    required: false,
  })
  @IsNumber()
  @IsOptional()
  thursday_work_day_type_id?: number;

  @ApiProperty({
    description: 'Friday work day type ID',
    example: 1,
    required: false,
  })
  @IsNumber()
  @IsOptional()
  friday_work_day_type_id?: number;

  @ApiProperty({
    description: 'Saturday work day type ID',
    example: 2,
    required: false,
  })
  @IsNumber()
  @IsOptional()
  saturday_work_day_type_id?: number;

  @ApiProperty({
    description: 'Sunday work day type ID',
    example: 2,
    required: false,
  })
  @IsNumber()
  @IsOptional()
  sunday_work_day_type_id?: number;

  @ApiProperty({
    description: 'Employee ID',
    example: 1,
    required: false,
  })
  @IsNumber()
  @IsOptional()
  employee_id?: number;
} 