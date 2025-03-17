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
import {
  ApiBearerAuth,
  ApiHeader,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { SearchQueryDto } from 'src/common/dtos';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { HasPermissions, User } from '../common/decorators';
import { IUser } from '../common/interfaces';
import { TrimPipe, ValidationPipe } from '../common/pipes';
import { UpdateMasterPhotoLibraryDto } from './dto';
import { CreateMasterPhotoLibraryDto } from './dto/create.dto';
import { MasterPhotoLibrariesService } from './master_photo_libraries.service';
import { PermissionTitle } from 'src/common/constant';
import { PermissionsGuard } from 'src/common/guards';

@ApiTags('master-photo-libraries')
@ApiResponse({
  status: HttpStatus.INTERNAL_SERVER_ERROR,
  description: 'Server Error!',
})
@Controller('master-photo-libraries')
export class MasterPhotoLibrariesController {
  constructor(private readonly service: MasterPhotoLibrariesService) {}

  /**
   * Record create
   * @Body {CreateMasterPhotoLibraryDto} data
   * @user {IUser} user
   * @returns {Promise<>}
   */
  @ApiOperation({ summary: 'Record creation' })
  @ApiHeader({
    name: 'Authorization',
    description: 'Bearer Token',
  })
  @ApiBearerAuth()
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Return Record.',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Invalid data',
  })
  @ApiResponse({
    status: HttpStatus.NOT_ACCEPTABLE,
    description: 'Record already exist',
  })
  @UsePipes(new ValidationPipe(true))
  @UsePipes(new TrimPipe())
  @HasPermissions([PermissionTitle.MASTER_PHOTO_LIBRARY_CREATE])
  @UseGuards(JwtAuthGuard, PermissionsGuard)
  @Post()
  create(@User() user: IUser, @Body() data: CreateMasterPhotoLibraryDto) {
    try {
      return this.service.create(data, user);
    } catch (err) {
      throw new HttpException(err, err.status || HttpStatus.BAD_REQUEST, {
        cause: new Error(err),
      });
    }
  }

  /**
   * Search and fetch records
   * @returns {Promise<IBrands>}
   */
  @ApiOperation({ summary: 'Get all record' })
  @UsePipes(new ValidationPipe(true))
  @UseGuards(JwtAuthGuard)
  @Get()
  public find(@User() user: IUser, @Query() query: SearchQueryDto) {
    try {
      return this.service.findAll(query);
    } catch (err) {
      throw new HttpException(err, err.status || HttpStatus.BAD_REQUEST, {
        cause: new Error(err),
      });
    }
  }

  /**
   * count records
   * @returns {Promise<number>}
   */
  @ApiOperation({ summary: 'Count records' })
  @UsePipes(new ValidationPipe(true))
  @UseGuards(JwtAuthGuard)
  @Get('count')
  public count(@Query() query: SearchQueryDto): Promise<number> {
    try {
      return this.service.count(query);
    } catch (err) {
      throw new HttpException(err, err.status || HttpStatus.BAD_REQUEST, {
        cause: new Error(err),
      });
    }
  }

  /**
   * @Param {number} id
   * @returns {Promise<IBrand>}
   */
  @ApiOperation({ summary: 'Get record from id' })
  @ApiResponse({ status: 200, description: 'Return record.' })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'User Not found.',
  })
  @Get(':id')
  public async getOne(@Param('id') id: number) {
    try {
      return await this.service.findOne(id);
    } catch (err) {
      throw new HttpException(err, err.status || HttpStatus.BAD_REQUEST, {
        cause: new Error(err),
      });
    }
  }

  /**
   * Record update
   * @Body {UpdateBrandDto} data
   * @User {IUser} user
   * @returns {Promise<IBrand>}
   */
  @ApiHeader({
    name: 'Authorization',
    description: 'Bearer Token',
  })
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Record update' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Return updated record.',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Record not found',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Invalid data',
  })
  @HasPermissions([PermissionTitle.MASTER_PHOTO_LIBRARY_UPDATE])
  @UseGuards(JwtAuthGuard, PermissionsGuard)
  @Patch(':id')
  public async update(
    @User() user: IUser,
    @Param('id') id: number,
    @Body() data: UpdateMasterPhotoLibraryDto,
  ) {
    try {
      return await this.service.update(id, data, user);
    } catch (err) {
      throw new HttpException(err, err.status || HttpStatus.BAD_REQUEST, {
        cause: new Error(err),
      });
    }
  }

  /**
   * Record delete
   * @User {IUser} user
   */
  @ApiHeader({
    name: 'Authorization',
    description: 'Bearer Token',
  })
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Record delete' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Return ok.',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Record not found',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Invalid data',
  })
  @HasPermissions([PermissionTitle.MASTER_PHOTO_LIBRARY_DELETE])
  @UseGuards(JwtAuthGuard, PermissionsGuard)
  @Delete(':id')
  public async deleteById(@User() user: IUser, @Param('id') id: number) {
    try {
      return await this.service.remove(id);
    } catch (err) {
      throw new HttpException(err, err.status || HttpStatus.BAD_REQUEST, {
        cause: new Error(err),
      });
    }
  }
}
