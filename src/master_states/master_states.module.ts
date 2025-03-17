import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Master_States as Entity } from 'src/models';
import { MasterStatesController as Controller } from './master_states.controller';
import { MasterStatesService as Service } from './master_states.service';

@Module({
  imports: [TypeOrmModule.forFeature([Entity])],
  controllers: [Controller],
  providers: [Service],
})
export class MasterStatesModule {}
