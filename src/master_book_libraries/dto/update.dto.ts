import { PartialType } from '@nestjs/swagger';
import { CreateMasterBookLibraryDto } from './create.dto';

export class UpdateMasterBookLibraryDto extends PartialType(
  CreateMasterBookLibraryDto,
) {}
