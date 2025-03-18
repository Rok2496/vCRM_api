import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Task_Notes } from '../models/task_notes.entity';
import { TaskNotesController } from './task_notes.controller';
import { TaskNotesService } from './task_notes.service';

@Module({
  imports: [TypeOrmModule.forFeature([Task_Notes])],
  controllers: [TaskNotesController],
  providers: [TaskNotesService],
  exports: [TaskNotesService],
})
export class TaskNotesModule {} 