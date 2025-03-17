import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { SearchQueryDto } from 'src/common/dtos';
import {
  IApp_User_Role,
  IApp_User as IType,
  IUser,
} from 'src/common/interfaces';
import { EmailService } from 'src/common/services/email.service';
import { OtpService } from 'src/common/services/otp.service';
import { IQuery } from 'src/common/types';
import { App_Roles, App_User_Roles, App_Users as Entity } from 'src/models';
import { DeleteResult, Equal, ILike, In, Not, Repository } from 'typeorm';
import {
  CreateApplicationUsersDto as CreateDto,
  ResendOtpDto,
  UpdateApplicationUsersDto as UpdateDto,
} from './dto';

@Injectable()
export class ApplicationUsersService {
  private readonly password = 'oS1H+dKX1+OkXUu3jABIKqThi5/BJJtB0OCo';
  /**
   * Constructor
   * @param {Repository<IType>} repository
   */
  constructor(
    @InjectRepository(Entity)
    private readonly repository: Repository<IType>,
    @InjectRepository(App_Roles)
    private readonly rolesRepository: Repository<App_Roles>,
    private readonly emailService: EmailService,
    private readonly otpService: OtpService,
    private readonly jwtService: JwtService,
  ) {}

  /**
   * Record Creation
   * @param {CreateDto} data
   * @returns {Promise<IType>}
   */
  async create(data: CreateDto): Promise<IType> {
    try {
      const {
        email,
        master_country,
        zone,
        student,
        tutor,
        institute,
        employee,
        primary_role,
        roles,
        first_name,
        last_name,
        username,
      } = data;

      const payload = {
        ...data,
        master_country: { id: master_country || null },
        zone: { id: zone || null },
        student: { id: student || null },
        tutor: { id: tutor || null },
        institute: { id: institute || null },
        employee: { id: employee || null },
        primary_role: { id: primary_role || null },
      };

      delete payload.roles;

      if (!username) {
        throw new BadRequestException('Username is required.');
      }

      if (!email) {
        throw new BadRequestException('Email is required.');
      }

      payload.username = payload.username.toLowerCase();
      payload.email = payload.email.toLowerCase();
      payload.password_hash = bcrypt.hashSync(data.password_hash, 8);

      let updatedUser;

      await this.repository.manager.transaction(
        async (transactionalEntityManager) => {
          const user = await transactionalEntityManager.save(
            this.repository.target,
            payload,
          );

          updatedUser = { ...user };

          if (Array.isArray(roles)) {
            const userRoles = roles.map((roleId) => {
              const userRole = new App_User_Roles();
              userRole.user = updatedUser;
              userRole.role = { id: roleId } as any;
              userRole.assigned_date = new Date();
              return userRole;
            });
            await transactionalEntityManager.save(App_User_Roles, userRoles);
          }
        },
      );

      if (updatedUser.password_hash) {
        delete updatedUser.password_hash;
      }

      // Generate and send OTP
      const otp = this.otpService.generateOTP();
      this.otpService.storeOTP(email, otp, updatedUser.id);
      const emailSent = await this.emailService.sendOTPEmail(email, otp);

      if (!emailSent) {
        console.error(`Failed to send OTP email to ${email}`);
      } else {
        console.log(`OTP email sent to ${email}`);
      }

      return updatedUser;
    } catch (err) {
      throw new HttpException(err, err.status || HttpStatus.BAD_REQUEST);
    }
  }

