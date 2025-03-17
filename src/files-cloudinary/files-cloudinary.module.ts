import { Module } from '@nestjs/common';
import { FilesCloudinaryController } from './files-cloudinary.controller';
import { FilesCloudinaryService } from './files-cloudinary.service';
import { CloudinaryProvider } from './providers/cloudinary.provider';

@Module({
  controllers: [FilesCloudinaryController],
  providers: [FilesCloudinaryService, CloudinaryProvider],
})
export class FilesCloudinaryModule {}
