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
import { CreateZoneAccountTeamsDto, UpdateZoneAccountTeamsDto } from './dto';
import { ZoneAccountTeamsService } from './zone_account_teams.service';
import { Zone_Account_Teams } from '../models/zone_account_teams.entity';

@ApiTags('Zone Account Teams')
@Controller('zone-account-teams')
export class ZoneAccountTeamsController {
  constructor(private readonly zoneAccountTeamsService: ZoneAccountTeamsService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create a new zone account team member' })
  @ApiResponse({
    status: 201,
    description: 'The zone account team member has been successfully created.',
    type: Zone_Account_Teams,
  })
  @ApiResponse({ status: 400, description: 'Bad request.' })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  create(@Body() createZoneAccountTeamsDto: CreateZoneAccountTeamsDto, @Req() req) {
    return this.zoneAccountTeamsService.create(createZoneAccountTeamsDto, req.user);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get all zone account team members' })
  @ApiResponse({
    status: 200,
    description: 'List of all zone account team members.',
    type: [Zone_Account_Teams],
  })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  findAll(@Req() req) {
    return this.zoneAccountTeamsService.findAll(req.user);
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get a zone account team member by ID' })
  @ApiResponse({
    status: 200,
    description: 'The found zone account team member.',
    type: Zone_Account_Teams,
  })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  @ApiResponse({ status: 404, description: 'Zone account team member not found.' })
  findOne(@Param('id') id: string, @Req() req) {
    return this.zoneAccountTeamsService.findOne(+id, req.user);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update a zone account team member' })
  @ApiResponse({
    status: 200,
    description: 'The zone account team member has been successfully updated.',
    type: Zone_Account_Teams,
  })
  @ApiResponse({ status: 400, description: 'Bad request.' })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  @ApiResponse({ status: 404, description: 'Zone account team member not found.' })
  update(
    @Param('id') id: string,
    @Body() updateZoneAccountTeamsDto: UpdateZoneAccountTeamsDto,
    @Req() req,
  ) {
    return this.zoneAccountTeamsService.update(+id, updateZoneAccountTeamsDto, req.user);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Delete a zone account team member' })
  @ApiResponse({
    status: 200,
    description: 'The zone account team member has been successfully deleted.',
  })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  @ApiResponse({ status: 404, description: 'Zone account team member not found.' })
  remove(@Param('id') id: string, @Req() req) {
    return this.zoneAccountTeamsService.remove(+id, req.user);
  }
} 