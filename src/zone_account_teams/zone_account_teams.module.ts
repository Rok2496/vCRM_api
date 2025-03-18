import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Zone_Account_Teams } from '../models/zone_account_teams.entity';
import { ZoneAccountTeamsController } from './zone_account_teams.controller';
import { ZoneAccountTeamsService } from './zone_account_teams.service';

@Module({
  imports: [TypeOrmModule.forFeature([Zone_Account_Teams])],
  controllers: [ZoneAccountTeamsController],
  providers: [ZoneAccountTeamsService],
  exports: [ZoneAccountTeamsService],
})
export class ZoneAccountTeamsModule {} 