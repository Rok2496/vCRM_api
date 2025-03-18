import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Zones as Entity } from 'src/models';
import { ZonesController as Controller } from './zones.controller';
import { ZonesService as Service } from './zones.service';

@Module({
  imports: [TypeOrmModule.forFeature([Entity])],
  controllers: [Controller],
  providers: [Service],
})
export class ZonesModule {}
