import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { App_User_Otps, App_Users } from 'src/models';
import { LessThan, MoreThan, Repository } from 'typeorm';

@Injectable()
export class OtpService {
  private readonly OTP_EXPIRY_MINUTES = 10;
  private readonly MAX_RESEND_ATTEMPTS = 3;
  private readonly LOCKOUT_HOURS = 2;

  constructor(
    @InjectRepository(App_Users)
    private readonly userRepository: Repository<App_Users>,
    @InjectRepository(App_User_Otps)
    private readonly otpRepository: Repository<App_User_Otps>,
  ) {
    // Clean up expired OTPs every minute
    // setInterval(() => this.cleanupExpiredOTPs(), 60 * 1000);
  }

  generateOTP(): string {
    return Math.floor(100000 + Math.random() * 900000).toString();
  }

  async storeOTP(email: string, otp: string, userId: number): Promise<void> {
    console.log(`Storing new OTP for email: ${email}, userId: ${userId}`);

    const expiryTime = new Date(
      Date.now() + this.OTP_EXPIRY_MINUTES * 60 * 1000,
    );

    // Get existing OTP to check attempts
    const existingOtp = await this.otpRepository.findOne({
      where: { user: { id: userId } },
    });

    console.log('Existing OTP record:', existingOtp);

    const resendAttempts = existingOtp ? existingOtp.resend_attempts + 1 : 0;

    if (resendAttempts >= this.MAX_RESEND_ATTEMPTS) {
      console.log(
        `Max resend attempts (${this.MAX_RESEND_ATTEMPTS}) reached for user ${userId}`,
      );
      // Lock the account
      const lockoutEnd = new Date(
        Date.now() + this.LOCKOUT_HOURS * 60 * 60 * 1000,
      );
      await this.userRepository.update(
        { id: userId },
        {
          account_lock: true,
          lockout_end: lockoutEnd,
        },
      );

      throw new HttpException(
        `Account locked due to too many OTP resend attempts. Try again after ${this.LOCKOUT_HOURS} hours.`,
        HttpStatus.TOO_MANY_REQUESTS,
      );
    }

    // Delete any existing OTPs for this user
    console.log(`Deleting existing OTPs for user ${userId}`);
    await this.otpRepository.delete({ user: { id: userId } });

    // Create new OTP
    const otpEntity = this.otpRepository.create({
      otp,
      user: { id: userId },
      expiry_time: expiryTime,
      is_verified: false,
      resend_attempts: resendAttempts,
      created_by: String(userId),
      updated_by: String(userId),
    });

    const savedOtp = await this.otpRepository.save(otpEntity);
    console.log('Saved new OTP entity:', {
      id: savedOtp.id,
      userId: savedOtp.user_id,
      otp: savedOtp.otp,
      expiryTime: savedOtp.expiry_time,
      resendAttempts: savedOtp.resend_attempts,
    });
  }

  async verifyOTP(email: string, otp: string): Promise<boolean> {
    console.log(`Starting OTP verification for email: ${email}, OTP: ${otp}`);

    const user = await this.userRepository.findOne({
      where: { email: email.toLowerCase() },
    });

    if (!user) {
      console.log(`No user found for ${email}`);
      return false;
    }

    console.log(`Found user with ID: ${user.id}`);

    // Check if account is locked
    if (user.account_lock) {
      const now = new Date();
      if (user.lockout_end && user.lockout_end > now) {
        const remainingTime = Math.ceil(
          (user.lockout_end.getTime() - now.getTime()) / (1000 * 60),
        );
        console.log(`Account is locked for ${remainingTime} more minutes`);
        throw new HttpException(
          `Account is locked. Try again after ${remainingTime} minutes.`,
          HttpStatus.FORBIDDEN,
        );
      } else {
        // Unlock account if lockout period has passed
        console.log('Unlocking previously locked account');
        await this.userRepository.update(
          { id: user.id },
          {
            account_lock: false,
            lockout_end: null,
          },
        );
      }
    }

    const currentTime = new Date();
    console.log(`Verifying OTP for ${email} at ${currentTime}`);

    const otpEntity = await this.otpRepository.findOne({
      where: {
        user: { id: user.id },
        is_verified: false,
        otp: otp.trim(),
      },
    });

    console.log('Found OTP entity:', otpEntity);

    if (!otpEntity) {
      console.log(`No matching OTP found for ${email}`);
      return false;
    }

    // Check if OTP has expired
    if (otpEntity.expiry_time < currentTime) {
      console.log(
        `OTP has expired. Expiry: ${otpEntity.expiry_time}, Current: ${currentTime}`,
      );
      return false;
    }

    // Mark OTP as verified and update user
    console.log('Marking OTP as verified');
    otpEntity.is_verified = true;
    otpEntity.updated_by = String(user.id);
    await this.otpRepository.save(otpEntity);

    // Update user's email confirmation status and clear any lockout
    console.log('Updating user email confirmation status');
    await this.userRepository.update(
      { id: user.id },
      {
        email_confirmed: true,
        account_lock: false,
        lockout_end: null,
      },
    );

    console.log(`Email verified for ${email}`);
    return true;
  }

  private async cleanupExpiredOTPs(): Promise<void> {
    const currentTime = new Date();
    const result = await this.otpRepository.delete({
      expiry_time: LessThan(currentTime),
      is_verified: false,
    });

    if (result.affected > 0) {
      console.log(`Cleaned up ${result.affected} expired OTPs`);
    }
  }

  async getStoredOTP(email: string): Promise<string | null> {
    const user = await this.userRepository.findOne({
      where: { email: email.toLowerCase() },
    });
    if (!user) return null;

    // Check if account is locked
    if (
      user.account_lock &&
      user.lockout_end &&
      user.lockout_end > new Date()
    ) {
      return null;
    }

    const currentTime = new Date();
    const otpEntity = await this.otpRepository.findOne({
      where: {
        user: { id: user.id },
        is_verified: false,
        expiry_time: MoreThan(currentTime),
      },
    });

    return otpEntity?.otp || null;
  }
}
