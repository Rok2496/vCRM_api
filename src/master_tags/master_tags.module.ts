import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Master_Tags as Entity } from 'src/models';
import { MasterTagsController as Controller } from './master_tags.controller';
import { MasterTagsService as Service } from './master_tags.service';

@Module({
  imports: [TypeOrmModule.forFeature([Entity])],
  controllers: [Controller],
  providers: [Service],
})
export class MasterTagsModule {}
