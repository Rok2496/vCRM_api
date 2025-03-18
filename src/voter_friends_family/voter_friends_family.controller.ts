import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { CreateVoterFriendsFamilyDto, UpdateVoterFriendsFamilyDto } from './dto';
import { VoterFriendsFamilyService } from './voter_friends_family.service';
import { Voter_Friends_Family } from '../models/voter_friends_family.entity';

@ApiTags('Voter Friends & Family')
@Controller('voter-friends-family')
export class VoterFriendsFamilyController {
  constructor(private readonly voterFriendsFamilyService: VoterFriendsFamilyService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create a new voter relationship' })
  @ApiResponse({
    status: 201,
    description: 'The voter relationship has been successfully created.',
    type: Voter_Friends_Family,
  })
  @ApiResponse({ status: 400, description: 'Bad request.' })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  create(@Body() createVoterFriendsFamilyDto: CreateVoterFriendsFamilyDto, @Req() req) {
    return this.voterFriendsFamilyService.create(createVoterFriendsFamilyDto, req.user);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get all voter relationships' })
  @ApiResponse({
    status: 200,
    description: 'List of all voter relationships.',
    type: [Voter_Friends_Family],
  })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  findAll(@Req() req) {
    return this.voterFriendsFamilyService.findAll(req.user);
  }

  @Get('voter/:voterId')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get all relationships for a specific voter' })
  @ApiResponse({
    status: 200,
    description: 'List of all relationships for the specified voter.',
    type: [Voter_Friends_Family],
  })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  findAllByVoter(@Param('voterId') voterId: string, @Req() req) {
    return this.voterFriendsFamilyService.findAllByVoter(+voterId, req.user);
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get a voter relationship by ID' })
  @ApiResponse({
    status: 200,
    description: 'The found voter relationship.',
    type: Voter_Friends_Family,
  })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  @ApiResponse({ status: 404, description: 'Voter relationship not found.' })
  findOne(@Param('id') id: string, @Req() req) {
    return this.voterFriendsFamilyService.findOne(+id, req.user);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update a voter relationship' })
  @ApiResponse({
    status: 200,
    description: 'The voter relationship has been successfully updated.',
    type: Voter_Friends_Family,
  })
  @ApiResponse({ status: 400, description: 'Bad request.' })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  @ApiResponse({ status: 404, description: 'Voter relationship not found.' })
  update(
    @Param('id') id: string,
    @Body() updateVoterFriendsFamilyDto: UpdateVoterFriendsFamilyDto,
    @Req() req,
  ) {
    return this.voterFriendsFamilyService.update(+id, updateVoterFriendsFamilyDto, req.user);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Delete a voter relationship' })
  @ApiResponse({
    status: 200,
    description: 'The voter relationship has been successfully deleted.',
  })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  @ApiResponse({ status: 404, description: 'Voter relationship not found.' })
  remove(@Param('id') id: string, @Req() req) {
    return this.voterFriendsFamilyService.remove(+id, req.user);
  }
}