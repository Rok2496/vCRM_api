import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Data_Repos as Entity } from 'src/models';
import { DataReposController as Controller } from './data_repos.controller';
import { DataReposService as Service } from './data_repos.service';

@Module({
  imports: [TypeOrmModule.forFeature([Entity])],
  controllers: [Controller],
  providers: [Service],
})
export class DataReposModule {}
