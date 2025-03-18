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
import { CreateZoneAreaByZipcodesDto, UpdateZoneAreaByZipcodesDto } from './dto';
import { ZoneAreaByZipcodesService } from './zone_area_by_zipcodes.service';
import { Zone_Area_By_Zipcodes } from '../models/zone_area_by_zipcodes.entity';

@ApiTags('Zone Area By Zipcodes')
@Controller('zone-area-by-zipcodes')
export class ZoneAreaByZipcodesController {
  constructor(private readonly zoneAreaByZipcodesService: ZoneAreaByZipcodesService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create a new zone area by zipcode' })
  @ApiResponse({
    status: 201,
    description: 'The zone area by zipcode has been successfully created.',
    type: Zone_Area_By_Zipcodes,
  })
  @ApiResponse({ status: 400, description: 'Bad request.' })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  create(@Body() createZoneAreaByZipcodesDto: CreateZoneAreaByZipcodesDto, @Req() req) {
    return this.zoneAreaByZipcodesService.create(createZoneAreaByZipcodesDto, req.user);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get all zone areas by zipcode' })
  @ApiResponse({
    status: 200,
    description: 'List of all zone areas by zipcode.',
    type: [Zone_Area_By_Zipcodes],
  })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  findAll(@Req() req) {
    return this.zoneAreaByZipcodesService.findAll(req.user);
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get a zone area by zipcode by ID' })
  @ApiResponse({
    status: 200,
    description: 'The found zone area by zipcode.',
    type: Zone_Area_By_Zipcodes,
  })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  @ApiResponse({ status: 404, description: 'Zone area by zipcode not found.' })
  findOne(@Param('id') id: string, @Req() req) {
    return this.zoneAreaByZipcodesService.findOne(+id, req.user);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update a zone area by zipcode' })
  @ApiResponse({
    status: 200,
    description: 'The zone area by zipcode has been successfully updated.',
    type: Zone_Area_By_Zipcodes,
  })
  @ApiResponse({ status: 400, description: 'Bad request.' })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  @ApiResponse({ status: 404, description: 'Zone area by zipcode not found.' })
  update(
    @Param('id') id: string,
    @Body() updateZoneAreaByZipcodesDto: UpdateZoneAreaByZipcodesDto,
    @Req() req,
  ) {
    return this.zoneAreaByZipcodesService.update(+id, updateZoneAreaByZipcodesDto, req.user);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Delete a zone area by zipcode' })
  @ApiResponse({
    status: 200,
    description: 'The zone area by zipcode has been successfully deleted.',
  })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  @ApiResponse({ status: 404, description: 'Zone area by zipcode not found.' })
  remove(@Param('id') id: string, @Req() req) {
    return this.zoneAreaByZipcodesService.remove(+id, req.user);
  }
} 