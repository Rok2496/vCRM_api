import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { App_Permissions as Entity } from 'src/models';
import { ApplicationPermissionsController as Controller } from './app_permissions.controller';
import { ApplicationPermissionsService as Service } from './app_permissions.service';

@Module({
  imports: [TypeOrmModule.forFeature([Entity])],
  controllers: [Controller],
  providers: [Service],
})
export class ApplicationPermissionsModule {}
