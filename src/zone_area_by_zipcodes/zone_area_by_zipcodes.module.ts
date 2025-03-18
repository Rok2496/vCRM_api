import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Zone_Area_By_Zipcodes } from '../models/zone_area_by_zipcodes.entity';
import { ZoneAreaByZipcodesController } from './zone_area_by_zipcodes.controller';
import { ZoneAreaByZipcodesService } from './zone_area_by_zipcodes.service';

@Module({
  imports: [TypeOrmModule.forFeature([Zone_Area_By_Zipcodes])],
  controllers: [ZoneAreaByZipcodesController],
  providers: [ZoneAreaByZipcodesService],
  exports: [ZoneAreaByZipcodesService],
})
export class ZoneAreaByZipcodesModule {}