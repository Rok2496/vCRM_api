import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Master_Zip_Codes as Entity } from 'src/models';
import { MasterZipCodesController as Controller } from './master_zip_codes.controller';
import { MasterZipCodesService as Service } from './master_zip_codes.service';

@Module({
  imports: [TypeOrmModule.forFeature([Entity])],
  controllers: [Controller],
  providers: [Service],
})
export class MasterZipCodesModule {}
