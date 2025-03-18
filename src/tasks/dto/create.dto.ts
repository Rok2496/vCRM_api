import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsBoolean, IsDate, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateTasksDto {
  @ApiProperty({
    description: 'Whether this is a task (true) or event (false)',
    example: true,
    required: true,
  })
  @IsBoolean()
  task_or_event: boolean;

  @ApiProperty({
    description: 'Name of the task or event',
    example: 'Complete campaign outreach for northeast district',
    required: true,
  })
  @IsString()
  name: string;

  @ApiProperty({
    description: 'Detailed description of the task or event',
    example: 'Reach out to all identified supporters in the northeast district to confirm rally attendance.',
    required: false,
  })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiProperty({
    description: 'Start date and time of the task or event',
    example: '2023-08-15T09:00:00.000Z',
    required: false,
  })
  @IsDate()
  @Type(() => Date)
  @IsOptional()
  start_date_time?: Date;

  @ApiProperty({
    description: 'End date and time of the task or event',
    example: '2023-08-15T17:00:00.000Z',
    required: false,
  })
  @IsDate()
  @Type(() => Date)
  @IsOptional()
  end_date_time?: Date;

  @ApiProperty({
    description: 'Whether the task is open (true) or closed (false)',
    example: true,
    required: false,
    default: true,
  })
  @IsBoolean()
  @IsOptional()
  open_or_closed?: boolean;

  @ApiProperty({
    description: 'Task status type ID',
    example: 1,
    required: false,
  })
  @IsNumber()
  @IsOptional()
  master_task_status_type_id?: number;

  @ApiProperty({
    description: 'Employee ID assigned to the task',
    example: 1,
    required: false,
  })
  @IsNumber()
  @IsOptional()
  employee_id?: number;

  @ApiProperty({
    description: 'User ID assigned to the task',
    example: 1,
    required: false,
  })
  @IsNumber()
  @IsOptional()
  user_id?: number;
} 