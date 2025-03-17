import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Master_Photo_Library } from 'src/models';
import { MasterPhotoLibrariesController } from './master_photo_libraries.controller';
import { MasterPhotoLibrariesService } from './master_photo_libraries.service';

@Module({
  imports: [TypeOrmModule.forFeature([Master_Photo_Library])],
  controllers: [MasterPhotoLibrariesController],
  providers: [MasterPhotoLibrariesService],
})
export class MasterPhotoLibrariesModule {}
