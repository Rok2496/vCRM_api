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
import { CreateZoneContactsDto, UpdateZoneContactsDto } from './dto';
import { ZoneContactsService } from './zone_contacts.service';
import { Zone_Contacts } from '../models/zone_contacts.entity';

@ApiTags('Zone Contacts')
@Controller('zone-contacts')
export class ZoneContactsController {
  constructor(private readonly zoneContactsService: ZoneContactsService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create a new zone contact association' })
  @ApiResponse({
    status: 201,
    description: 'The zone contact association has been successfully created.',
    type: Zone_Contacts,
  })
  @ApiResponse({ status: 400, description: 'Bad request.' })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  create(@Body() createZoneContactsDto: CreateZoneContactsDto, @Req() req) {
    return this.zoneContactsService.create(createZoneContactsDto, req.user);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get all zone contact associations' })
  @ApiResponse({
    status: 200,
    description: 'List of all zone contact associations.',
    type: [Zone_Contacts],
  })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  findAll(@Req() req) {
    return this.zoneContactsService.findAll(req.user);
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get a zone contact association by ID' })
  @ApiResponse({
    status: 200,
    description: 'The found zone contact association.',
    type: Zone_Contacts,
  })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  @ApiResponse({ status: 404, description: 'Zone contact association not found.' })
  findOne(@Param('id') id: string, @Req() req) {
    return this.zoneContactsService.findOne(+id, req.user);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update a zone contact association' })
  @ApiResponse({
    status: 200,
    description: 'The zone contact association has been successfully updated.',
    type: Zone_Contacts,
  })
  @ApiResponse({ status: 400, description: 'Bad request.' })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  @ApiResponse({ status: 404, description: 'Zone contact association not found.' })
  update(
    @Param('id') id: string,
    @Body() updateZoneContactsDto: UpdateZoneContactsDto,
    @Req() req,
  ) {
    return this.zoneContactsService.update(+id, updateZoneContactsDto, req.user);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Delete a zone contact association' })
  @ApiResponse({
    status: 200,
    description: 'The zone contact association has been successfully deleted.',
  })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  @ApiResponse({ status: 404, description: 'Zone contact association not found.' })
  remove(@Param('id') id: string, @Req() req) {
    return this.zoneContactsService.remove(+id, req.user);
  }
} 