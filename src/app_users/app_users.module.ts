import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EmailOtpModule } from 'src/common/services/email_services.module';
import { App_Roles, App_Users } from 'src/models';
import { ApplicationUsersController } from './app_users.controller';
import { ApplicationUsersService } from './app_users.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([App_Users, App_Roles]),
    EmailOtpModule,
    JwtModule.register({
      secret: process.env.SECRET_KEY_JWT,
      signOptions: { expiresIn: '24h' },
    }),
  ],
  controllers: [ApplicationUsersController],
  providers: [ApplicationUsersService],
  exports: [ApplicationUsersService],
})
export class ApplicationUsersModule {}
