import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
  UsePipes,
} from '@nestjs/common';
import { ApiBearerAuth, ApiHeader, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { PermissionTitle } from 'src/common/constant';
import { HasPermissions, User } from 'src/common/decorators';
import { SearchQueryDto } from 'src/common/dtos';
import { PermissionsGuard } from 'src/common/guards';
import { IUser } from 'src/common/interfaces';
import { TrimPipe, ValidationPipe } from 'src/common/pipes';
import {
  CreateVoterZonesDto as CreateDto,
  UpdateVoterZonesDto as UpdateDto,
} from './dto';
import { VoterZonesService as Service } from './voter_zones.service';

@ApiTags('Voter Zones')
@Controller('voter-zones')
export class VoterZonesController {
  constructor(private readonly service: Service) {}

  /**
   * Record Creation
   * @User {IUser} user
   * @Body {CreateDto} data
   */
  @ApiOperation({ summary: 'Record Creation' })
  @ApiHeader({ name: 'Authorization', description: 'Bearer Token' })
  @ApiBearerAuth()
  @ApiResponse({ status: 201, description: 'Voter zone created successfully' })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 403, description: 'Forbidden - insufficient permissions' })
  @UsePipes(new ValidationPipe(true))
  @UsePipes(new TrimPipe())
  @HasPermissions([PermissionTitle.VOTER_ZONE_CREATE])
  @UseGuards(JwtAuthGuard, PermissionsGuard)
  @Post()
  async create(@User() user: IUser, @Body() data: CreateDto) {
    try {
      return await this.service.create(user, data);
    } catch (err) {
      throw new HttpException(err, err.status || HttpStatus.BAD_REQUEST, {
        cause: new Error(err),
      });
    }
  }

  /**
   * Record Query
   * @User {IUser} user
   * @Query {SearchQueryDto} query
   */
  @ApiOperation({ summary: 'Record Query' })
  @ApiHeader({ name: 'Authorization', description: 'Bearer Token' })
  @ApiBearerAuth()
  @ApiResponse({ status: 200, description: 'Return list of voter zones' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 403, description: 'Forbidden - insufficient permissions' })
  @UsePipes(new ValidationPipe(true))
  @HasPermissions([PermissionTitle.VOTER_ZONE_READ])
  @UseGuards(JwtAuthGuard, PermissionsGuard)
  @Get()
  async findAll(@User() user: IUser, @Query() query: SearchQueryDto) {
    try {
      return this.service.findAll(user, query);
    } catch (err) {
      throw new HttpException(err, err.status || HttpStatus.BAD_REQUEST, {
        cause: new Error(err),
      });
    }
  }

  /**
   * Record Count
   * @Query {SearchQueryDto} query
   */
  @ApiOperation({ summary: 'Record Count' })
  @ApiHeader({ name: 'Authorization', description: 'Bearer Token' })
  @ApiBearerAuth()
  @ApiResponse({ status: 200, description: 'Return count of voter zones' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 403, description: 'Forbidden - insufficient permissions' })
  @UsePipes(new ValidationPipe(true))
  @HasPermissions([PermissionTitle.VOTER_ZONE_READ])
  @UseGuards(JwtAuthGuard, PermissionsGuard)
  @Get('count')
  async count(@Query() query: SearchQueryDto) {
    try {
      return this.service.count(query);
    } catch (err) {
      throw new HttpException(err, err.status || HttpStatus.BAD_REQUEST, {
        cause: new Error(err),
      });
    }
  }

  /**
   * Record Retrieve
   * @Param {number} id
   * @User {IUser} user
   */
  @ApiOperation({ summary: 'Record Retrieve' })
  @ApiHeader({ name: 'Authorization', description: 'Bearer Token' })
  @ApiBearerAuth()
  @ApiResponse({ status: 200, description: 'Return single voter zone' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 403, description: 'Forbidden - insufficient permissions' })
  @ApiResponse({ status: 404, description: 'Voter zone not found' })
  @UsePipes(new ValidationPipe(true))
  @HasPermissions([PermissionTitle.VOTER_ZONE_READ])
  @UseGuards(JwtAuthGuard, PermissionsGuard)
  @Get(':id')
  async findOne(@Param('id') id: number, @User() user: IUser) {
    try {
      return this.service.findOne(id, user);
    } catch (err) {
      throw new HttpException(err, err.status || HttpStatus.BAD_REQUEST, {
        cause: new Error(err),
      });
    }
  }

  /**
   * Record Update
   * @Param {number} id
   * @User {IUser} user
   * @Body {UpdateDto} data
   */
  @ApiOperation({ summary: 'Record Update' })
  @ApiHeader({ name: 'Authorization', description: 'Bearer Token' })
  @ApiBearerAuth()
  @ApiResponse({ status: 200, description: 'Voter zone updated successfully' })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 403, description: 'Forbidden - insufficient permissions' })
  @ApiResponse({ status: 404, description: 'Voter zone not found' })
  @UsePipes(new ValidationPipe(true))
  @UsePipes(new TrimPipe())
  @HasPermissions([PermissionTitle.VOTER_ZONE_UPDATE])
  @UseGuards(JwtAuthGuard, PermissionsGuard)
  @Patch(':id')
  async update(
    @Param('id') id: number,
    @User() user: IUser,
    @Body() data: UpdateDto,
  ) {
    try {
      return this.service.update(id, user, data);
    } catch (err) {
      throw new HttpException(err, err.status || HttpStatus.BAD_REQUEST, {
        cause: new Error(err),
      });
    }
  }

  /**
   * Record Delete
   * @Param {number} id
   * @User {IUser} user
   */
  @ApiOperation({ summary: 'Record Delete' })
  @ApiHeader({ name: 'Authorization', description: 'Bearer Token' })
  @ApiBearerAuth()
  @ApiResponse({ status: 200, description: 'Voter zone deleted successfully' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 403, description: 'Forbidden - insufficient permissions' })
  @ApiResponse({ status: 404, description: 'Voter zone not found' })
  @UsePipes(new ValidationPipe(true))
  @HasPermissions([PermissionTitle.VOTER_ZONE_DELETE])
  @UseGuards(JwtAuthGuard, PermissionsGuard)
  @Delete(':id')
  async remove(@Param('id') id: number, @User() user: IUser) {
    try {
      return this.service.remove(id, user);
    } catch (err) {
      throw new HttpException(err, err.status || HttpStatus.BAD_REQUEST, {
        cause: new Error(err),
      });
    }
  }
}
