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
import { CreateZoneCompaniesDto, UpdateZoneCompaniesDto } from './dto';
import { ZoneCompaniesService } from './zone_companies.service';
import { Zone_Companies } from '../models/zone_companies.entity';

@ApiTags('Zone Companies')
@Controller('zone-companies')
export class ZoneCompaniesController {
  constructor(private readonly zoneCompaniesService: ZoneCompaniesService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create a new zone company association' })
  @ApiResponse({
    status: 201,
    description: 'The zone company association has been successfully created.',
    type: Zone_Companies,
  })
  @ApiResponse({ status: 400, description: 'Bad request.' })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  create(@Body() createZoneCompaniesDto: CreateZoneCompaniesDto, @Req() req) {
    return this.zoneCompaniesService.create(createZoneCompaniesDto, req.user);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get all zone company associations' })
  @ApiResponse({
    status: 200,
    description: 'List of all zone company associations.',
    type: [Zone_Companies],
  })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  findAll(@Req() req) {
    return this.zoneCompaniesService.findAll(req.user);
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get a zone company association by ID' })
  @ApiResponse({
    status: 200,
    description: 'The found zone company association.',
    type: Zone_Companies,
  })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  @ApiResponse({ status: 404, description: 'Zone company association not found.' })
  findOne(@Param('id') id: string, @Req() req) {
    return this.zoneCompaniesService.findOne(+id, req.user);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update a zone company association' })
  @ApiResponse({
    status: 200,
    description: 'The zone company association has been successfully updated.',
    type: Zone_Companies,
  })
  @ApiResponse({ status: 400, description: 'Bad request.' })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  @ApiResponse({ status: 404, description: 'Zone company association not found.' })
  update(
    @Param('id') id: string,
    @Body() updateZoneCompaniesDto: UpdateZoneCompaniesDto,
    @Req() req,
  ) {
    return this.zoneCompaniesService.update(+id, updateZoneCompaniesDto, req.user);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Delete a zone company association' })
  @ApiResponse({
    status: 200,
    description: 'The zone company association has been successfully deleted.',
  })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  @ApiResponse({ status: 404, description: 'Zone company association not found.' })
  remove(@Param('id') id: string, @Req() req) {
    return this.zoneCompaniesService.remove(+id, req.user);
  }
} 