import { PartialType } from '@nestjs/swagger';
import { CreateTasksDto } from './create.dto';

export class UpdateTasksDto extends PartialType(CreateTasksDto) {}