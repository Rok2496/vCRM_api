import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Zone_Companies } from '../models/zone_companies.entity';
import { ZoneCompaniesController } from './zone_companies.controller';
import { ZoneCompaniesService } from './zone_companies.service';

@Module({
  imports: [TypeOrmModule.forFeature([Zone_Companies])],
  controllers: [ZoneCompaniesController],
  providers: [ZoneCompaniesService],
  exports: [ZoneCompaniesService],
})
export class ZoneCompaniesModule {} 