import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import {
  App_Permissions,
  App_Role_permissions,
  App_Roles as Entity,
} from 'src/models';
import { ApplicationRolesController as Controller } from './app_roles.controller';
import { ApplicationRolesService as Service } from './app_roles.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Entity, App_Role_permissions, App_Permissions]),
  ],
  controllers: [Controller],
  providers: [Service],
})
export class ApplicationRolesModule {}
