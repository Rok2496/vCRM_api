import { PartialType } from '@nestjs/swagger';
import { CreateMasterTagCategoryDto as CreateDto } from './create.dto';

export class UpdateMasterTagCategoryDto extends PartialType(CreateDto) {}
