import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Master_Video_Libraries } from 'src/models';
import { MasterVideoLibrariesController } from './master_video_libraries.controller';
import { MasterVideoLibrariesService } from './master_video_libraries.service';

@Module({
  imports: [TypeOrmModule.forFeature([Master_Video_Libraries])],
  controllers: [MasterVideoLibrariesController],
  providers: [MasterVideoLibrariesService],
})
export class MasterVideoLibrariesModule {}
