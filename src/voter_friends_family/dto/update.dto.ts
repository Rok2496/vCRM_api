import { PartialType } from '@nestjs/swagger';
import { CreateVoterFriendsFamilyDto } from './create.dto';

export class UpdateVoterFriendsFamilyDto extends PartialType(CreateVoterFriendsFamilyDto) {}