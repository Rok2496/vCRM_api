import { Module } from '@nestjs/common';

import { TypeOrmModule } from '@nestjs/typeorm';

import { App_User_Otps, App_Users } from 'src/models';

import { EmailService } from './email.service';

import { OtpService } from './otp.service';

@Module({
  imports: [TypeOrmModule.forFeature([App_Users, App_User_Otps])],

  providers: [EmailService, OtpService],

  exports: [EmailService, OtpService],
})
export class EmailOtpModule {}
