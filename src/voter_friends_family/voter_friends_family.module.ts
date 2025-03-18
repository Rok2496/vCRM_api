import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Voter_Friends_Family } from '../models/voter_friends_family.entity';
import { VoterFriendsFamilyController } from './voter_friends_family.controller';
import { VoterFriendsFamilyService } from './voter_friends_family.service';

@Module({
  imports: [TypeOrmModule.forFeature([Voter_Friends_Family])],
  controllers: [VoterFriendsFamilyController],
  providers: [VoterFriendsFamilyService],
  exports: [VoterFriendsFamilyService],
})
export class VoterFriendsFamilyModule {} 