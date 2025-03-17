import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Master_Book_Libraries } from 'src/models';
import { MasterBookLibrariesController } from './master_book_libraries.controller';
import { MasterBookLibrariesService } from './master_book_libraries.service';

@Module({
  imports: [TypeOrmModule.forFeature([Master_Book_Libraries])],
  controllers: [MasterBookLibrariesController],
  providers: [MasterBookLibrariesService],
})
export class MasterBookLibrariesModule {}