  /**
   * Record Query
   * @param {IUser} user
   * @param {SearchQueryDto} query
   * @returns {Promise<IQuery<IType>>}
   */
  async findAll(user: IUser, query: SearchQueryDto): Promise<IQuery<IType>> {
    try {
      const filter = (query.filter && JSON.parse(query.filter)) ?? {};
      const where = { ...filter };

      if (filter.email) {
        where.email = ILike(`%${filter.email}%`);
      }

      const sort = (query.sort && JSON.parse(query.sort)) ?? {};
      const order = { ...sort };

      const res = await this.repository.find({
        where: where,
        relations: {
          app_user_roles: {
            role: true,
          },
        },
        take: query.limit || 10,
        skip: query.skip || 0,
        order: order,
      });

      const resData = res.map((x) => {
        const { password_hash, ...rest } = x;
        return rest;
      });

      const result: IQuery<IType> = { data: resData };

      if (query.pagination) {
        const total = await this.repository.count({ where: where });
        result.pagination = { total, limit: query.limit, skip: query.skip };
      }

      return result;
    } catch (err) {
      throw new HttpException(err, err.status || HttpStatus.BAD_REQUEST);
    }
  }

  /**
   * Record Count
   * @param {SearchQueryDto} query
   * @returns {Promise<number>}
   */
  async count(query: SearchQueryDto): Promise<number> {
    try {
      const filter = (query.filter && JSON.parse(query.filter)) ?? {};
      const where = { ...filter };

      return await this.repository.count({ where: where });
    } catch (err) {
      throw new HttpException(err, err.status || HttpStatus.BAD_REQUEST);
    }
  }

  /**
   * Record Retrieve
   * @param {number} id
   * @param {IUser} user
   * @returns {Promise<IType>}
   */
  async findOne(id: number, user: IUser): Promise<IType> {
    try {
      const result = await this.repository.findOne({ where: { id: id } });

      if (!result) {
        throw new NotFoundException(`Record #${id} not found`);
      }

      if (result.password_hash) {
        delete result.password_hash;
      }

      return result;
    } catch (err) {
      throw new HttpException(err, err.status || HttpStatus.BAD_REQUEST);
    }
  }

  /**
   * Record Update
   * @param {number} id
   * @param {IUser} user
   * @param {UpdateDto} data
   * @returns {Promise<IType>}
   */
  async update(id: number, user: IUser, data: UpdateDto): Promise<IType> {
    try {
      const record = await this.repository.findOne({ where: { id } });

      if (!record) {
        throw new NotFoundException('Record not found.');
      }

      const payload = {
        ...record,
        ...data,
        master_country: data.hasOwnProperty('master_country')
          ? { id: data.master_country }
          : record.master_country,
        zone: data.hasOwnProperty('zone') ? { id: data.zone } : record.zone,
        employee: data.hasOwnProperty('employee')
          ? { id: data.employee }
          : record.employee,
        primary_role: data.hasOwnProperty('primary_role')
          ? { id: data.primary_role }
          : record.primary_role,
      };

      if (data.username) {
        payload.username = payload.username.toLowerCase();
      }
      if (data.email) {
        payload.email = payload.email.toLowerCase();
      }
      if (data.password_hash) {
        payload.password_hash = bcrypt.hashSync(data.password_hash, 8);
      }

      const result = await this.repository.manager.transaction(
        async (manager) => {
          if (Array.isArray(data.app_user_roles)) {
            const [existingRoles, existingRolesToRemove] = await Promise.all([
              manager.find(App_User_Roles, {
                where: {
                  user: Equal(id),
                  role: In(data.app_user_roles),
                },
              }),
              manager.find(App_User_Roles, {
                where: {
                  user: Equal(id),
                  role: Not(In(data.app_user_roles)),
                },
              }),
            ]);

            const existingRoleIds = existingRoles.map((x) => x.role_id);
            const existingRolesToRemoveIds = existingRolesToRemove.map(
              (x) => x.role_id,
            );
            const newIds = data.app_user_roles.filter(
              (x) => !existingRoleIds.includes(x as number),
            );

            await Promise.all([
              existingRolesToRemoveIds.length
                ? manager.delete(App_User_Roles, {
                    user: Equal(id),
                    role: In(existingRolesToRemoveIds),
                  })
                : Promise.resolve(),

              newIds.length
                ? manager.save(
                    App_User_Roles,
                    newIds.map((x) => {
                      const result = new App_User_Roles();
                      result.assigned_date = new Date();
                      result.user = { id } as any;
                      result.role = { id: x } as any;
                      return result;
                    }),
                  )
                : Promise.resolve(),
            ]);

            delete payload.app_user_roles;
          }

          return await manager.save(Entity, payload as Record<string, any>);
        },
      );

      if (result.password_hash) {
        delete result.password_hash;
      }

      return result as unknown as IType;
    } catch (err) {
      throw new HttpException(err, err.status || HttpStatus.BAD_REQUEST);
    }
  }

