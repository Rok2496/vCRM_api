import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNumber, IsOptional, IsString } from 'class-validator';

enum FriendsFamilyType {
  Friend = 'Friend',
  Family = 'Family',
  FamilySpouse = 'Family-Spouse',
  Colleague = 'Colleague',
  Neighbor = 'Neighbor',
  Acquaintance = 'Acquaintance',
}

export class CreateVoterFriendsFamilyDto {
  @ApiProperty({
    description: 'The relationship type between the voters',
    enum: FriendsFamilyType,
    example: 'Friend',
    required: true,
  })
  @IsEnum(FriendsFamilyType)
  friends_family_type: string;

  @ApiProperty({
    description: 'The influence score of the relationship (1-10)',
    example: 8,
    required: false,
  })
  @IsNumber()
  @IsOptional()
  influence_score?: number;

  @ApiProperty({
    description: 'Notes about the relationship',
    example: 'They have known each other for 10 years and share similar political views.',
    required: false,
  })
  @IsString()
  @IsOptional()
  notes?: string;

  @ApiProperty({
    description: 'The ID of the primary voter in the relationship',
    example: 1,
    required: true,
  })
  @IsNumber()
  primary_voter_id: number;

  @ApiProperty({
    description: 'The ID of the related voter in the relationship',
    example: 2,
    required: true,
  })
  @IsNumber()
  related_voter_id: number;
} 