import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Zone_Contacts } from '../models/zone_contacts.entity';
import { ZoneContactsController } from './zone_contacts.controller';
import { ZoneContactsService } from './zone_contacts.service';

@Module({
  imports: [TypeOrmModule.forFeature([Zone_Contacts])],
  controllers: [ZoneContactsController],
  providers: [ZoneContactsService],
  exports: [ZoneContactsService],
})
export class ZoneContactsModule {} 