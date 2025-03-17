import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Master_Tag_Categories as Entity } from 'src/models';
import { MasterTagCategoriesController as Controller } from './master_tag_categories.controller';
import { MasterTagCategoriesService as Service } from './master_tag_categories.service';

@Module({
  imports: [TypeOrmModule.forFeature([Entity])],
  controllers: [Controller],
  providers: [Service],
})
export class MasterTagCategoriesModule {}
