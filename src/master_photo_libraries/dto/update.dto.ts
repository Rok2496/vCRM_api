import { PartialType } from '@nestjs/swagger';
import { CreateMasterPhotoLibraryDto } from './create.dto';

export class UpdateMasterPhotoLibraryDto extends PartialType(
  CreateMasterPhotoLibraryDto,
) {}
