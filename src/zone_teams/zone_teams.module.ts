import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Zone_Teams } from '../models/zone_teams.entity';
import { ZoneTeamsController } from './zone_teams.controller';
import { ZoneTeamsService } from './zone_teams.service';

@Module({
  imports: [TypeOrmModule.forFeature([Zone_Teams])],
  controllers: [ZoneTeamsController],
  providers: [ZoneTeamsService],
  exports: [ZoneTeamsService],
})
export class ZoneTeamsModule {} 