import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Master_Audio_Libraries } from 'src/models';
import { MasterAudioLibrariesController } from './master_audio_libraries.controller';
import { MasterAudioLibrariesService } from './master_audio_libraries.service';

@Module({
  imports: [TypeOrmModule.forFeature([Master_Audio_Libraries])],
  controllers: [MasterAudioLibrariesController],
  providers: [MasterAudioLibrariesService],
})
export class MasterAudioLibrariesModule {}
