import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Master_Contact_Types as Entity } from 'src/models';
import { MasterContactTypesController as Controller } from './master_contact_types.controller';
import { MasterContactTypesService as Service } from './master_contact_types.service';

@Module({
  imports: [TypeOrmModule.forFeature([Entity])],
  controllers: [Controller],
  providers: [Service],
})
export class MasterContactTypesModule {}
