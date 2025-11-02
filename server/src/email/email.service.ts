import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
// You'll import your User entity/schema here
// import { User } from '../user/user.schema';

// Mock User type for this example
type User = {
  email: string;
  name: string;
};

@Injectable()
export class EmailService {
  // Inject the MailerService
  constructor(private readonly mailerService: MailerService) {}

  /**
   * BR: Send welcome email after registration
   */
  async sendUserWelcome(user: User, token: string) {
    // This URL would be your frontend URL
    const confirmationUrl = `https://your-frontend.com/auth/confirm?token=${token}`;

    await this.mailerService.sendMail({
      to: user.email,
      subject: 'Chào mừng bạn đến với Roome! Xác nhận email của bạn',
      template: './welcome', // points to src/email/templates/welcome.hbs
      context: {
        // Data to be sent to the template
        name: user.name,
        url: confirmationUrl,
      },
    });
  }

  /**
   * BR: Send password reset link
   */
  async sendPasswordReset(user: User, token: string) {
    const resetUrl = `https://your-frontend.com/auth/reset-password?token=${token}`;

    await this.mailerService.sendMail({
      to: user.email,
      subject: 'Yêu cầu đặt lại mật khẩu Roome',
      template: './password-reset', // points to src/email/templates/password-reset.hbs
      context: {
        name: user.name,
        url: resetUrl,
      },
    });
  }

  /**
   * BR: Send appointment confirmation to Tenant and Landlord
   */
  async sendAppointmentReminder(
    tenant: User,
    landlord: User,
    appointmentDate: Date,
  ) {
    const formattedDate = appointmentDate.toLocaleString('vi-VN');

    // Send to Tenant
    await this.mailerService.sendMail({
      to: tenant.email,
      subject: 'Nhắc lịch hẹn xem phòng tại Roome',
      template: './appointment-reminder',
      context: {
        userName: tenant.name,
        partnerName: landlord.name,
        role: 'Người thuê',
        date: formattedDate,
      },
    });

    // Send to Landlord
    await this.mailerService.sendMail({
      to: landlord.email,
      subject: 'Bạn có lịch hẹn xem phòng tại Roome',
      template: './appointment-reminder',
      context: {
        userName: landlord.name,
        partnerName: tenant.name,
        role: 'Chủ nhà',
        date: formattedDate,
      },
    });
  }
}
