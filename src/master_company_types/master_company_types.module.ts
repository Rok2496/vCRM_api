import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Master_Company_Types as Entity } from 'src/models';
import { MasterCompanyTypesController as Controller } from './master_company_types.controller';
import { MasterCompanyTypesService as Service } from './master_company_types.service';

@Module({
  imports: [TypeOrmModule.forFeature([Entity])],
  controllers: [Controller],
  providers: [Service],
})
export class MasterCompanyTypesModule {}
