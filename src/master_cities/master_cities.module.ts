import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Master_Cities as Entity } from 'src/models';
import { MasterCitiesController as Controller } from './master_cities.controller';
import { MasterCitiesService as Service } from './master_cities.service';

@Module({
  imports: [TypeOrmModule.forFeature([Entity])],
  controllers: [Controller],
  providers: [Service],
})
export class MasterCitiesModule {}
