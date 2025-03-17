import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Master_Counties as Entity } from 'src/models';
import { MasterCountiesController as Controller } from './master_counties.controller';
import { MasterCountiesService as Service } from './master_counties.service';

@Module({
  imports: [TypeOrmModule.forFeature([Entity])],
  controllers: [Controller],
  providers: [Service],
})
export class MasterCountiesModule {}
