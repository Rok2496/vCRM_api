import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Master_Zone_Types as Entity } from 'src/models';
import { MasterZoneTypesController as Controller } from './master_zone_types.controller';
import { MasterZoneTypesService as Service } from './master_zone_types.service';

@Module({
  imports: [TypeOrmModule.forFeature([Entity])],
  controllers: [Controller],
  providers: [Service],
})
export class MasterZoneTypesModule {}
