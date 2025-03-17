import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Master_Task_Statuses as Entity } from 'src/models';
import { MasterTaskStatusesController as Controller } from './master_task_statuses.controller';
import { MasterTaskStatusesService as Service } from './master_task_statuses.service';

@Module({
  imports: [TypeOrmModule.forFeature([Entity])],
  controllers: [Controller],
  providers: [Service],
})
export class MasterTaskStatusesModule {}
