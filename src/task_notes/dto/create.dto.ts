import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsDate, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateTaskNotesDto {
  @ApiProperty({
    description: 'Notes content',
    example: 'Called the supporter and confirmed attendance at the rally. They will bring 3 additional guests.',
    required: true,
  })
  @IsString()
  notes: string;

  @ApiProperty({
    description: 'Creation time of the note',
    example: '2023-08-15T09:00:00.000Z',
    required: false,
  })
  @IsDate()
  @Type(() => Date)
  @IsOptional()
  creation_time?: Date;

  @ApiProperty({
    description: 'ID of the user who created the note',
    example: 1,
    required: false,
  })
  @IsNumber()
  @IsOptional()
  creator_user_id?: number;

  @ApiProperty({
    description: 'ID of the task this note is associated with',
    example: 1,
    required: false,
  })
  @IsNumber()
  @IsOptional()
  task_id?: number;

  @ApiProperty({
    description: 'ID of the task event this note is associated with',
    example: 1,
    required: false,
  })
  @IsNumber()
  @IsOptional()
  task_event_id?: number;
}