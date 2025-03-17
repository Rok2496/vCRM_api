import { Injectable } from '@nestjs/common';

import * as SendGrid from '@sendgrid/mail';

@Injectable()
export class EmailService {
  constructor() {
    const apiKey = process.env.SENDGRID_API_KEY;
    if (!apiKey) {
      console.error('SENDGRID_API_KEY is not set in environment variables');
    }
    SendGrid.setApiKey(apiKey);
  }

  async sendOTPEmail(email: string, otp: string): Promise<boolean> {
    const mail = {
      to: email,
      from: process.env.SENDGRID_FROM_EMAIL,
      subject: 'Email Verification Code',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2>Email Verification</h2>
          <p>Thank you for registering with Tutorsplan. Please use the following OTP to verify your email address:</p>
          <div style="background-color: #f4f4f4; padding: 15px; text-align: center; font-size: 24px; font-weight: bold; letter-spacing: 5px; margin: 20px 0;">
            ${otp}
          </div>
          <p>This OTP will expire in 10 minutes.</p>
          <p>If you didn't request this verification, please ignore this email.</p>
          <p>Best regards,<br>TutorsPlan Team</p>
        </div>
      `,
    };

    try {
      const response = await SendGrid.send(mail);
      console.log('SendGrid Response:', response[0].statusCode);
      return true;
    } catch (error) {
      console.error('SendGrid error details:', {
        code: error.code,
        message: error.message,
        response: error.response?.body,
      });
      return false;
    }
  }
}
