import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Team_Weekly_Work_Schedules } from '../models/team_weekly_work_schedules.entity';
import { TeamWeeklyWorkSchedulesController } from './team_weekly_work_schedules.controller';
import { TeamWeeklyWorkSchedulesService } from './team_weekly_work_schedules.service';

@Module({
  imports: [TypeOrmModule.forFeature([Team_Weekly_Work_Schedules])],
  controllers: [TeamWeeklyWorkSchedulesController],
  providers: [TeamWeeklyWorkSchedulesService],
  exports: [TeamWeeklyWorkSchedulesService],
})
export class TeamWeeklyWorkSchedulesModule {}