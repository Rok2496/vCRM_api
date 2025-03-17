import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { App_Role_permissions as Entity } from 'src/models';
import { ApplicationRolePermissionsController as Controller } from './app_role_permissions.controller';
import { ApplicationRolePermissionsService as Service } from './app_role_permissions.service';

@Module({
  imports: [TypeOrmModule.forFeature([Entity])],
  controllers: [Controller],
  providers: [Service],
})
export class ApplicationRolePermissionsModule {}
