import { PartialType } from '@nestjs/swagger';
import { CreateDataReposDto as CreateDto } from './create.dto';

export class UpdateDataReposDto extends PartialType(CreateDto) {}
