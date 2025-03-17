import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Master_Connect_Channels as Entity } from 'src/models';
import { MasterConnectChannelsController as Controller } from './master_connect_channels.controller';
import { MasterConnectChannelsService as Service } from './master_connect_channels.service';

@Module({
  imports: [TypeOrmModule.forFeature([Entity])],
  controllers: [Controller],
  providers: [Service],
})
export class MasterConnectChannelsModule {}
