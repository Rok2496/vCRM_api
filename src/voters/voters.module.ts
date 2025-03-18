import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Voters as Entity } from 'src/models';
import { VotersController as Controller } from './voters.controller';
import { VotersService as Service } from './voters.service';

@Module({
  imports: [TypeOrmModule.forFeature([Entity])],
  controllers: [Controller],
  providers: [Service],
})
export class VotersModule {}
