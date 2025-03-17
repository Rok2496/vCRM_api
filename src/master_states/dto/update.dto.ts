import { PartialType } from '@nestjs/swagger';
import { CreateMasterStateDto as CreateDto } from './create.dto';

export class UpdateMasterStateDto extends PartialType(CreateDto) {}