  /**
   * Record Delete
   * @param {number} id
   * @param {IUser} user
   * @returns {Promise<DeleteResult>}
   */
  async remove(id: number, user: IUser): Promise<DeleteResult> {
    try {
      return this.repository.delete({ id });
    } catch (err) {
      throw new HttpException(err, err.status || HttpStatus.BAD_REQUEST);
    }
  }

  async verifyEmail(email: string, otp: string): Promise<boolean> {
    try {
      return await this.otpService.verifyOTP(email, otp);
    } catch (err) {
      throw new HttpException(err, err.status || HttpStatus.BAD_REQUEST);
    }
  }

  async resendOtp(data: ResendOtpDto): Promise<{ message: string }> {
    const { email } = data;

    // Find the user
    const user = await this.repository.findOne({
      where: { email: email.toLowerCase() },
    });

    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    if (user.email_confirmed) {
      throw new HttpException(
        'Email is already verified',
        HttpStatus.BAD_REQUEST,
      );
    }

    // Generate and send new OTP
    const otp = this.otpService.generateOTP();
    await this.otpService.storeOTP(email, otp, user.id);
    const emailSent = await this.emailService.sendOTPEmail(email, otp);

    if (!emailSent) {
      throw new HttpException(
        'Failed to send OTP email',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    return { message: 'OTP has been resent to your email' };
  }

  async requestLoginOtp(email: string): Promise<{ message: string }> {
    const user = await this.repository.findOne({
      where: { email: email.toLowerCase() },
    });

    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    if (!user.email_confirmed) {
      throw new HttpException(
        'Email not verified. Please verify your email first',
        HttpStatus.BAD_REQUEST,
      );
    }

    if (!user.active_or_archive) {
      throw new HttpException('Account is inactive', HttpStatus.FORBIDDEN);
    }

    // Generate and send OTP
    const otp = this.otpService.generateOTP();
    await this.otpService.storeOTP(email, otp, user.id);
    const emailSent = await this.emailService.sendOTPEmail(email, otp);

    if (!emailSent) {
      throw new HttpException(
        'Failed to send login OTP',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    return { message: 'Login OTP has been sent to your email' };
  }

  async verifyLoginOtp(
    email: string,
    otp: string,
  ): Promise<{ access_token: string }> {
    console.log(`Attempting to verify login OTP for email: ${email}`);

    const user = await this.repository.findOne({
      where: { email: email.toLowerCase() },
      relations: ['app_user_roles', 'app_user_roles.role'],
    });

    if (!user) {
      console.log(`No user found for email: ${email}`);
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    console.log(`Found user: ${user.id}, checking OTP validity`);
    const isValid = await this.otpService.verifyOTP(email, otp);
    console.log(`OTP verification result: ${isValid}`);

    if (!isValid) {
      throw new HttpException('Invalid OTP', HttpStatus.BAD_REQUEST);
    }

    // Generate roles array for token
    const roles =
      (user.app_user_roles as unknown as IApp_User_Role[])?.map(
        (ur) => ur.role?.name,
      ) || [];

    console.log(`User roles for token: ${JSON.stringify(roles)}`);

    // Generate JWT token
    const payload = {
      sub: user.id,
      email: user.email,
      roles,
      username: user.username,
      first_name: user.first_name,
      last_name: user.last_name,
    };

    console.log(
      `Generating JWT token with payload: ${JSON.stringify(payload)}`,
    );
    const access_token = this.jwtService.sign(payload);
    return { access_token };
  }
}
