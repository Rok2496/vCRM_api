import { PartialType } from '@nestjs/swagger';
import { CreateMasterTagDto as CreateDto } from './create.dto';

export class UpdateMasterTagDto extends PartialType(CreateDto) {}
