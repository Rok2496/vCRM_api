import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { App_User_Custom_Permissions as Entity } from 'src/models';
import { ApplicationUserCustomPermissionsController as Controller } from './app_user_custom_permissions.controller';
import { ApplicationUserCustomPermissionsService as Service } from './app_user_custom_permissions.service';

@Module({
  imports: [TypeOrmModule.forFeature([Entity])],
  controllers: [Controller],
  providers: [Service],
})
export class ApplicationUserCustomPermissionsModule {}
