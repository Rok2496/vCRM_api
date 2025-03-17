import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Master_Countries as Entity } from 'src/models';
import { MasterCountriesController as Controller } from './master_countries.controller';
import { MasterCountriesService as Service } from './master_countries.service';

@Module({
  imports: [TypeOrmModule.forFeature([Entity])],
  controllers: [Controller],
  providers: [Service],
})
export class MasterCountriesModule {}
