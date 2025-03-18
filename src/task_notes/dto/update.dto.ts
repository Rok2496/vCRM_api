import { PartialType } from '@nestjs/swagger';
import { CreateTaskNotesDto } from './create.dto';

export class UpdateTaskNotesDto extends PartialType(CreateTaskNotesDto) {} 