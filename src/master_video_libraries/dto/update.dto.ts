import { PartialType } from '@nestjs/swagger';
import { CreateMasterVideoLibraryDto } from './create.dto';

export class UpdateMasterVideoLibraryDto extends PartialType(
  CreateMasterVideoLibraryDto,
) {}
