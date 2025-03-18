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
import { CreateZoneTeamsDto, UpdateZoneTeamsDto } from './dto';
import { ZoneTeamsService } from './zone_teams.service';
import { Zone_Teams } from '../models/zone_teams.entity';

@ApiTags('Zone Teams')
@Controller('zone-teams')
export class ZoneTeamsController {
  constructor(private readonly zoneTeamsService: ZoneTeamsService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create a new zone team' })
  @ApiResponse({
    status: 201,
    description: 'The zone team has been successfully created.',
    type: Zone_Teams,
  })
  @ApiResponse({ status: 400, description: 'Bad request.' })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  create(@Body() createZoneTeamsDto: CreateZoneTeamsDto, @Req() req) {
    return this.zoneTeamsService.create(createZoneTeamsDto, req.user);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get all zone teams' })
  @ApiResponse({
    status: 200,
    description: 'List of all zone teams.',
    type: [Zone_Teams],
  })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  findAll(@Req() req) {
    return this.zoneTeamsService.findAll(req.user);
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get a zone team by ID' })
  @ApiResponse({
    status: 200,
    description: 'The found zone team.',
    type: Zone_Teams,
  })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  @ApiResponse({ status: 404, description: 'Zone team not found.' })
  findOne(@Param('id') id: string, @Req() req) {
    return this.zoneTeamsService.findOne(+id, req.user);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update a zone team' })
  @ApiResponse({
    status: 200,
    description: 'The zone team has been successfully updated.',
    type: Zone_Teams,
  })
  @ApiResponse({ status: 400, description: 'Bad request.' })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  @ApiResponse({ status: 404, description: 'Zone team not found.' })
  update(
    @Param('id') id: string,
    @Body() updateZoneTeamsDto: UpdateZoneTeamsDto,
    @Req() req,
  ) {
    return this.zoneTeamsService.update(+id, updateZoneTeamsDto, req.user);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Delete a zone team' })
  @ApiResponse({
    status: 200,
    description: 'The zone team has been successfully deleted.',
  })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  @ApiResponse({ status: 404, description: 'Zone team not found.' })
  remove(@Param('id') id: string, @Req() req) {
    return this.zoneTeamsService.remove(+id, req.user);
  }
} 