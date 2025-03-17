import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { App_User_Roles as Entity } from 'src/models';
import { ApplicationUserRolesController as Controller } from './app_user_roles.controller';
import { ApplicationUserRolesService as Service } from './app_user_roles.service';

@Module({
  imports: [TypeOrmModule.forFeature([Entity])],
  controllers: [Controller],
  providers: [Service],
})
export class ApplicationUserRolesModule {}
