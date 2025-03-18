import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VoterTags as Entity } from 'src/models';
import { VoterTagsController as Controller } from './voter_tags.controller';
import { VoterTagsService as Service } from './voter_tags.service';

@Module({
  imports: [TypeOrmModule.forFeature([Entity])],
  controllers: [Controller],
  providers: [Service],
})
export class VoterTagsModule {}
