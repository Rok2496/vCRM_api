import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpException,
  HttpStatus,
  Logger,
  Post,
  Req,
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
import { Request } from 'express';
import { User } from 'src/common/decorators';
import { IUser } from 'src/common/interfaces';
import { TrimPipe, ValidationPipe } from 'src/common/pipes';
import { AuthService } from './auth.service';
import { AuthDTO } from './dto/auth.dto';
import { JwtAuthGuard } from './guards/jwt-auth.guard';

/**
 * Auth Controller
 */
@Controller()
export class AuthController {
  private readonly logger = new Logger(AuthController.name);

  /**
   * Constructor
   * @param {AuthService} authService
   */
  constructor(private readonly authService: AuthService) { }

  /**
   * User login with jwtToken
   * @Body {AuthDTO} loginDto
   * @returns {Promise<any>}
   */
  @ApiTags('Auth')
  @ApiOperation({ summary: 'User Login' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Return user information.',
  })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: 'Server Error!',
  })
  @ApiResponse({
    status: HttpStatus.METHOD_NOT_ALLOWED,
    description: 'Method not allowed',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Authentication failed. User not found!',
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description:
      'Unauthorized access: User verification is necessary or Wrong password',
  })
  @ApiResponse({
    status: HttpStatus.FORBIDDEN,
    description: 'User is deleted or User account is on hold',
  })
  @HttpCode(200)
  @Post('login')
  public async login(
    @Req() req: Request,
    @Body() payload: AuthDTO,
  ): Promise<any> {
    const authRes = await this.authService.login(payload);
    console.log("authRes", authRes);
    const result = {
      status: 'SUCCESS',
      data: authRes.user,
      token: authRes.token,
      expires_in: authRes.expires_in,
      message: 'Login successful',
    };
    req.res.set({
      'X-TUTORSPLAN-KEY': authRes.token,
      'X-TUTORSPLAN-KEY-EXPIRES': authRes.expires_in,
    });
    return result;
  }

  /**
   * Get Current User Data
   * @User {IUser} user
   * @Body {CreateDto} data
   */
  @ApiOperation({ summary: 'Get Current User Data' })
  @ApiHeader({ name: 'Authorization', description: 'Bearer Token' })
  @ApiBearerAuth()
  @UsePipes(new ValidationPipe(true))
  @UsePipes(new TrimPipe())
  @UseGuards(JwtAuthGuard)
  @Get('me')
  public async me(@User() user: IUser) {
    try {
      return await this.authService.me(user);
    } catch (err) {
      throw new HttpException(err, err.status || HttpStatus.BAD_REQUEST, {
        cause: new Error(err),
      });
    }
  }
}
