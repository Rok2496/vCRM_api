import { DynamicModule, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { FilesCloudinaryService } from '../files-cloudinary/files-cloudinary.service';
import { CloudinaryProvider } from '../files-cloudinary/providers/cloudinary.provider';
import { FilesController } from './controllers/files.controller';
import { DOSpaceServicePovider } from './helper';
import { AwsS3Service, LocalStorageService } from './services';
import { DOSpaceService } from './services/do-space.service';
import { FilesService } from './services/files.service';

@Module({})
export class FilesModule {
  static forRootAsync(): DynamicModule {
    return {
      module: FilesModule,
      imports: [ConfigModule.forRoot()],
      controllers: [FilesController],
      providers: [
        DOSpaceService,
        AwsS3Service,
        LocalStorageService,
        FilesService,
        DOSpaceServicePovider,
        FilesCloudinaryService,
        CloudinaryProvider,
      ],
    };
  }
}
