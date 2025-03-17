import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { App_Notifications as Entity } from 'src/models';
import { ApplicationNotificationsController as Controller } from './app_notifications.controller';
import { ApplicationNotificationsService as Service } from './app_notifications.service';

@Module({
  imports: [TypeOrmModule.forFeature([Entity])],
  controllers: [Controller],
  providers: [Service],
})
export class ApplicationNotificationsModule {}
