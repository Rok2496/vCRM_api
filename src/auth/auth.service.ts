import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { Repository } from 'typeorm';
import { IApp_User, IUser } from '../common/interfaces';
import { App_Users } from '../models';
import { AuthDTO } from './dto/auth.dto';
import { JwtPayload } from './interfaces/jwt.payload';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(App_Users)
    private readonly userRepository: Repository<IApp_User>,
    private readonly jwtService: JwtService,
  ) { }

  /**
   * Fetches a user from database by email
   * @param {string} email
   * @returns {Promise<IApp_User>} queried user data
   */
  private async findByEmail(email: string): Promise<IApp_User> {
    try {
      const user = await this.userRepository.findOne({
        where: { email: email },
      });

      if (!user) {
        throw new NotFoundException(`User ${email} not found`);
      }

      return user;
    } catch (err) {
      throw new HttpException(err, err.status || HttpStatus.BAD_REQUEST);
    }
  }

  private async validate(loginDTO: AuthDTO): Promise<IApp_User> {
    try {
      const email = loginDTO.email.toLowerCase();
      return await this.findByEmail(email);
    } catch (err) {
      throw new HttpException(err, err.status || HttpStatus.BAD_REQUEST);
    }
  }

  public async login(
    loginDTO: AuthDTO,
  ): Promise<any | { status: number; message: string }> {
    return this.validate(loginDTO).then(async (user) => {
      if (!user) {
        throw new NotFoundException('User Not Found');
      }

      const passwordIsValid = bcrypt.compareSync(
        loginDTO.password,
        user.password_hash,
      );

      if (!passwordIsValid) {
        throw new UnauthorizedException('Unauthorized access: Wrong password');
      }

      // Load user with roles and permissions
      const userWithRoles = await this.userRepository.findOne({
        where: { id: user.id },
        relations: [
          'app_user_roles',
          'app_user_roles.role',
          'app_user_roles.role.app_role_permissions',
          'app_user_roles.role.app_role_permissions.feature',
          'app_user_custom_permissions',
          'app_user_custom_permissions.feature',
        ],
      });

      // Extract roles and permissions
      const roles = userWithRoles.app_user_roles?.map(ur => ur.role.name) || [];

      // Combine role permissions and custom permissions
      const permissions = new Set<string>();

      // Add role permissions
      userWithRoles.app_user_roles?.forEach(ur => {
        ur.role.app_role_permissions?.forEach(rp => {
          permissions.add(rp.feature.name);
        });
      });

      // Add custom permissions
      userWithRoles.app_user_custom_permissions?.forEach(cp => {
        permissions.add(cp.feature.name);
      });

      const payload = {
        id: user.id,
        email: user.email,
        first_name: user.first_name,
        last_name: user.last_name,
        is_super_admin: user.is_super_admin,
        roles: roles,
        permissions: Array.from(permissions),
      };

      const accessToken = this.jwtService.sign(payload);

      return {
        expires_in: 7 * 24 * 60 * 60 * 1000,
        token: accessToken,
        user: payload,
        status: HttpStatus.OK,
      };
    });
  }

  public async validateUserByJwt(payload: JwtPayload) {
    // This will be used when the user has already logged in and has a JWT
    const user = await this.findByEmail(payload.email);

    if (!user) {
      throw new UnauthorizedException();
    }
    return this.createJwtPayload(user);
  }

  protected createJwtPayload(user) {
    const data: JwtPayload = {
      id: user.id,
      email: user.email,
      first_name: user.first_name,
      last_name: user.last_name,
      is_super_admin: user.is_super_admin,
      roles: user.roles,
      permissions: user.permissions,
    };

    const jwt = this.jwtService.sign(data);

    return {
      expires_in: 7 * 24 * 60 * 60 * 1000,
      token: jwt,
    };
  }

  async me(user: IUser): Promise<IApp_User> {
    try {
      const result = await this.userRepository.findOne({
        where: { id: user.id },
        relations: {
          primary_role: true,
          app_user_roles: {
            role: true,
          },
        },
      });

      delete result.password_hash;

      return result;
    } catch (err) {
      throw new HttpException(err, err.status || HttpStatus.BAD_REQUEST);
    }
  }
}
