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
  ApiTags,
} from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { PermissionTitle } from 'src/common/constant';
import { HasPermissions, User } from 'src/common/decorators';
import { SearchQueryDto } from 'src/common/dtos';
import { PermissionsGuard } from 'src/common/guards';
import { IUser } from 'src/common/interfaces';
import { NullValidationPipe, TrimPipe, ValidationPipe } from 'src/common/pipes';
import { ApplicationUsersService as Service } from './app_users.service';
import {
  CreateApplicationUsersDto as CreateDto,
  RequestLoginOtpDto,
  ResendOtpDto,
  UpdateApplicationUsersDto as UpdateDto,
  VerifyEmailDto,
  VerifyLoginOtpDto,
} from './dto';

@ApiTags('Application Users')
@Controller('app-users')
export class ApplicationUsersController {
  constructor(private readonly service: Service) {}

  /**
   * Record Creation
   * @User {IUser} user
   * @Body {CreateDto} data
   */
  @ApiOperation({ summary: 'Record Creation' })
  @UsePipes(new NullValidationPipe())
  @UsePipes(new ValidationPipe(true))
  @UsePipes(new TrimPipe())
  @Post()
  async create(@Body() data: CreateDto) {
    try {
      console.log('Received data:', JSON.stringify(data, null, 2));

      return await this.service.create(data);
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
  @UsePipes(new ValidationPipe(true))
  @UseGuards(JwtAuthGuard)
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
  @UsePipes(new ValidationPipe(true))
  @UseGuards(JwtAuthGuard)
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
  @UsePipes(new ValidationPipe(true))
  @UseGuards(JwtAuthGuard)
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
  @UsePipes(new ValidationPipe(true))
  @UsePipes(new TrimPipe())
  @HasPermissions([PermissionTitle.APP_USER_UPDATE])
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
  @UsePipes(new ValidationPipe(true))
  @HasPermissions([PermissionTitle.APP_USER_DELETE])
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

  @ApiOperation({ summary: 'Verify Email with OTP' })
  @Post('verify-email')
  async verifyEmail(@Body() data: VerifyEmailDto) {
    try {
      const result = await this.service.verifyEmail(data.email, data.otp);
      if (!result) {
        throw new HttpException('Invalid OTP', HttpStatus.BAD_REQUEST);
      }
      return { message: 'Email verified successfully' };
    } catch (err) {
      throw new HttpException(err, err.status || HttpStatus.BAD_REQUEST, {
        cause: new Error(err),
      });
    }
  }

  @ApiOperation({ summary: 'Resend OTP for Email Verification' })
  @UsePipes(new ValidationPipe(true))
  @Post('resend-otp')
  async resendOtp(@Body() data: ResendOtpDto) {
    try {
      return await this.service.resendOtp(data);
    } catch (err) {
      throw new HttpException(err, err.status || HttpStatus.BAD_REQUEST);
    }
  }

  @ApiOperation({ summary: 'Request Login OTP' })
  @UsePipes(new ValidationPipe(true))
  @Post('request-login-otp')
  async requestLoginOtp(@Body() data: RequestLoginOtpDto) {
    try {
      return await this.service.requestLoginOtp(data.email);
    } catch (err) {
      throw new HttpException(err, err.status || HttpStatus.BAD_REQUEST);
    }
  }

  @ApiOperation({ summary: 'Verify Login OTP and Get Token' })
  @UsePipes(new ValidationPipe(true))
  @Post('verify-login-otp')
  async verifyLoginOtp(@Body() data: VerifyLoginOtpDto) {
    try {
      return await this.service.verifyLoginOtp(data.email, data.otp);
    } catch (err) {
      throw new HttpException(err, err.status || HttpStatus.BAD_REQUEST);
    }
  }
}
