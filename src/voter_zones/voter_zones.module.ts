import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VoterZones as Entity } from 'src/models';
import { VoterZonesController as Controller } from './voter_zones.controller';
import { VoterZonesService as Service } from './voter_zones.service';

@Module({
  imports: [TypeOrmModule.forFeature([Entity])],
  controllers: [Controller],
  providers: [Service],
})
export class VoterZonesModule {}
